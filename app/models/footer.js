/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * footer
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"title","Type":"varchar(250)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"text","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 22 / 8 / 2017 - 9:41:42
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Footer = function () {
	var params = [{
		table:'footer',
		fields :[{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"title","Type":"varchar(250)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"text","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Footer, BaseModel)
module.exports = Footer