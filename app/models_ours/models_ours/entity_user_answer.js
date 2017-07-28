/**  * ENTITY AUTO_GENERATED BY DMT-GENERATOR
 * {{ENTITY_NAME}}
 * DMT 2017
 * GENERATED: 13 / 7 / 2017 - 12:54:54
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var User_answer = function () {
	var params = [{"table":"user_answer","relations":[{"type":"1-1","entity":"question","leftKey":"id_question","name":"question","foreign_name":"text"},{"type":"1-1","entity":"user","name":"user","leftKey":"id_user","foreign_name":"email"},{"type":"1-1","entity":"media","name":"media","leftKey":"id_media","foreign_name":"url"},{"type":"1-1","entity":"questiontopic","name":"topic","leftKey":"id_topic","foreign_name":"name"}],"entity":"user_answer","model":"entity"}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(User_answer, BaseModel)
module.exports = User_answer