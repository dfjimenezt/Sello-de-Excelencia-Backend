var BaseModel = require('../utils/model.js');
var util = require('util');

var Question = function () {
	var params = ["question", "mysql"];
	BaseModel.apply(this, params);

	return this;
};
util.inherits(Question, BaseModel);

module.exports = Question;