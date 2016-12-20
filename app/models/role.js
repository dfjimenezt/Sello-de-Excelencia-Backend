var BaseModel = require('../utils/model.js');
var util = require('util');

var Role = function () {
	var params = ["role", "mysql"];
	BaseModel.apply(this, params);

	return this;
};
util.inherits(Role, BaseModel);

module.exports = Role;