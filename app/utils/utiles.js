var errores = require("./errors.js");
var geolib = require('geolib');

module.exports = {
	//This one is used in development
	unimplementedMethod: function () {
		return new Promise(function (resolve, reject) {
			resolve({ info: "Unimplemented Method" });
		});
	},
	createUid:function(){
		var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
	},
	//
	informError: function (num) {
		return new Promise(function (resolve, reject) {
			resolve({ error: errores[num] });
		});
	},
	//This one is used to validate input arguments
	isPositiveInteger: function (num) {
		if (!num) return false;
		num = parseInt(num);
		return num === 0 || ((num | 0) > 0 && num % 1 === 0);
	},
	//This one is used to validate input arguments
	isArrayOfPositiveIntegers: function (array) {
		if (!Array.isArray(array) || array.length === 0) return false;
		for (var i = 0; i < array.length; i++)
			if (!this.isPositiveInteger(array[i]))
				return false;
		return true;
	},
	//This one is used to validate input arguments
	isTimeStamp: function (timestamp) {
		return (new Date(timestamp)).getTime() > 0;
	},
	//This one is used to validate input arguments
	isCoordinade: function (point) {
		try {
			geolib.useDecimal(point);
			return true;
		}
		catch (e) { return false; }
	},
	filterSqlInjection: function (txt) {
		//TODO implement method
		return txt;
	},
	//This one was used just once. To change the coordinade format in the DB
	decimalCoordinade: function (point) {
		if (!point) return 0;
		return geolib.useDecimal(point);
	},
	getDistance: function (point1, point2) {
		return geolib.getDistance(point1, point2);
	},
	/*
	This one is used to group information after some MySQL Query.
	Its intended to be used when the query contains a join betwen tables. In the
	answer the left part will be common for some tuples, so to destroy that redundant information
	this function group the info using some primary key and saved using the nameGroup chosen by the dev.
	*/
	groupTuples: function (array, divisorIndex, primaryKey, nameGroup) {
		if (array.length === 0) return [];

		var size = Object.keys(array[0]).length, breakPoint = divisorIndex;
		if (divisorIndex < 0 && (breakPoint = size + divisorIndex) < 0 || divisorIndex > size)
			throw this.informError(3);

		var map = new Map();
		for (var i in array) {
			var index = 0, objectCommon = {}, objectParticular = {}, indexKey = "";
			for (var property in array[i]) {
				if (array[i].hasOwnProperty(property)) {
					if (property === primaryKey) indexKey = array[i][property];
					if (index < breakPoint) objectCommon[property] = array[i][property];
					else objectParticular[property] = array[i][property];
					index++;
				}
			}

			if (!map.get(indexKey)) {
				objectCommon[nameGroup] = [objectParticular];
				map.set(indexKey, objectCommon);
			} else {
				var savedObject = map.get(indexKey);
				savedObject[nameGroup].push(objectParticular);
				map.set(indexKey, savedObject);
			}
		}

		var rta = [];
		for (var value of map.values()) rta.push(value);
		return rta;
	}
};