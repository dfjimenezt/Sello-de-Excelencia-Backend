/**  * ENTITY AUTO_GENERATED BY DMT-GENERATOR
 * {{ENTITY_NAME}}
 * DMT 2017
 * GENERATED: 5 / 9 / 2017 - 7:38:21
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Evaluation_request = function () {
	var params = [
		{
			"table":"evaluation_request",
			"relations":[
				{
					"type":"1-1",
					"entity":"user",
					"leftKey":"id_user",
					"name":"user",
					"foreign_name":"email"
				},
				{
					"type":"1-1",
					"entity":"user_answer",
					"leftKey":"id_answer",
					"name":"user_answer",
					"foreign_name":"name"
				},
				{
					"type":"1-1",
					"entity":"question",
					"leftKey":"id_question",
					"name":"question",
					"foreign_name":"name"
				},
				{
					"type":"1-1",
					"entity":"service",
					"leftKey":"id_service",
					"name":"service",
					"foreign_name":"name"
				},
				{
					"type":"1-1",
					"entity":"request_status",
					"leftKey":"id_request_status",
					"name":"status",
					"foreign_name":"name"
				},
				{
					"type":"1-n",
					"entity":"chats",
					"name":"chats",
					"rightKey":"id_evaluation_request"
				}
			],
			"entity":"evaluation_request",
			"model":"entity"
		}
	]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Evaluation_request, BaseModel)
module.exports = Evaluation_request