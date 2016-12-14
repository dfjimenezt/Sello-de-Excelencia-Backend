var BaseModel = require('../utils/model.js');
var util = require('util');

var User_role = function () {
	var params = ["user_role", "mysql"];
	BaseModel.apply(this, params);

	return this;
};
util.inherits(User_role, BaseModel);

module.exports = User_role;