
import * as https from 'https';
import * as querystring from 'querystring';

interface FetchAsyncOptions extends https.RequestOptions {
	data?: any;
}

export function fetchAsync(options: FetchAsyncOptions) {
	return new Promise<string>((resolve, reject) => {
		const dataString = JSON.stringify(options.data);

		options.headers = {
			'Content-Type': 'application/json',
			'Content-Length': dataString ? dataString.length : 0
		};

		if (options.method === 'GET') {
			const qs = querystring.stringify(options.data);
			if (qs) {
				options.path += '?' + qs;
			}
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

export function getExpiredUsers(userToPerson: UserToPerson, now: Date) {
	const time = now.getTime() - (15 * 60 * 1000); // 15 min ago
	return Object
		.values(userToPerson)
		.filter(p => p.date_started.getTime() < time);
}

export function getImageUrl(p: Person, size: string, maptype: string) {
	const host = `https://maps.googleapis.com/maps/api/staticmap`;
	const shadow = true;
	const qs = querystring.stringify({
		size: size,
		maptype: maptype,
		markers: `color:${p.color}|label:${p.user}|shadow:${shadow}|${p.lat},${p.lng}`
	});
	return `${host}?${qs}`;
}

export async function getEtaAsync(key: string, origin: string, destination?: string) {
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