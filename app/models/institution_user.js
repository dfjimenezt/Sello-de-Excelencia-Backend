var BaseModel = require('../utils/model.js')
var util = require('util')

var Institution_user = function () {
	var params = ["institution_user", "mysql"]
	BaseModel.apply(this, params)

	return this
}
util.inherits(Institution_user, BaseModel)

module.exports = Institution_user