/*
This controller is used to remote test thes app.
Its intended to check the health of the app, the connection with the database and
other external apis we use.

The dev tests must not be mapped in this controller
*/

//We require this file to be a controller so we can use
var BaseController = require('../utils/controller.js');
var util = require('util');

//we use mocha to run the test files and path to find them
//The test are in the "../tests" folder
var Mocha = require('mocha');
var path = require('path');

function formatTest(test) {
	return {
		title: test.title,
		fullTitle: test.fullTitle(),
		duration: test.duration,
		state: test.state,
		err: errorJSON(test.err || {}),
		code: Mocha.utils.clean(test.body.toString())
	};
}

function errorJSON(err) {
	return Object.getOwnPropertyNames(err)
		.reduce(function (output, key) {
			// Remove any key whose value cannot be stringified
			try {
				JSON.stringify(err[key]);
			} catch (e) {
				if (e.message === 'Converting circular structure to JSON')
					return output;
			}
			// Value is not circular, add it to our output
			output[key] = err[key];
			return output;
		}, {});
}

function resolveTest(name) {
	var mocha = new Mocha();
	var ruta = __dirname.split("/");
	ruta.pop();
	var testDir = ruta.join("/") + '/tests';
	var filename = path.join(testDir, name + '.js');
	delete require.cache[filename];
	mocha.addFile(filename);

	return new Promise(function (resolve, reject) {
		var tests = [], pending = [];

		mocha.run()
			.on('test end', function (test) { tests.push(test); })
			.on('pending', function (test) { pending.push(test); })
			.on('end', function () {
				var obj = {
					tests: tests.map(formatTest),
					pending: pending.map(formatTest),
				};
				resolve(obj);
			});
	});
}

var Test_anp = function () {
	//---------------------------------------------------------------
	var getMap = new Map();

	var anp1 = function (queryParams) {
		return resolveTest("remoteTest1");
	};

	getMap.set("anp1", anp1);

	var params = [getMap, null, null, null];
	BaseController.apply(this, params);
	//---------------------------------------------------------------

	return this;
};

util.inherits(Test_anp, BaseController);

module.exports = Test_anp;