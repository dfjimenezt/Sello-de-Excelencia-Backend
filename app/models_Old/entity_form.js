/**  * ENTITY AUTO_GENERATED BY DMT-GENERATOR
 * {{ENTITY_NAME}}
 * DMT 2017
 * GENERATED: 13 / 7 / 2017 - 12:54:54
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Form = function () {
	var params = [{"table":"form","relations":[{"type":"1-1","name":"category","entity":"category","leftKey":"id_category","foreign_name":"name"},{"type":"1-1","name":"topic","entity":"questiontopic","leftKey":"id_topic","foreign_name":"name"},{"type":"1-n","name":"questions","entity":"question","rightKey":"id_form"}],"entity":"form","model":"entity"}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Form, BaseModel)
module.exports = Form