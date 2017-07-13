// TODO:
// - Use ejs templates
// - Check unique token passed by slack for /slack and /coords
// - Expand to infinite users
// - Clean up geoloc.htm
// - Remove bitly and replace with proper heroku app name
// - window.close in geoloc.htm not working for Chrome?

var express = require('express');
var app = express();
var querystring = require('querystring');
var https = require('https');
var config = require('./config');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// CONFIG from config.js
var host_app_url  = config.host_app.url;
var decay_minutes = config.host_app.decay_minutes;
var slack_incoming_webhook_endpoint = config.slack.incoming_webhook_endpoint;
var mapsize = config.host_app.mapsize;
var maptype = config.host_app.maptype;
var label = config.host_app.label;
var color  = config.host_app.color;

app.get('/', function(request, response) {
  response.render('pages/index')
});

// When bot is called, reply with link to app '<app_url>/geoloc.htm'
app.post('/slack', function(request, response) {
	var attachment =
	{
		"text": "Click me -> " + host_app_url,
	}
	response.send(attachment);
});

var people = [];
var pplCtr = 0;

// Called by index.ejs (geoloc.htm). Receives the coordinates from HTML5 geolocation
app.post('/coords', function(request, response) {
	var body = JSON.parse(request.body);
	var latlng = body.lat + "," + body.lng;
	var user = body.user;
	var now = new Date();

	// Check if user that clicked is already part of the session. We use localstorage to identify returning users
	for (var i=0; i < people.length; i++) {
		if (people[i].user === user)
			break;
	}

	var person = {};
	person["date_started"] = now;
	person["latlng"] = latlng;

	// ... if the user does not exist, create a new one
	if(i >= people.length) {
		person["user"]   = user;
		person["label"]  = label[pplCtr];
		person["color"]  = color[pplCtr % color.length];
		pplCtr++;
		people.push(person);
	}
	else {	// else, update the existing one
		person = people[i];
		person["date_started"] = now;
		person["latlng"] = latlng;
	}

	// This builds the markers for the Google static map
	var markerParam = "";

	// Sort users, put the oldest at the end for pop()
	people.sort(function(a, b){return b.date_started - a.date_started});

	// DEBUG
	//for(var i=0; i < people.length; i++) console.log(people[i].label + " - " + people[i].date_started);

	var diffTime = null;
	var diffMins = null;

	// Kick (pop) users if they exceed the session time
	do {
		diffTime = now - people[people.length - 1].date_started;
		diffMins = Math.round(((diffTime % 86400000) % 3600000) / 60000); // minutes
		if(diffMins >= decay_minutes) {
			people.pop(); // get new leader
			pplCtr--;
		}
	} while(diffMins >= decay_minutes);

	// DEBUG
	//for(var i=0; i < people.length; i++) console.log(people[i].label + " - " + people[i].date_started);
	//console.log(diffMins);

	// Create markers/pin for each user on the map
	people.forEach(function(entry) {
	    markerParam += "&markers=color%3A" + entry.color + "%7Clabel%3A" + entry.label + "%7Cshadow%3Atrue%7C" + entry.latlng
	});

	// Construct the message to send to Slack using Incoming Webhooks Attachment format
	var attachment = {
		"attachments": [
			{
				"fallback": "Required plain-text summary of the attachment.",
				"color": "#36a64f",
				"pretext": people.length + " people have joined. " + (decay_minutes - diffMins)+ " mins left before " + people[people.length -1].label + " [leader] drops out",
				"title": person.label + "'s location",
				"title_link": "https://www.google.com/maps/place/" + latlng,
				"image_url": "https://maps.googleapis.com/maps/api/staticmap?" +
							 "size=" + mapsize +
							 "&maptype=" + maptype +
							 markerParam,
				//"thumb_url": "http://example.com/path/to/thumb.png"
				 "fields":[
					{
					   "title": "Update your own location",
					   "value": host_app_url + "",
					   "short":false
					}
				 ]
			}
		]
	}

	// Send message/attachment to Slack
	var host = "hooks.slack.com";
	var endpoint = slack_incoming_webhook_endpoint;
	doRequest(host, endpoint, 'POST', attachment,
		function(concurData) {
  			console.log(request.body.lat + " " + request.body.lng);
  			response.send(request.body.lat + " " + request.body.lng);
		});
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// UTILS

function doRequest(host, endpoint, method, data, success) {
  var dataString = JSON.stringify(data);
  var headers = {};

  if (method == 'GET') {
    endpoint += '?' + querystring.stringify(data);
  }
  else {
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length
    };
  }
  var options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      console.log(responseString);
      //var responseObject = JSON.parse(responseString);
      success(responseString);
    });
  });

  req.write(dataString);
  req.end();
}