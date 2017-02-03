var BaseModel = require('../utils/model.js')
var util = require('util')

var City = function () {
	var params = ["city", "mysql"]
	BaseModel.apply(this, params)

	return this
}
util.inherits(City, BaseModel)

module.exports = City