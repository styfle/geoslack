
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

module.exports = {
    fetchAsync: fetchAsync
};