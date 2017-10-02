/**  * ENTITY AUTO_GENERATED BY DMT-GENERATOR
 * {{ENTITY_NAME}}
 * DMT 2017
 * GENERATED: 27 / 9 / 2017 - 20:49:11
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Evaluator = function () {
	var params = [{
	"table": "user",
	"relations": [
		{
			"type": "n-n",
			"entity": "category",
			"name": "categories",
			"intermediate": {
				"entity": "user_category",
				"leftKey": "id_user",
				"rightKey": "id_category"
			}
		},
		{
			"type": "n-n",
			"entity": "questiontopic",
			"name": "topics",
			"intermediate": {
				"entity": "user_questiontopic",
				"leftKey": "id_user",
				"rightKey": "id_topic"
			}
		},
		{
			"type": "1-1",
			"name": "availability",
			"entity": "availability",
			"leftKey": "id_availability",
			"foreign_name": "name"
		},
		{
			"type": "1-1",
			"name": "city",
			"entity": "city",
			"leftKey": "id_city",
			"foreign_name": "name"
		},
		{
			"type": "1-1",
			"name": "region",
			"entity": "region",
			"leftKey": "id_region",
			"foreign_name": "name"
		},
		{
			"type": "1-1",
			"name": "country",
			"entity": "country",
			"leftKey": "id_country",
			"foreign_name": "name"
		},
		{
			"type": "1-1",
			"name": "type_document",
			"entity": "type_document",
			"leftKey": "id_type_document",
			"foreign_name": "name"
		},
		{
			"type": "1-n",
			"name": "points",
			"rightKey": "id_user",
			"entity": "points"
		},
		{
			"type": "1-n",
			"name": "requests",
			"rightKey": "id_user",
			"entity": "evaluation_request"
		}
	],
	"entity": "evaluator",
	"model": "entity"
}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Evaluator, BaseModel)
module.exports = Evaluator