/**  * ENTITY AUTO_GENERATED BY DMT-GENERATOR
 * {{ENTITY_NAME}}
 * DMT 2017
 * GENERATED: 18 / 8 / 2017 - 13:23:2
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Form = function () {
	var params = [{"table":"form","relations":[{"type":"1-1","name":"category","entity":"category","leftKey":"id_category","foreign_name":"name"}],"entity":"form","model":"entity"}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Form, BaseModel)
module.exports = Form