var BaseModel = require('../utils/model.js')
var util = require('util')

var Type = function () {
	var params = ["type", "mysql"]
	BaseModel.apply(this, params)

	return this
}
util.inherits(Type, BaseModel)

module.exports = Type