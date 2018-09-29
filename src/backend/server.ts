import * as express from 'express';
import * as bodyParser from 'body-parser';
import config from './config';

import {
    fetchAsync,
    getExpiredUsers,
    getImageUrl,
    getEtaAsync
} from './utils';

const {
    port,
    app_url,
    gmaps_api_key,
    slack_webhook_url,
    destination,
    mapsize,
    maptype,
    colors
} = config;

const app = express();
let userToPerson: UserToPerson = {};
let pplCtr = 0;
const script_src = `https://maps.google.com/maps/api/js?key=${gmaps_api_key}`;

app.set('port', port);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../frontend'));

app.set('views', __dirname + '/../views');
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
    const eta = await getEtaAsync(gmaps_api_key, latlng, destination);
    if (eta) {
        title += ` (ETA ${eta})`;
    }
    const attachment = {
        "attachments": [{
            "fallback": "Required plain-text summary of the attachment.",
            "color": "#36a64f",
            "pretext": pretext,
            "title": title,
            "title_link": `https://www.google.com/maps/place/${latlng}`,
            "image_url": getImageUrl(person, mapsize, maptype),
            //"thumb_url": "http://example.com/path/to/thumb.png"
            "fields":[{
                "title": "Update your own location",
                "value": app_url,
                "short": false
            }]
        }]
    };

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

function getPerson(date_started: Date, user: string, lat: number, lng: number) {
    let person = userToPerson[user];
    
    if (!person) {
        const color = colors[pplCtr % colors.length];
        person = { user, color, date_started, lat, lng };
        pplCtr++;
        userToPerson[user] = person;
    } else {
        person.date_started = date_started;
        person.lat = lat;
        person.lng = lng;
    }
    
    return person;
}



