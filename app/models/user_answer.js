/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * user_answer
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"id_order","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_user","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_service","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_question","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_topic","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_status","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_media","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"comment","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"datetime","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":"on update CURRENT_TIMESTAMP"},{"Field":"timestamp","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""},{"Field":"requisite","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"support_legal","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"justification","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"evidence","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"help","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"alert","Type":"tinyint(1)","Null":"YES","Key":"","Default":"0","Extra":""}]
 * DMT 2017
 * GENERATED: 24 / 8 / 2017 - 18:2:54
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var User_answer = function () {
	var params = [{
		table:'user_answer',
		fields :[{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"id_order","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_user","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_service","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_question","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_topic","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_status","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_media","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"comment","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"datetime","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":"on update CURRENT_TIMESTAMP"},{"Field":"timestamp","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""},{"Field":"requisite","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"support_legal","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"justification","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"evidence","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"help","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"alert","Type":"tinyint(1)","Null":"YES","Key":"","Default":"0","Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(User_answer, BaseModel)
module.exports = User_answer