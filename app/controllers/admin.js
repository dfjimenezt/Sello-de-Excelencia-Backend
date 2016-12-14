var BaseController = require('../utils/controller.js');
var util = require('util');
var utiles = require('../utils/utiles.js');

var director_anp = require('../models/director_anp.js');
var ficha_vegetacion = require('../models/ficha_vegetacion.js');
var ficha_fauna = require('../models/ficha_fauna.js');
var ficha_flora = require('../models/ficha_flora.js');
var ficha_municipio = require('../models/ficha_municipio.js');
var ficha_especie_endemica = require('../models/ficha_especie_endemica.js');
var ficha_especie_microendemica = require('../models/ficha_especie_microendemica.js');
var ficha_ecoturismo = require('../models/ficha_ecoturismo.js');
var ficha_turismo_rural = require('../models/ficha_turismo_rural.js');
var ficha_turismo_de_aventura = require('../models/ficha_turismo_de_aventura.js');
var ficha = require('../models/ficha.js');
var faq = require('../models/faq.js');

var ecosistema = require('../models/ecosistema.js');
var ecoturismo = require('../models/ecoturismo.js');
var fauna = require('../models/fauna.js');
var flora = require('../models/flora.js');
var turismo_de_aventura = require('../models/turismo_de_aventura.js');
var turismo_rural = require('../models/turismo_rural.js');
var turismo_de_naturaleza = require('../models/turismo_de_naturaleza.js');

