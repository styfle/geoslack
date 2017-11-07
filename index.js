const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const {
  fetchAsync,
  getExpiredUsers,
  getImageUrl,
  getEtaAsync
} = require('./utils');

const {
	port,
	app_url,
	gmaps_api_key,
  slack_webhook_url,
  destination,
	decay_minutes,
	mapsize,
	maptype,
	label,
	colors
} = require('./config');

let userToPerson = {};
let pplCtr = 0;
const script_src = `https://maps.google.com/maps/api/js?key=${gmaps_api_key}`;

app.set('port', port);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  response.render('pages/index');
});

app.get('/everyone', (request, response) => {
  response.render('pages/everyone', { script_src });
});

app.get('/coords-everyone', (request, response) => {
	const people = Object.values(userToPerson);
	const json = JSON.stringify(people);
	response.send(json);
});

app.get('/findme', (request, response) => {
  response.render('pages/findme', { script_src });
});

app.post('/slack', (request, response) => {
	response.send({ "text": "Click me -> " + app_url });
});

app.post('/coords', async (request, response) => {
	const { user, lat, lng } = request.body;
	const latlng = lat + ',' + lng;
  let now = new Date();
  console.log(`[${now.toISOString()}] ${user} is at location ${latlng}`);
  const person = getPerson(now, user, lat, lng);
  const expiredPeople = getExpiredUsers(userToPerson, now);
  expiredPeople.forEach(p => {
    delete userToPerson[p.user];
  });
  const people = Object.values(userToPerson);
  const pretext = `GeoSlack is tracking ${people.length} people`;
  let title = `${person.user}'s location`;
  const eta = await getEtaAsync(latlng, destination, gmaps_api_key);
  if (eta) {
    title += ` (ETA ${eta})`;
  }
	const attachment = {
		"attachments": [
			{
				"fallback": "Required plain-text summary of the attachment.",
				"color": "#36a64f",
				"pretext": pretext,
				"title": title,
				"title_link": `https://www.google.com/maps/place/${latlng}`,
				"image_url": getImageUrl(person, mapsize, maptype),
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
		path: slack_webhook_url,
		data: attachment
  });
  
	response.send(slackRes);
});

app.listen(port, () => {
  console.log('Node app is running on port', port);
});

function getPerson(dt, user, lat, lng) {
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
  person.lat = lat;
  person.lng = lng;
  
  return person;
}



