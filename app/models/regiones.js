/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * regiones
 * [{"Field":"name","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_country","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 18 / 8 / 2017 - 13:23:2
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Regiones = function () {
	var params = [{
		table:'regiones',
		fields :[{"Field":"name","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"id_country","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Regiones, BaseModel)
module.exports = Regiones