/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * type_document
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 18 / 8 / 2017 - 13:23:2
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Type_document = function () {
	var params = [{
		table:'type_document',
		fields :[{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Type_document, BaseModel)
module.exports = Type_document