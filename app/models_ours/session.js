/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * session
 * [{"Field":"id_user","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"agent","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"ip","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"token","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"expires","Type":"datetime","Null":"YES","Key":"","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 10 / 7 / 2017 - 10:39:0
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Session = function () {
	var params = [{
		table:'session',
		fields :[{"Field":"id_user","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"agent","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"ip","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"token","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"expires","Type":"datetime","Null":"YES","Key":"","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Session, BaseModel)
module.exports = Session