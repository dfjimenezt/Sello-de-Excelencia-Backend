/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * role
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 19 / 1 / 2017 - 0:59:49
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Role = function () {
	this.fields = [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""}]
	var params = ['role', 'mysql']
	BaseModel.apply(this, params)
	return this
}
util.inherits(Role, BaseModel)
module.exports = Role