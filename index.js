// TODO:
// - Check unique token passed by slack for /slack and /coords
// - Expand to infinite users

const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const querystring = require('querystring');
const https = require('https');

const {
	port,
	app_url,
	gmaps_api_key,
	slack_incoming_webhook_url,
	decay_minutes,
	mapsize,
	maptype,
	label,
	color
} = require('./config');

app.set('port', port);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  response.render('pages/index')
});

app.get('/findme', (request, response) => {
  response.render('pages/findme')
});

// When bot is called, reply with link to the app
app.post('/slack', (request, response) => {
	response.send({ "text": "Click me -> " + app_url });
});

var people = [];
var pplCtr = 0;

// Called by front-end. Receives the coordinates from HTML5 geolocation
app.post('/coords', function(request, response) {
	const { user, lat, lng } = request.body;
	const latlng = lat + "," + lng;
	const now = new Date();

	// Check if user that clicked is already part of the session.
	// We use localstorage to identify returning users
	for (let i=0; i < people.length; i++) {
		if (people[i].user === user)
			break;
	}

	let person = {};
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
	let markerParam = "";

	// Sort users, put the oldest at the end for pop()
	people.sort((a, b) => b.date_started - a.date_started);

	let diffTime = null;
	let diffMins = null;

	// Kick (pop) users if they exceed the session time
	do {
		diffTime = now - people[people.length - 1].date_started;
		diffMins = Math.round(((diffTime % 86400000) % 3600000) / 60000); // minutes
		if(diffMins >= decay_minutes) {
			people.pop(); // get new leader
			pplCtr--;
		}
	} while(diffMins >= decay_minutes);

	// Create markers/pin for each user on the map
	people.forEach((entry) => {
	    markerParam += "&markers=color%3A" + entry.color + "%7Clabel%3A" + entry.label + "%7Cshadow%3Atrue%7C" + entry.latlng
	});

	// Construct the message to send to Slack using Incoming Webhooks Attachment format
	const attachment = {
		"attachments": [
			{
				"fallback": "Required plain-text summary of the attachment.",
				"color": "#36a64f",
				"pretext": people.length + " people have joined. " + (decay_minutes - diffMins)+ " mins left before " + people[people.length -1].label + " [leader] drops out",
				"title": person.label + "'s location",
				"title_link": "https://www.google.com/maps/place/" + latlng,
				"image_url": "https://maps.googleapis.com/maps/api/staticmap?" + "size=" + mapsize + "&maptype=" + maptype + markerParam,
				//"thumb_url": "http://example.com/path/to/thumb.png"
				 "fields":[
					{
					   "title": "Update your own location",
					   "value": app_url,
					   "short": false
					}
				 ]
			}
		]
	}

	// Send message/attachment to Slack
	doRequest("hooks.slack.com", slack_incoming_webhook_url, 'POST', attachment, (concurData) => {
  			console.log(request.body.lat + " " + request.body.lng);
  			response.send(request.body.lat + " " + request.body.lng);
		});
});

app.listen(port, () => {
  console.log('Node app is running on port', port);
});


function doRequest(host, endpoint, method, data, success) {
  const dataString = JSON.stringify(data);
  const headers = {};

  if (method == 'GET') {
    endpoint += '?' + querystring.stringify(data);
  } else {
    headers = {
      'Content-Type': 'application/json',
      'Content-Length': dataString.length
    };
  }
  const options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers
  };

  const req = https.request(options, (res) => {
    res.setEncoding('utf-8');

    const responseString = '';

    res.on('data', (data) => {
      responseString += data;
    });

    res.on('end', () => {
      console.log(responseString);
      success(responseString);
    });
  });

  req.write(dataString);
  req.end();
}