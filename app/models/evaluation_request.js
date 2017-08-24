/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * evaluation_request
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"id_user","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_question","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_service","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_request_status","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"timestamp","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""},{"Field":"result","Type":"tinyint(4)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"branch","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"justify_reject","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"alert_time","Type":"timestamp","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"end_time","Type":"timestamp","Null":"YES","Key":"","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 24 / 8 / 2017 - 18:2:54
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Evaluation_request = function () {
	var params = [{
		table:'evaluation_request',
		fields :[{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"id_user","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_question","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_service","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_request_status","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"timestamp","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""},{"Field":"result","Type":"tinyint(4)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"branch","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"justify_reject","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"alert_time","Type":"timestamp","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"end_time","Type":"timestamp","Null":"YES","Key":"","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Evaluation_request, BaseModel)
module.exports = Evaluation_request