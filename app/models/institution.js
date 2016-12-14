var BaseModel = require('../utils/model.js');
var util = require('util');

var Institution = function () {
	var params = ["institution", "mysql"];
	BaseModel.apply(this, params);

	return this;
};
util.inherits(Institution, BaseModel);

module.exports = Institution;