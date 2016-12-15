var BaseModel = require('../utils/model.js');
var util = require('util');

var Service_status = function () {
	var params = ["service_status", "mysql"];
	BaseModel.apply(this, params);

	return this;
};
util.inherits(Service_status, BaseModel);

module.exports = Service_status;