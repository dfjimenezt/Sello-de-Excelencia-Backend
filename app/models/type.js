/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * type
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 21 / 8 / 2017 - 6:57:49
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Type = function () {
	var params = [{
		table:'type',
		fields :[{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Type, BaseModel)
module.exports = Type