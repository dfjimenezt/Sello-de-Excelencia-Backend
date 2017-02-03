var BaseModel = require('../utils/model.js')
var util = require('util')

var Region = function () {
	var params = ["region", "mysql"]
	BaseModel.apply(this, params)

	return this
}
util.inherits(Region, BaseModel)

module.exports = Region