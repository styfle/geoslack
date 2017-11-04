
const https = require('https');
const querystring = require('querystring');

function fetchAsync(options) {
	return new Promise((resolve, reject) => {
		const dataString = JSON.stringify(options.data);
		let headers = {};

		if (options.method === 'GET') {
			const qs = querystring.stringify(options.data);
			if (qs) {
				options.path += '?' + qs;
			}
		} else {
			headers = {
				'Content-Type': 'application/json',
				'Content-Length': dataString ? dataString.length : 0
			};
		}

		const req = https.request(options, (res) => {
			res.setEncoding('utf-8');
			if (res.statusCode !== 200) {
				reject(new Error('Failed with status code ' + res.statusCode));
				return;
			}

			let str = '';

			res.on('data', (data) => {
				str += data;
			});

			res.on('end', () => {
				resolve(str);
			});
		});

		req.on('error', e => reject(e));

		if (dataString) {
			req.write(dataString);
		}
		req.end();
	});
}

function getExpiredUsers(userToPerson, now) {
	const time = now.getTime() - (15 * 60 * 1000); // 15 min ago
	return Object.values(userToPerson).filter(p => p.date_started < time);
}

function getImageUrl(people, mapsize, maptype) {
	const markers = people
		.map(p => `markers=color%3A${p.color}%7Clabel%3A${p.user}%7Cshadow%3Atrue%7C${p.latlng}`)
		.join('&');
	return `https://maps.googleapis.com/maps/api/staticmap?size=${mapsize}&maptype=${maptype}&${markers}`;
}

async function getEtaAsync(origin, destination, key) {
	if (!origin || !destination) {
		return '';
	}

	const text = await fetchAsync({
		method: 'GET',
		host: 'maps.googleapis.com',
		path: '/maps/api/distancematrix/json',
		data: {
			units: 'imperial',
			origins: origin,
			destinations: destination,
			key: key
		}
	});

	const obj = JSON.parse(text);

	if (obj.status !== 'OK') {
		console.error(obj.error_message);
		return '';
	}

	return obj.rows[0].elements[0].duration.text;
}

module.exports = {
	fetchAsync: fetchAsync,
	getExpiredUsers: getExpiredUsers,
	getImageUrl: getImageUrl,
	getEtaAsync: getEtaAsync
};