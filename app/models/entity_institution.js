/**  * ENTITY AUTO_GENERATED BY DMT-GENERATOR
 * {{ENTITY_NAME}}
 * DMT 2017
 * GENERATED: 5 / 9 / 2017 - 7:39:27
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Institution = function () {
	var params = [{"table":"institution","relations":[{"type":"1-1","entity":"city","name":"city","leftKey":"id_city","foreign_name":"name"},{"type":"1-1","entity":"region","name":"region","leftKey":"id_region","foreign_name":"name"},{"type":"1-1","entity":"user","name":"creator","leftKey":"id_user_creator","foreign_name":"email"},{"type":"1-1","entity":"institutionType","name":"type","leftKey":"id_institution_type","foreign_name":"id"},{"type":"n-n","name":"users","entity":"user","intermediate":{"entity":"institution_user","leftKey":"id_institution","rightKey":"id_user"}},{"type":"1-n","name":"service","rightKey":"id_institution","entity":"service"}],"entity":"institution","model":"entity"}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Institution, BaseModel)
module.exports = Institution