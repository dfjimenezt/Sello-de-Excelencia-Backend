var BaseController = require('../utils/controller.js');
var util = require('util');
var utiles = require('../utils/utiles.js');

var faq = require('../models/faq.js');
var ficha = require('../models/ficha.js');
var fauna = require('../models/fauna.js');
var categoria_manejo = require('../models/categoria_manejo.js');
var flora = require('../models/flora.js');
var region = require('../models/region.js');
var ecosistema = require('../models/ecosistema.js');
var ecoturismo = require('../models/ecoturismo.js');
var turismo_de_aventura = require('../models/turismo_de_aventura.js');
var turismo_rural = require('../models/turismo_rural.js');
var turismo_de_naturaleza = require('../models/turismo_de_naturaleza.js');

var Anp = function () {
	var faq_model = new faq();
	var ficha_model = new ficha();
	var fauna_model = new fauna();
	var categoria_manejo_model = new categoria_manejo();
	var flora_model = new flora();
	var region_model = new region();
	var ecosistema_model = new ecosistema();
	var ecoturismo_model = new ecoturismo();
	var turismo_de_aventura_model = new turismo_de_aventura();
	var turismo_rural_model = new turismo_rural();
	var turismo_de_naturaleza_model = new turismo_de_naturaleza();

	//---------------------------------------------------------------
	var getMap = new Map(), postMap = new Map(), putMap = new Map(), deleteMap = new Map();

	var allFaq = function (queryParams) {
		return faq_model.getAll();
	};
	var allFauna = function (queryParams) {
		return fauna_model.getAll();
	};
	var allFlora = function (queryParams) {
		return flora_model.getAll();
	};
	var allCategoriaManejo = function (queryParams) {
		return categoria_manejo_model.getAll();
	};
	var allRegion = function (queryParams) {
		return region_model.getAll();
	};
	var allEcosistema = function (queryParams) {
		return ecosistema_model.getAll();
	};
	var allEcotursimo = function (queryParams) {
		return ecoturismo_model.getAll();
	};
	var allTurismoDeAventura = function (queryParams) {
		return turismo_de_aventura_model.getAll();
	};
	var allTurismoRural = function (queryParams) {
		return turismo_rural_model.getAll();
	};
	var allTurismoDeNaturaleza = function (queryParams) {
		return turismo_de_naturaleza_model.getAll();
	};
	var allANP = function (queryParams) {
		return ficha_model.getAll();
	};
	var allANPEnTemporada = function (queryParams) {
		queryParams.timestamp = (!queryParams.timestamp) ? Date.now() : parseInt(queryParams.timestamp);
		if (!utiles.isTimeStamp(queryParams.timestamp)) return utiles.informError(2);
		var date = new Date(queryParams.timestamp);
		var month = date.getMonth();
		return ficha_model.getInTemporada(month);
	};
	var allANPEnRegion = function (queryParams) {
		if (!utiles.isPositiveInteger(queryParams.id)) return utiles.informError(2);
		return ficha_model.getByParams({ id_region: queryParams.id, visible: '1' });
	};
	var allANPEnEcosistema = function (queryParams) {
		if (!utiles.isPositiveInteger(queryParams.id)) return utiles.informError(2);
		return ficha_model.getByParams({ id_ecosistema: queryParams.id, visible: '1' });
	};
	var anpPorId = function (queryParams) {
		if (!utiles.isPositiveInteger(queryParams.id)) return utiles.informError(2);
		return ficha_model.personalizadoPorId(queryParams.id);
	};
	var anpEcoturismo = function (queryParams) {
		if (!utiles.isArrayOfPositiveIntegers(queryParams.array)) {
			if (!utiles.isPositiveInteger(queryParams.array)) return utiles.informError(2);
			var temp = [];
			temp.push(queryParams.array);
			queryParams.array = temp;
		}
		return ficha_model.anpEcoturismo(queryParams.array);
	};
	var anpTurismoRural = function (queryParams) {
		if (!utiles.isArrayOfPositiveIntegers(queryParams.array)) {
			if (!utiles.isPositiveInteger(queryParams.array)) return utiles.informError(2);
			var temp = [];
			temp.push(queryParams.array);
			queryParams.array = temp;
		}
		return ficha_model.anpTurismoRural(queryParams.array);
	};
	var anpTurismoAventura = function (queryParams) {
		if (!utiles.isArrayOfPositiveIntegers(queryParams.array)) {
			if (!utiles.isPositiveInteger(queryParams.array)) return utiles.informError(2);
			var temp = [];
			temp.push(queryParams.array);
			queryParams.array = temp;
		}
		return ficha_model.anpTurismoAventura(queryParams.array);
	};
	var fichasByFilters = function (queryParams) {
		return ficha_model.getByParams(queryParams);
	};
	var anpPorUbicacion = function (queryParams) {
		//Ciudad de mexico es la ubicacion por defecto
		var latitud = queryParams.latitud || "19°25'10\"N", longitud = queryParams.longitud || "99°8'44\"W";
		if (!utiles.isCoordinade(latitud) || !utiles.isCoordinade(longitud)) return utiles.informError(2);
		return ficha_model.anpPorUbicacion(latitud, longitud);
	};
	var anpDestacadas = function (queryParams) {
		return ficha_model.getDestacadas();
	};
	var anpBuscar = function (queryParams) {
		var txt = utiles.filterSqlInjection(queryParams.txt);
		return ficha_model.search(txt);
	};
	getMap.set("all_faq", allFaq);
	getMap.set("all_fauna", allFauna);
	getMap.set("all_flora", allFlora);
	getMap.set("all_categoria_manejo", allCategoriaManejo);
	getMap.set("all_region", allRegion);
	getMap.set("all_ecosistema", allEcosistema);
	getMap.set("all_ecoturismo", allEcotursimo);
	getMap.set("all_turismo_de_aventura", allTurismoDeAventura);
	getMap.set("all_turismo_rural", allTurismoRural);
	getMap.set("all_turismo_de_naturaleza", allTurismoDeNaturaleza);
	getMap.set("all_anp", allANP);
	getMap.set("all_anp_en_temporada", allANPEnTemporada);
	getMap.set("all_anp_en_region", allANPEnRegion);
	getMap.set("all_anp_en_ecosistema", allANPEnEcosistema);
	getMap.set("anp_por_id", anpPorId);
	getMap.set("anp_por_ecoturismo", anpEcoturismo);
	getMap.set("anp_por_turismo_rural", anpTurismoRural);
	getMap.set("anp_por_turismo_Aventura", anpTurismoAventura);
	getMap.set("fichas_by_filters", fichasByFilters);
	getMap.set("anp_por_ubicacion", anpPorUbicacion);
	getMap.set("anp_destacadas", anpDestacadas);
	getMap.set("buscar_anp", anpBuscar);

	var params = [getMap, postMap, putMap, deleteMap];
	BaseController.apply(this, params);
	//---------------------------------------------------------------

	return this;
};

util.inherits(Anp, BaseController);

module.exports = Anp;