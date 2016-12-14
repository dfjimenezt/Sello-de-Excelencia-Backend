var BaseModel = require('../utils/model.js');
var util = require('util');

var User = function () {
	var params = ["user", "mysql"];
	BaseModel.apply(this, params);

	return this;
};
util.inherits(User, BaseModel);

module.exports = User;