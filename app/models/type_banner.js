/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * type_banner
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 11 / 8 / 2017 - 18:53:10
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Type_banner = function () {
	var params = [{
		table:'type_banner',
		fields :[{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Type_banner, BaseModel)
module.exports = Type_banner