/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * service_status
 * [{"Field":"id_service","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_status","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"level","Type":"tinyint(4)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"valid_to","Type":"timestamp","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"timestamp","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""}]
 * DMT 2017
 * GENERATED: 21 / 8 / 2017 - 6:57:49
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Service_status = function () {
	var params = [{
		table:'service_status',
		fields :[{"Field":"id_service","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_status","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"level","Type":"tinyint(4)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"valid_to","Type":"timestamp","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"timestamp","Type":"timestamp","Null":"NO","Key":"","Default":"CURRENT_TIMESTAMP","Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Service_status, BaseModel)
module.exports = Service_status