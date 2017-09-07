/**  * ENTITY AUTO_GENERATED BY DMT-GENERATOR
 * {{ENTITY_NAME}}
 * DMT 2017
 * GENERATED: 6 / 9 / 2017 - 12:53:55
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Hangouts = function () {
	var params = [{
	"table": "hangouts",
	"relations": [
		{
			"type": "1-1",
			"entity": "role",
			"name": "role",
			"leftKey": "id_role",
			"foreign_name": "name"
		}
	],
	"entity": "hangouts",
	"model": "entity"
}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Hangouts, BaseModel)
module.exports = Hangouts