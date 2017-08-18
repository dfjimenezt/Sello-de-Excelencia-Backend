/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * message
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"text","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"url","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_topic","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_user","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"timestamp","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""}]
 * DMT 2017
 * GENERATED: 18 / 8 / 2017 - 13:23:2
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Message = function () {
	var params = [{
		table:'message',
		fields :[{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"text","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"url","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_topic","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_user","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"timestamp","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Message, BaseModel)
module.exports = Message