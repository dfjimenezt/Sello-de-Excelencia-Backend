/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * user_questiontopic
 * [{"Field":"id_user","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_topic","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 21 / 8 / 2017 - 6:57:49
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var User_questiontopic = function () {
	var params = [{
		table:'user_questiontopic',
		fields :[{"Field":"id_user","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_topic","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(User_questiontopic, BaseModel)
module.exports = User_questiontopic