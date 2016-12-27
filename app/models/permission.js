var BaseModel = require('../utils/model.js');
var util = require('util');

var Permission = function () {
	var params = ["permission", "mysql"];
	BaseModel.apply(this, params);

	return this;
};
util.inherits(Permission, BaseModel);

module.exports = Permission;