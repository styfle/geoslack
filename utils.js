function fetchAsync(options) {
	return new Promise((resolve, reject) => {
		const dataString = JSON.stringify(options.data);
		let headers = {};

		if (options.method == 'GET') {
			options.path += '?' + querystring.stringify(options.data);
		} else {
			headers = {
				'Content-Type': 'application/json',
				'Content-Length': dataString.length
			};
		}

		const req = https.request(options, (res) => {
			res.setEncoding('utf-8');

			let responseString = '';

			res.on('data', (data) => {
				responseString += data;
			});

			res.on('end', () => {
				resolve(responseString);
			});
		});

		req.write(dataString);
		req.end();
	});
}

module.exports = {
    fetchAsync: fetchAsync
};