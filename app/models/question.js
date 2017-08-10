/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * question
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"text","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_type","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_topic","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_form","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 5 / 8 / 2017 - 14:44:43
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Question = function () {
	var params = [{
		table:'question',
		fields :[{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"text","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_type","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_topic","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_form","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Question, BaseModel)
module.exports = Question