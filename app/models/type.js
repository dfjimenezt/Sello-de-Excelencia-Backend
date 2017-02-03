var BaseModel = require('../utils/model.js')
var util = require('util')

var Category = function () {
	var params = ["category", "mysql"]
	BaseModel.apply(this, params)

	return this
}
util.inherits(Category, BaseModel)

module.exports = Category