var Admin = function () {
	var director_anp_model = new director_anp();
	var ficha_vegetacion_model = new ficha_vegetacion();
	var ficha_fauna_model = new ficha_fauna();
	var ficha_flora_model = new ficha_flora();
	var ficha_municipio_model = new ficha_municipio();
	var ficha_especie_endemica_model = new ficha_especie_endemica();
	var ficha_especie_microendemica_model = new ficha_especie_microendemica();
	var ficha_ecoturismo_model = new ficha_ecoturismo();
	var ficha_turismo_rural_model = new ficha_turismo_rural();
	var ficha_turismo_de_aventura_model = new ficha_turismo_de_aventura();

	var ficha_model = new ficha();
	var ecosistema_model = new ecosistema();
	var ecoturismo_model = new ecoturismo();
	var fauna_model = new fauna();
	var flora_model = new flora();
	var turismo_de_aventura_model = new turismo_de_aventura();
	var turismo_rural_model = new turismo_rural();
	var turismo_de_naturaleza_model = new turismo_de_naturaleza();
	var faq_model = new faq();

	//---------------------------------------------------------------
	var getMap = new Map(), postMap = new Map(), putMap = new Map(), deleteMap = new Map();

	var allFaq = function (queryParams) {
		return faq_model.getAll();
	};
	var allTurismoDeNaturaleza = function (queryParams) {
		return turismo_de_naturaleza_model.getAll();
	};
	var allTurismoRural = function (queryParams) {
		return turismo_rural_model.getAll();
	};
	var allTurismoDeAventura = function (queryParams) {
		return turismo_de_aventura_model.getAll();
	};
	var allFlora = function (queryParams) {
		return flora_model.getAll();
	};
	var allFauna = function (queryParams) {
		return fauna_model.getAll();
	};
	var allEcotursimo = function (queryParams) {
		return ecoturismo_model.getAll();
	};
	var allEcosistema = function (queryParams) {
		return ecosistema_model.getAll();
	};
	var allANP = function (queryParams) {
		return ficha_model.getAll();
	};
	getMap.set("all_faq", allFaq);
	getMap.set("all_turismo_de_naturaleza", allTurismoDeNaturaleza);
	getMap.set("all_turismo_rural", allTurismoRural);
	getMap.set("all_turismo_de_aventura", allTurismoDeAventura);
	getMap.set("all_flora", allFlora);
	getMap.set("all_fauna", allFauna);
	getMap.set("all_ecoturismo", allEcotursimo);
	getMap.set("all_ecosistema", allEcosistema);
	getMap.set("all_anp", allANP);

	//TODO cuidar body
	var createFaq = function (body) {
		return faq_model.create(body);
	};
	var createTurismoDeNaturaleza = function (body) {
		return turismo_de_naturaleza_model.create(body);
	};
	var createTurismoRural = function (body) {
		return turismo_rural_model.create(body);
	};
	var createTurismoDeAventura = function (body) {
		return turismo_de_aventura_model.create(body);
	};
	var createFlora = function (body) {
		return flora_model.create(body);
	};
	var createFauna = function (body) {
		return fauna_model.create(body);
	};
	var createEcoturismo = function (body) {
		return ecoturismo_model.create(body);
	};
	var createEcosistema = function (body) {
		return ecosistema_model.create(body);
	};
	var createANP = function (body) {
		return ficha_model.create(body);
	};
	postMap.set("create_faq", createFaq);
	postMap.set("create_turismo_de_naturaleza", createTurismoDeNaturaleza);
	postMap.set("create_turismo_rural", createTurismoRural);
	postMap.set("create_turismo_de_aventura", createTurismoDeAventura);
	postMap.set("create_flora", createFlora);
	postMap.set("create_fauna", createFauna);
	postMap.set("create_ecoturismo", createEcoturismo);
	postMap.set("create_ecosistema", createEcosistema);
	postMap.set("create_anp", createANP);

	//TODO cuidar values
	var updateFaq = function (body) {
		var c1 = utiles.isPositiveInteger(body.id);
		if (!c1) return utiles.informError(2);

		var condition = { id: body.id };
		delete body.id;
		return faq_model.update(body, condition);
	};
	var updateTurismoDeNaturaleza = function (body) {
		var c1 = utiles.isPositiveInteger(body.id);
		if (!c1) return utiles.informError(2);

		var condition = { id: body.id };
		delete body.id;
		return turismo_de_naturaleza_model.update(body, condition);
	};
	var updateTurismoRural = function (body) {
		var c1 = utiles.isPositiveInteger(body.id);
		if (!c1) return utiles.informError(2);

		var condition = { id: body.id };
		delete body.id;
		return turismo_rural_model.update(body, condition);
	};
	var updateTurismoDeAventura = function (body) {
		var c1 = utiles.isPositiveInteger(body.id);
		if (!c1) return utiles.informError(2);

		var condition = { id: body.id };
		delete body.id;
		return turismo_de_aventura_model.update(body, condition);
	};
	var updateFlora = function (body) {
		var c1 = utiles.isPositiveInteger(body.id_flora);
		if (!c1) return utiles.informError(2);

		var condition = { id_flora: body.id_flora };
		delete body.id_flora;
		return flora_model.update(body, condition);
	};
	var updateFauna = function (body) {
		var c1 = utiles.isPositiveInteger(body.id_fauna);
		if (!c1) return utiles.informError(2);

		var condition = { id_fauna: body.id_fauna };
		delete body.id_fauna;
		return fauna_model.update(body, condition);
	};
	var updateEcoturismo = function (body) {
		var c1 = utiles.isPositiveInteger(body.id);
		if (!c1) return utiles.informError(2);

		var condition = { id: body.id };
		delete body.id;
		return ecoturismo_model.update(body, condition);
	};
	var updateEcosistema = function (body) {
		var c1 = utiles.isPositiveInteger(body.id);
		if (!c1) return utiles.informError(2);

		var condition = { id: body.id };
		delete body.id;
		return ecosistema_model.update(body, condition);
	};
	var updateANP = function (body) {
		var c1 = utiles.isPositiveInteger(body.id_ficha);
		if (!c1) return utiles.informError(2);

		var condition = { id_ficha: body.id_ficha };
		delete body.id_ficha;
		return ficha_model.update(body, condition);
	};
	putMap.set("update_faq", updateFaq);
	putMap.set("update_turismo_de_naturaleza", updateTurismoDeNaturaleza);
	putMap.set("update_turismo_rural", updateTurismoRural);
	putMap.set("update_turismo_de_aventura", updateTurismoDeAventura);
	putMap.set("update_flora", updateFlora);
	putMap.set("update_fauna", updateFauna);
	putMap.set("update_ecoturismo", updateEcoturismo);
	putMap.set("update_ecosistema", updateEcosistema);
	putMap.set("update_anp", updateANP);

	var deleteFaq = function (body) {
		if (!utiles.isPositiveInteger(body.id)) return utiles.informError(2);
		body = { id: body.id };
		return utiles.unimplementedMethod();
		//TODO mirar que dependencias debo matar
		//return ecoturismo_model.delete(body);
	};
	var deleteTurismoDeNaturaleza = function (body) {
		if (!utiles.isPositiveInteger(body.id)) return utiles.informError(2);
		body = { id: body.id };
		return utiles.unimplementedMethod();
		//TODO mirar que dependencias debo matar
		//return ecoturismo_model.delete(body);
	};
	var deleteTurismoRural = function (body) {
		if (!utiles.isPositiveInteger(body.id)) return utiles.informError(2);
		body = { id: body.id };
		return utiles.unimplementedMethod();
		//TODO mirar que dependencias debo matar
		//return ecoturismo_model.delete(body);
	};
	var deleteTurismoDeAventura = function (body) {
		if (!utiles.isPositiveInteger(body.id)) return utiles.informError(2);
		body = { id: body.id };
		return utiles.unimplementedMethod();
		//TODO mirar que dependencias debo matar
		//return ecoturismo_model.delete(body);
	};
	var deleteFlora = function (body) {
		if (!utiles.isPositiveInteger(body.id_flora)) return utiles.informError(2);
		body = { id_flora: body.id_flora };
		return utiles.unimplementedMethod();
		//TODO mirar que dependencias debo matar
		//return ecoturismo_model.delete(body);
	};
	var deleteFauna = function (body) {
		if (!utiles.isPositiveInteger(body.id_fauna)) return utiles.informError(2);
		body = { id_fauna: body.id_fauna };
		return utiles.unimplementedMethod();
		//TODO mirar que dependencias debo matar
		//return ecoturismo_model.delete(body);
	};
	var deleteEcoturismo = function (body) {
		if (!utiles.isPositiveInteger(body.id)) return utiles.informError(2);
		body = { id: body.id };
		return utiles.unimplementedMethod();
		//TODO mirar que dependencias debo matar
		//return ecoturismo_model.delete(body);
	};
	var deleteEcosistema = function (body) {
		if (!utiles.isPositiveInteger(body.id)) return utiles.informError(2);
		body = { id: body.id };
		return ecosistema_model.delete(body);
	};
	var deleteANP = function (body) {
		if (!utiles.isPositiveInteger(body.id_ficha)) return utiles.informError(2);
		body = { id_ficha: body.id_ficha };
		var p1 = director_anp_model.delete(body);
		var p2 = ficha_vegetacion_model.delete(body);
		var p3 = ficha_fauna_model.delete(body);
		var p4 = ficha_flora_model.delete(body);
		var p5 = ficha_municipio_model.delete(body);
		var p6 = ficha_especie_endemica_model.delete(body);
		var p7 = ficha_especie_microendemica_model.delete(body);
		var p8 = ficha_ecoturismo_model.delete(body);
		var p9 = ficha_turismo_rural_model.delete(body);
		var p10 = ficha_turismo_de_aventura_model.delete(body);
		return Promise.all([p1, p2, p3, p4, p5]).then((values) => {
			return ficha_model.delete(body);
		});
	};
	deleteMap.set("delete_faq", deleteFaq);
	deleteMap.set("delete_turismo_de_naturaleza", deleteTurismoDeNaturaleza);
	deleteMap.set("delete_turismo_rural", deleteTurismoRural);
	deleteMap.set("delete_turismo_de_aventura", deleteTurismoDeAventura);
	deleteMap.set("delete_flora", deleteFlora);
	deleteMap.set("delete_fauna", deleteFauna);
	deleteMap.set("delete_ecoturismo", deleteEcoturismo);
	deleteMap.set("delete_ecosistema", deleteEcosistema);
	deleteMap.set("delete_anp", deleteANP);

	var params = [getMap, postMap, putMap, deleteMap];
	BaseController.apply(this, params);
	//---------------------------------------------------------------

	return this;
};

util.inherits(Admin, BaseController);

module.exports = Admin;