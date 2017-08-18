/**  * ENTITY AUTO_GENERATED BY DMT-GENERATOR
 * {{ENTITY_NAME}}
 * DMT 2017
 * GENERATED: 18 / 8 / 2017 - 13:23:2
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var User_role = function () {
	var params = [{"table":"user_role","relations":[{"type":"1-1","name":"user","entity":"user","leftKey":"id_user","foreign_name":"name"},{"type":"1-1","name":"role","entity":"role","leftKey":"id_role","foreign_name":"name"}],"entity":"user_role","model":"entity"}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(User_role, BaseModel)
module.exports = User_role