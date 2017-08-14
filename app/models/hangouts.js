/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * hangouts
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"title","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"url","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"description","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_role","Type":"tinyint(4)","Null":"YES","Key":"","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 11 / 8 / 2017 - 18:53:10
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Hangouts = function () {
	var params = [{
		table:'hangouts',
		fields :[{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"title","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"url","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"description","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_role","Type":"tinyint(4)","Null":"YES","Key":"","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Hangouts, BaseModel)
module.exports = Hangouts