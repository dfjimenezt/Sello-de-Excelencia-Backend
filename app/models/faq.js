var BaseModel = require('../utils/model.js');
var util = require('util');

var Faq = function () {
	var params = ["faq", "mysql"];
	BaseModel.apply(this, params);

	return this;
};
util.inherits(Faq, BaseModel);

module.exports = Faq;