/**  * ENTITY AUTO_GENERATED BY DMT-GENERATOR
 * {{ENTITY_NAME}}
 * DMT 2017
 * GENERATED: 13 / 8 / 2017 - 19:53:2
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Service_status = function () {
	var params = [{"table":"service_status","relations":[{"type":"1-1","name":"status","foreign_name":"name","entity":"category","leftKey":"id_status"}],"entity":"service_status","model":"entity"}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Service_status, BaseModel)
module.exports = Service_status
