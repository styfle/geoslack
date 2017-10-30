const { fetchAsync } = require('../utils');
const test = require('tape');

function trim(s) {
    return s.replace(/[\s]/g, '');
}

test('fetchAsync', async t => {
    t.plan(1);

    const options = {
		method: 'GET',
		host: 'raw.githubusercontent.com',
		path: '/styfle/geoslack/master/app.json'
	};

    try {
        const json = await fetchAsync(options);
        const actual = JSON.parse(json);
        const expected = require('../app.json')
        t.equal(Object.keys(actual).length, Object.keys(expected).length);
    } catch(e) {
        t.fail(e.message);
    }
});