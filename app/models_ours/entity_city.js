/**  * ENTITY AUTO_GENERATED BY DMT-GENERATOR
 * {{ENTITY_NAME}}
 * DMT 2017
 * GENERATED: 13 / 7 / 2017 - 12:54:54
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var City = function () {
	var params = [{"table":"city","relations":[{"type":"1-1","entity":"region","name":"region","leftKey":"id_region","foreign_name":"name"}],"entity":"city","model":"entity"}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(City, BaseModel)
module.exports = City