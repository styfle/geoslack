const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const { fetchAsync } = require('./utils');

let userToPerson = {};
let pplCtr = 0;

const {
	port,
	app_url,
	gmaps_api_key,
	slack_incoming_webhook_url,
	decay_minutes,
	mapsize,
	maptype,
	label,
	colors
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
  const script_src = `https://maps.google.com/maps/api/js?key=${gmaps_api_key}`;
  response.render('pages/findme', { script_src })
});

app.post('/slack', (request, response) => {
	response.send({ "text": "Click me -> " + app_url });
});

app.post('/coords', async (request, response) => {
	const { user, lat, lng } = request.body;
	const latlng = lat + ',' + lng;
  let now = new Date();
  console.log(`[${now.toISOString()}] ${user} is at location ${latlng}`);
  const person = getPerson(now, user, latlng);
  const people = Object.values(userToPerson);

	// Sort users, put the oldest at the end for pop()
	const last = people.sort((a, b) => b.date_started - a.date_started);

	let diffTime = null;
	let diffMins = null;

	/* Kick (pop) users if they exceed the session time
	do {
		diffTime = now - people[people.length - 1].date_started;
		diffMins = Math.round(((diffTime % 86400000) % 3600000) / 60000); // minutes
		if (diffMins >= decay_minutes) {
			people.pop();
			pplCtr--;
		}
  } while(diffMins >= decay_minutes);
  */


  // This builds the markers/pins for the Google static map
  const markers = people
    .map(p => `markers=color%3A${p.color}%7Clabel%3A${p.user}%7Cshadow%3Atrue%7C${p.latlng}`)
    .join('&');

  //const str = (decay_minutes - diffMins)+ " mins left before " + people[people.length -1].label + " [leader] drops out";

	// Construct the message to send to Slack using Incoming Webhooks Attachment format
	const attachment = {
		"attachments": [
			{
				"fallback": "Required plain-text summary of the attachment.",
				"color": "#36a64f",
				"pretext": `${people.length} people have joined.`,
				"title": `${person.user}'s location`,
				"title_link": `https://www.google.com/maps/place/${latlng}`,
				"image_url": `https://maps.googleapis.com/maps/api/staticmap?size=${mapsize}&maptype=${maptype}&${markers}`,
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

	const slackRes = await fetchAsync({
		method: 'POST',
		host: 'hooks.slack.com',
		path: slack_incoming_webhook_url,
		data: attachment
  });
  
	response.send(slackRes);
});

app.listen(port, () => {
  console.log('Node app is running on port', port);
});

function getPerson(dt, user, latlng) {
  let person = userToPerson[user];

  if (!person) {
    person = {
			user: user,
			color: colors[pplCtr % colors.length]
		};
		pplCtr++;
		userToPerson[user] = person;
  }

  person.date_started = dt;
  person.latlng = latlng;
  
  return person;
}

