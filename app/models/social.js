/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * social
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"icon","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"link","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 24 / 8 / 2017 - 18:2:54
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Social = function () {
	var params = [{
		table:'social',
		fields :[{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"icon","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"link","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Social, BaseModel)
module.exports = Social