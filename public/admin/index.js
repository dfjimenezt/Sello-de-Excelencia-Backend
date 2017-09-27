/*
*
*   ARRRRRRRRRRRRRRRRRRRRRR!
*
*
*              |    |    |
*             )_)  )_)  )_)
*            )___))___))___)
*           )____)____)_____)\
*         _____|____|____|____\\\__
*---------\                   /---------
*  ^^^^^ ^^^^^^^^^^^^^^^^^^^^^
*    ^^^^      ^^^^     ^^^    ^^
*         ^^^^      ^^^
*
*
*/
if (!localStorage.getItem("token")) {
	window.location.href = "/admin/login";
}
var app = angular.module('dmt-back', [
'ngRoute', 
'ngMaterial', 
'ngSanitize', 
'md.data.table',
'textAngular',
'ngFileUpload']);
/**
 * Configuration of the application from config.js
 */
app.config(function ($mdThemingProvider, $routeProvider, $locationProvider, $provide) {
	$mdThemingProvider.theme('default')
	
	
	for (var name in dmt.entities) {
		dmt.api.endpoints.forEach(function (endpoint) {
			endpoint.entities.forEach(function (ety) {
				if (ety.entity == name) {
					dmt.entities[name].endpoint = '/api/' + endpoint.controller + '/' + ety.entity
				}
			})
		})
	}
	for(var name in dmt.tables){
		if(dmt.entities[name]){
			continue;
		}
		entity = dmt.entities[name] = {
			table: name,
			fields: dmt.tables[name].fields,
			defaultSort: dmt.tables[name].defaultSort
		}
		//endpoint: '/api/' + section.path + '/',
		dmt.api.endpoints.forEach(function (endpoint) {
			endpoint.entities.forEach(function (ety) {
				if (ety.entity == name) {
					entity.endpoint = '/api/' + endpoint.controller + '/' + ety.entity
				}
			})
		})
	}
	/**
	 * Check if the page has an entity, and load the main table, if there is any 1-1 relation if the entity is not in the entities.js file then asume it is a single table.
	 */
	function processEntity(name, section) {
		/**
		 * Support full entities tree
		 */
		while (section.parent) {
			section = section.parent
		}

		let entity = dmt.entities[name];
		
		if (entity) {
			entity.table = entity.table
			entity.fields = dmt.tables[entity.table].fields
			if (entity.translate) {
				let translatefields = dmt.tables[entity.translate.table].fields
				translatefields.forEach((f) => {
					if (f.name == entity.translate.rightKey || f.name === "id_lang") {
						return
					}
					f.prefix = entity.translate.table+'_'
					entity.fields.push(f);
				})
			}
			entity.defaultSort = dmt.tables[entity.table].defaultSort
		}
		console.log(name);
		entity.relations = entity.relations || []
		entity.relations.forEach((relation) => {
			if (relation.leftKey) {
				let table = dmt.tables[entity.table]
				table.fields.forEach((f) => {
					if (f.name == relation.leftKey) {
						let foreign_entity = dmt.entities[relation.entity]
						let foreign_table = null
						if (foreign_entity) {
							foreign_table = dmt.tables[foreign_entity.table]
							f.table = foreign_entity.table
							f.endpoint = foreign_entity.endpoint
						} else {
							foreign_table = dmt.tables[relation.entity]
							f.table = relation.entity
						}
						f.type = "link"
						f.foreign_key = foreign_table.defaultSort
						f.foreign_name = relation.foreign_name
					}
				})
			}
		})
	}

	function addPage(path, page, parent) {
		page.parent = parent;
		if (page.entity) {
			processEntity(page.entity, parent)
		}
		var route = {
			controller: page.controller || "listItemController",
			controllerAs: page.controllerAs || "ctrl",
			templateUrl: page.templateUrl || "views/default/list.html",
			resolve: {
				page: function () { return page; }
			}
		};
		var _path = path + "/" + page.path;
		$routeProvider.when(_path, route);
		if (page.pages) {
			page.pages.forEach((child) => {
				addPage(_path, child, page);
			})
		}
	}

	/**
	 * Parse Config File to create the navigation tree
	 */
	dmt.config.forEach((section) => {
		section.pages.forEach((page) => {
			addPage("/" + section.path, page, section);
		});
	});

	$routeProvider.otherwise({
		redirectTo: '/'
	});
	//$locationProvider.html5Mode(true);
	/*$provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions) {
		console.log(taOptions.toolbar);
	}]);*/
});

app.controller('backCtrl', function ($mdSidenav, $location, $http) {
	var ctrl = this;
	$http.defaults.headers.common.Authorization = localStorage.getItem("token");

	this.logout = function () {
		delete $http.defaults.headers.common.Authorization;
		localStorage.removeItem("token");
		window.location.href = "/admin/login";
	}
	this.menu = function () {
		$mdSidenav("menu").toggle();
	};
	this.leftMenu = dmt.config;

	this.selectPage = function (section, page) {
		$location.path(section.path + "/" + page.path);
	};
	this.navigateTo = function (section) {
		$location.path(section);
	}
});
