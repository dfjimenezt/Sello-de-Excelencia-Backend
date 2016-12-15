var BaseModel = require('../utils/model.js');
var util = require('util');

var Permission_role = function () {
	var params = ["permission_role", "mysql"];
	BaseModel.apply(this, params);

	return this;
};
util.inherits(Permission_role, BaseModel);

module.exports = Permission_role;