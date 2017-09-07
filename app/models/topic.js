/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * topic
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_parent","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"private","Type":"tinyint(4)","Null":"YES","Key":"","Default":"0","Extra":""},{"Field":"timestamp","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""}]
 * DMT 2017
 * GENERATED: 5 / 9 / 2017 - 7:38:21
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Topic = function () {
	var params = [{
		table:'topic',
		fields :[{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_parent","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"private","Type":"tinyint(4)","Null":"YES","Key":"","Default":"0","Extra":""},{"Field":"timestamp","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Topic, BaseModel)
module.exports = Topic