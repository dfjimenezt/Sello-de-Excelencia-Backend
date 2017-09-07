/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * servicios_en_linea
 * [{"Field":"Etapa","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Requisito","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Criterio","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Evidencia","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Sustento legal o técnico","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Ayuda","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Nivel","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Perfil","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Area Tematica","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Preguntas","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 5 / 9 / 2017 - 7:38:21
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Servicios_en_linea = function () {
	var params = [{
		table:'servicios_en_linea',
		fields :[{"Field":"Etapa","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Requisito","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Criterio","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Evidencia","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Sustento legal o técnico","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Ayuda","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Nivel","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Perfil","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Area Tematica","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Preguntas","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Servicios_en_linea, BaseModel)
module.exports = Servicios_en_linea