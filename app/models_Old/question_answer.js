/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * question_answer
 * [{"Field":"id_question","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_answer","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 10 / 7 / 2017 - 10:39:0
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Question_answer = function () {
	var params = [{
		table:'question_answer',
		fields :[{"Field":"id_question","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_answer","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Question_answer, BaseModel)
module.exports = Question_answer