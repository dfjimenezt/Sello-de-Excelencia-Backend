/**  * MODEL AUTO_GENERATED BY DMT-GENERATOR
 * gobierno_en_linea_requisitos_participacion
 * [{"Field":"Etapa","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Requisito","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Criterio","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Evidencia","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Sustento legal o técnico","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Ayuda","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Nivel","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Perfil","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Area Tematica","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Preguntas","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""}]
 * DMT 2017
 * GENERATED: 22 / 8 / 2017 - 9:41:42
 **/
var BaseModel = require('../utils/model.js')
var util = require('util')
var Gobierno_en_linea_requisitos_participacion = function () {
	var params = [{
		table:'gobierno_en_linea_requisitos_participacion',
		fields :[{"Field":"Etapa","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Requisito","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Criterio","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Evidencia","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Sustento legal o técnico","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Ayuda","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Nivel","Type":"int(11)","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Perfil","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Area Tematica","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""},{"Field":"Preguntas","Type":"text","Null":"YES","Key":"","Default":null,"Extra":""}],
		model:'mysql'
	}]
	BaseModel.apply(this, params)
	return this
};
util.inherits(Gobierno_en_linea_requisitos_participacion, BaseModel)
module.exports = Gobierno_en_linea_requisitos_participacion