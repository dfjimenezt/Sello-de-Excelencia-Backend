var app = angular.module('anpApp', ['angular-loading-bar', 'ngMaterial', 'md.data.table']);

app.config(function ($httpProvider, $mdThemingProvider) {
	$httpProvider.defaults.useXDomain = true;
	$httpProvider.defaults.withCredentials = false;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	$httpProvider.defaults.headers.common.Accept = 'application/json';
	$httpProvider.defaults.headers.common['Content-Type'] = 'application/json';

	$mdThemingProvider.theme('default')
		.primaryPalette('green')
		.accentPalette('orange');
});

app.controller('adminController', function ($scope, contentService, $mdEditDialog) {
	$scope.currentNavItem = 'page1';
	$scope.languageES = true;

	var showError = function (err) {
		console.log(err);
	};

	$scope.changeLang = function () {
		$scope.languageES = !$scope.languageES;
	};

	$scope.editInfo = function (event, object, table, atribute) {
		event.stopPropagation();
		$mdEditDialog.large({
			modelValue: object[atribute],
			placeholder: 'Ingresa un valor',
			save: function (input) {
				object[atribute] = input.$modelValue;
				var copy = {};
				for (var tag in object) {
					if (tag === atribute) copy[tag] = object[tag];
					else if (tag === 'id') copy[tag] = object[tag];
					else if (tag === 'id_ficha') copy[tag] = object[tag];
					else if (tag === 'id_fauna') copy[tag] = object[tag];
					else if (tag === 'id_flora') copy[tag] = object[tag];
				}
				if (table === 'anp') contentService.updateAnp(copy).catch(showError);
				else if (table === 'ecosistema') contentService.updateEcosistema(copy).catch(showError);
				else if (table === 'ecoturismo') contentService.updateEcoturismo(copy).catch(showError);
				else if (table === 'fauna') contentService.updateFauna(copy).catch(showError);
				else if (table === 'flora') contentService.updateFlora(copy).catch(showError);
				else if (table === 'turismo_de_naturaleza') contentService.updateTurismoDeNaturaleza(copy).catch(showError);
				else if (table === 'turismo_rural') contentService.updateTurismoRural(copy).catch(showError);
				else if (table === 'turismo_de_aventura') contentService.updateTurismoDeAventura(copy).catch(showError);
				else if (table === 'faq') contentService.updateFaq(copy).catch(showError);
			},
			targetEvent: event
		});
	};

	$scope.anps = [];
	$scope.promiseAnp = contentService.readAnps();
	$scope.promiseAnp.then(function (results) {
		$scope.anps = results;
	});

	$scope.ecosistemas = [];
	$scope.promiseEcosistema = contentService.readEcosistemas();
	$scope.promiseEcosistema.then(function (results) {
		$scope.ecosistemas = results;
	});

	$scope.ecoturismos = [];
	$scope.promiseEcoturismo = contentService.readEcoturismos();
	$scope.promiseEcoturismo.then(function (results) {
		$scope.ecoturismos = results;
	});

	$scope.faunas = [];
	$scope.promiseFauna = contentService.readFauna();
	$scope.promiseFauna.then(function (results) {
		$scope.faunas = results;
	});

	$scope.floras = [];
	$scope.promiseFlora = contentService.readFlora();
	$scope.promiseFlora.then(function (results) {
		$scope.floras = results;
	});

	$scope.turismosDeNaturaleza = [];
	$scope.promiseTurismoDeNaturaleza = contentService.readTurismoDeNaturaleza();
	$scope.promiseTurismoDeNaturaleza.then(function (results) {
		$scope.turismosDeNaturaleza = results;
	});

	$scope.turismosRurales = [];
	$scope.promiseTurismoRural = contentService.readTurismoRural();
	$scope.promiseTurismoRural.then(function (results) {
		$scope.turismosRurales = results;
	});

	$scope.turismosDeAventura = [];
	$scope.promiseTurismoDeAventura = contentService.readTurismoDeAventura();
	$scope.promiseTurismoDeAventura.then(function (results) {
		$scope.turismosDeAventura = results;
	});

	$scope.faqs = [];
	$scope.promiseFaq = contentService.readFaq();
	$scope.promiseFaq.then(function (results) {
		$scope.faqs = results;
	});
});

