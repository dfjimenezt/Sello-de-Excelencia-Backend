/**  * ENTITY AUTO_GENERATED BY DMT-GENERATOR
 * {{ENTITY_NAME}}
 * DMT 2017
 * GENERATED: 18 / 8 / 2017 - 13:23:2
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Evaluation_request = function () {
	var params = [{"table":"evaluation_request","relations":[{"type":"1-1","name":"user","entity":"user","leftKey":"id_user","foreign_name":"email"},{"type":"1-1","name":"service","entity":"service","leftKey":"id_service","foreign_name":"name"},{"type":"1-1","name":"status","entity":"request_status","leftKey":"id_request_status","foreign_name":"name"}],"entity":"evaluation_request","model":"entity"}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Evaluation_request, BaseModel)
module.exports = Evaluation_request