var assert = require('assert');
var request = require('request');
var backend = require('../../index.js');

var instance = new backend();

var options = {};
options.headers = {
	'content-type': 'application/x-www-form-urlencoded'
};

before(() => { instance.start(); });

after(() => { instance.close(); });

describe('Test de conexión [Desarrollo]', function () {
	it('should show that the app is running correctly ', function (done) {
		this.timeout(10000);
		options.url = 'http://localhost:3000/health';
		request.get(options, (err, res, body) => {
			assert(!err, "It must not have an error");
			assert.equal(res.statusCode, 200, "StatusCode must be 200");
			done();
		});
	});

	describe('Demo test OK', function () {
		it('should return the index when the value is present', function () {
			assert.equal(1, [1, 2, 3].indexOf(2));
		});
	});
});