app.service('contentService', function ($http, $httpParamSerializerJQLike) {
	// AngularJS will instantiate a singleton by calling "new" on this function
	var endPoints = {
		create_anp: "../auth/admin/create_anp",
		create_ecosistema: "../auth/admin/create_ecosistema",
		create_ecoturismo: "../auth/admin/create_ecoturismo",
		create_fauna: "../auth/admin/create_fauna",
		create_flora: "../auth/admin/create_flora",
		create_turismo_de_naturaleza: "../auth/admin/create_turismo_de_naturaleza",
		create_turismo_rural: "../auth/admin/create_turismo_rural",
		create_turismo_de_aventura: "../auth/admin/create_turismo_de_aventura",
		create_faq: "../auth/admin/create_faq",

		read_anps: "../auth/admin/all_anp",
		read_ecosistemas: "../auth/admin/all_ecosistema",
		read_ecoturismo: "../auth/admin/all_ecoturismo",
		read_fauna: "../auth/admin/all_fauna",
		read_flora: "../auth/admin/all_flora",
		read_turismo_de_naturaleza: "../auth/admin/all_turismo_de_naturaleza",
		read_turismo_rural: "../auth/admin/all_turismo_rural",
		read_turismo_de_aventura: "../auth/admin/all_turismo_de_aventura",
		read_faq: "../auth/admin/all_faq",

		update_anp: "../auth/admin/update_anp",
		update_ecosistema: "../auth/admin/update_ecosistema",
		update_ecoturismo: "../auth/admin/update_ecoturismo",
		update_fauna: "../auth/admin/update_fauna",
		update_flora: "../auth/admin/update_flora",
		update_turismo_de_naturaleza: "../auth/admin/update_turismo_de_naturaleza",
		update_turismo_rural: "../auth/admin/update_turismo_rural",
		update_turismo_de_aventura: "../auth/admin/update_turismo_de_aventura",
		update_faq: "../auth/admin/update_faq",

		delete_anp: "../auth/admin/delete_anp",
		delete_ecosistema: "../auth/admin/delete_ecosistema",
		delete_ecoturismo: "../auth/admin/delete_ecoturismo",
		delete_fauna: "../auth/admin/delete_fauna",
		delete_flora: "../auth/admin/delete_flora",
		delete_turismo_de_naturaleza: "../auth/admin/delete_turismo_de_naturaleza",
		delete_turismo_rural: "../auth/admin/delete_turismo_rural",
		delete_turismo_de_aventura: "../auth/admin/delete_turismo_de_aventura",
		delete_faq: "../auth/admin/delete_faq"
	};
	return {
		makeRequest: function (endpoint, method, params) {
			return new Promise(function (resolve, reject) {
				var options = {
					url: endpoint,
					method: method,
					headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
				};
				if (method === "GET") { options.params = params; }
				else if (method === "POST" || method === "DELETE" || method === "PUT") {
					options.data = $httpParamSerializerJQLike(params);
				}

				$http(options)
					.success(function (data) { resolve(data); })
					.error(function (err) { reject(err); });
			});
		},
		createAnp: function (obj) { return this.makeRequest(endPoints.create_anp, "POST", obj); },
		createEcosistema: function (obj) { return this.makeRequest(endPoints.create_ecosistema, "POST", obj); },
		createEcoturismo: function (obj) { return this.makeRequest(endPoints.create_ecoturismo, "POST", obj); },
		createFauna: function (obj) { return this.makeRequest(endPoints.create_fauna, "POST", obj); },
		createFlora: function (obj) { return this.makeRequest(endPoints.create_flora, "POST", obj); },
		createTurismoDeNaturaleza: function (obj) { return this.makeRequest(endPoints.create_turismo_de_naturaleza, "POST", obj); },
		createTurismorural: function (obj) { return this.makeRequest(endPoints.create_turismo_rural, "POST", obj); },
		createTurismoDeAventura: function (obj) { return this.makeRequest(endPoints.create_turismo_de_aventura, "POST", obj); },
		createFaq: function (obj) { return this.makeRequest(endPoints.create_faq, "POST", obj); },

		readAnps: function () { return this.makeRequest(endPoints.read_anps, "GET", {}); },
		readEcosistemas: function () { return this.makeRequest(endPoints.read_ecosistemas, "GET", {}); },
		readEcoturismos: function () { return this.makeRequest(endPoints.read_ecoturismo, "GET", {}); },
		readFauna: function () { return this.makeRequest(endPoints.read_fauna, "GET", {}); },
		readFlora: function () { return this.makeRequest(endPoints.read_flora, "GET", {}); },
		readTurismoDeNaturaleza: function () { return this.makeRequest(endPoints.read_turismo_de_naturaleza, "GET", {}); },
		readTurismoRural: function () { return this.makeRequest(endPoints.read_turismo_rural, "GET", {}); },
		readTurismoDeAventura: function () { return this.makeRequest(endPoints.read_turismo_de_aventura, "GET", {}); },
		readFaq: function () { return this.makeRequest(endPoints.read_faq, "GET", {}); },

		updateAnp: function (obj) { return this.makeRequest(endPoints.update_anp, "PUT", obj); },
		updateEcosistema: function (obj) { return this.makeRequest(endPoints.update_ecosistema, "PUT", obj); },
		updateEcoturismo: function (obj) { return this.makeRequest(endPoints.update_ecoturismo, "PUT", obj); },
		updateFauna: function (obj) { return this.makeRequest(endPoints.update_fauna, "PUT", obj); },
		updateFlora: function (obj) { return this.makeRequest(endPoints.update_flora, "PUT", obj); },
		updateTurismoDeNaturaleza: function (obj) { return this.makeRequest(endPoints.update_turismo_de_naturaleza, "PUT", obj); },
		updateTurismoRural: function (obj) { return this.makeRequest(endPoints.update_turismo_rural, "PUT", obj); },
		updateTurismoDeAventura: function (obj) { return this.makeRequest(endPoints.update_turismo_de_aventura, "PUT", obj); },
		updateFaq: function (obj) { return this.makeRequest(endPoints.update_faq, "PUT", obj); },

		deleteAnp: function (obj) { return this.makeRequest(endPoints.delete_anp, "DELETE", obj); },
		deleteEcosistema: function (obj) { return this.makeRequest(endPoints.delete_ecosistema, "DELETE", obj); },
		deleteEcoturismo: function (obj) { return this.makeRequest(endPoints.delete_ecoturismo, "DELETE", obj); },
		deleteFauna: function (obj) { return this.makeRequest(endPoints.delete_fauna, "DELETE", obj); },
		deleteFlora: function (obj) { return this.makeRequest(endPoints.delete_flora, "DELETE", obj); },
		deleteTurismoDeNaturaleza: function (obj) { return this.makeRequest(endPoints.delete_turismo_de_naturaleza, "DELETE", obj); },
		deleteTurismoRural: function (obj) { return this.makeRequest(endPoints.delete_turismo_rural, "DELETE", obj); },
		deleteTurismoDeAventura: function (obj) { return this.makeRequest(endPoints.delete_turismo_de_aventura, "DELETE", obj); },
		deleteFaq: function (obj) { return this.makeRequest(endPoints.delete_faq, "DELETE", obj); }
	};
});
