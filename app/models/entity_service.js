/**  * ENTITY AUTO_GENERATED BY DMT-GENERATOR
 * {{ENTITY_NAME}}
 * DMT 2017
 * GENERATED: 13 / 8 / 2017 - 17:25:6
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Service = function () {
	var params = [{"table":"service","relations":[{"type":"n-n","entity":"role","name":"roles","intermediate":{"entity":"user_role","leftKey":"id_user","rightKey":"id_role"}},{"type":"1-1","name":"category","foreign_name":"name","entity":"category","leftKey":"id_category"},{"type":"1-1","name":"institution","foreign_name":"name","entity":"institution","leftKey":"id_institution"},{"type":"1-n","name":"history","rightKey":"id_service","entity":"service_status"},{"type":"1-1","name":"status","leftKey":"current_status","foreign_name":"name","entity":"status"},{"type":"1-n","name":"comments","entity":"service_comment","rightKey":"id_service"},{"type":"n-n","entity":"form","name":"requirements","intermediate":{"entity":"category","leftKey":"id_category","rightKey":"id_category"}}],"entity":"service","model":"entity"}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Service, BaseModel)
module.exports = Service