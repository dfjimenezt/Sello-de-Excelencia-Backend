var BaseModel = require('../utils/model.js');
var util = require('util');

var Session = function () {
	var params = ["session", "mysql"];
	BaseModel.apply(this, params);

	return this;
};
util.inherits(Session, BaseModel);

module.exports = Session;