var BaseModel = require('../utils/model.js')
var util = require('util')

var Topic = function () {
	var params = ["topic", "mysql"]
	BaseModel.apply(this, params)

	return this
}
util.inherits(Topic, BaseModel)

module.exports = Topic