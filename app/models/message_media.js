/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * message_media
 * [{"Field":"id_media","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_message","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 21 / 8 / 2017 - 6:57:49
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Message_media = function () {
	var params = [{
		table:'message_media',
		fields :[{"Field":"id_media","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_message","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Message_media, BaseModel)
module.exports = Message_media