/**  * ENTITY AUTO_GENERATED BY DMT-GENERATOR
 * {{ENTITY_NAME}}
 * DMT 2017
 * GENERATED: 15 / 9 / 2017 - 1:25:45
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Service = function () {
	var params = [{
	"table": "service",
	"relations": [
		{
			"type": "1-1",
			"name": "category",
			"foreign_name": "name",
			"entity": "category",
			"leftKey": "id_category"
		},
		{
			"type": "1-1",
			"name": "institution",
			"foreign_name": "name",
			"entity": "institution",
			"leftKey": "id_institution"
		},
		{
			"type": "1-n",
			"name": "history",
			"rightKey": "id_service",
			"entity": "service_status"
		},
		{
			"type": "1-1",
			"name": "status",
			"leftKey": "current_status",
			"foreign_name": "name",
			"entity": "status"
		},
		{
			"type": "1-n",
			"name": "comments",
			"entity": "service_comment",
			"rightKey": "id_service"
		}
	],
	"entity": "service",
	"model": "entity"
}]
	BaseModel.apply(this, params)

	this.delete = function(id){
		let q = `SET FOREIGN_KEY_CHECKS = 0;
		DELETE FROM service_status WHERE id_service = '${id}';
		DELETE FROM service_comment WHERE id_service = '${id}';
		DELETE FROM service_comment WHERE id_service = '${id}';
		DELETE FROM user_answer WHERE id_service = '${id}';
		DELETE chats FROM chats JOIN evaluation_request on chats.id_evaluation_request = evaluation_request.id WHERE evaluation_request.id_service = ${id};
		DELETE FROM evaluation_request WHERE id_service = '${id}';
		DELETE FROM service WHERE id = ${id};
		SET FOREIGN_KEY_CHECKS = 1;
		`
		console.log(q)
		return this.customQuery(q)
	}
	return this
};
util.inherits(Service, BaseModel)
module.exports = Service