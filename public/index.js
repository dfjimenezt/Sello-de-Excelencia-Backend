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

var app = angular.module('dmt-back', ['ngRoute', 'ngMaterial','ngSanitize','md.data.table']);
/**
 * Configuration of the application from config.js
 */
app.config(function ($mdThemingProvider, $routeProvider, $locationProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('grey');

	let config = cmsConfig;
	function addPage(path,page,parent){
		page.parent = parent;
		let route = {
				controller: page.controller || "listItemController",
				controllerAs: page.controllerAs || "ctrl",
				templateUrl: page.templateUrl || "views/default/list.html",
				resolve: {
					page: function () { return page; }
				}
			};
			var _path = path + "/" + page.path;
			$routeProvider.when(_path, route);
			if(page.pages){
				page.pages.forEach((child)=>{
					addPage(_path,child,page);
				})
			}
	}

	config.forEach((section) => {
		section.pages.forEach((page) => {
			addPage("/"+section.path,page,section);
		});
	});
	
	$routeProvider.otherwise({
		redirectTo: '/'
	});
	//$locationProvider.html5Mode(true);
});

app.controller('backCtrl', function ($mdSidenav, $location, $http) {
	if (!localStorage.getItem("token")) {
		window.location.href = "/login";
		return;
	}
	$http.defaults.headers.common.Authorization = localStorage.getItem("token");

	this.menu = function () {
		$mdSidenav("menu").toggle();
	};
	this.leftMenu = cmsConfig;

	this.selectPage = function (section, page) {
		$location.path("/" + section.path + "/" + page.path);
	};
});