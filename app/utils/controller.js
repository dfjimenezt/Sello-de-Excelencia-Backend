var utiles = require('./utiles.js');

//This is the generic Controller, all controllers inherits from this one.
var Controller = function (getMap, postMap, putMap, deleteMap) {
	/*
	The main idea of a controller is a component where we can map a url with a function.
	there are some minor differences depending on the method in the request.
	That function must always return a Promise
	*/

	this.get = function (params, queryParams) {
		if (!getMap) return utiles.informError(1);
		var option = params[0].split("/")[0];

		var rta = getMap.get(option);
		if (!rta) return utiles.informError(5);
		else return rta(queryParams);
	};

	this.post = function (params, authorization, body, files) {
		if (!postMap) return utiles.informError(1);
		var option = params[0].split("/")[0];

		var rta = postMap.get(option);
		if (!rta) return utiles.informError(5);
		else return rta(authorization,body);
	};

	this.put = function (params, body) {
		if (!putMap) return utiles.informError(1);
		var option = params[0].split("/")[0];

		var rta = putMap.get(option);
		if (!rta) return utiles.informError(5);
		else return rta(body);
	};

	this.delete = function (params, body) {
		if (!deleteMap) return utiles.informError(1);
		var option = params[0].split("/")[0];

		var rta = deleteMap.get(option);
		if (!rta) return utiles.informError(5);
		else return rta(body);
	};

	return this;
};

module.exports = Controller;