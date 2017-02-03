var BaseModel = require('../utils/model.js')
var util = require('util')

var Service = function () {
	var params = ["service", "mysql"]
	BaseModel.apply(this, params)

	return this
}
util.inherits(Service, BaseModel)

module.exports = Service