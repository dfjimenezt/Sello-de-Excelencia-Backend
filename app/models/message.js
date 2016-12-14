var BaseModel = require('../utils/model.js');
var util = require('util');

var Message = function () {
	var params = ["message", "mysql"];
	BaseModel.apply(this, params);

	return this;
};
util.inherits(Message, BaseModel);

module.exports = Region;