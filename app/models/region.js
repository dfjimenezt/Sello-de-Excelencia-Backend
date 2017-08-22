/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * region
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_capital","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_country","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"code","Type":"varchar(2)","Null":"YES","Key":"","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 22 / 8 / 2017 - 9:41:42
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Region = function () {
	var params = [{
		table:'region',
		fields :[{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_capital","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"id_country","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""},{"Field":"code","Type":"varchar(2)","Null":"YES","Key":"","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Region, BaseModel)
module.exports = Region