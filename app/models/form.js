var BaseModel = require('../utils/model.js');
var util = require('util');

var Form = function () {
	var params = ["form", "mysql"];
	BaseModel.apply(this, params);

	return this;
};
util.inherits(Form, BaseModel);

module.exports = Form;