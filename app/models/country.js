/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * country
 * [{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"nacionalidad","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_capital","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 24 / 8 / 2017 - 18:2:54
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Country = function () {
	var params = [{
		table:'country',
		fields :[{"Field":"id","Type":"int(11)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(255)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"nacionalidad","Type":"varchar(50)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_capital","Type":"int(11)","Null":"YES","Key":"MUL","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Country, BaseModel)
module.exports = Country