/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * type
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 6 / 2 / 2017 - 11:59:19
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Type = function () {
	this.fields = [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""}]
	var params = ['type', 'mysql']
	BaseModel.apply(this, params)
	return this
};
util.inherits(Type, BaseModel)
module.exports = Type