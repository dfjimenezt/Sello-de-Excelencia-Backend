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

var app = angular.module('dmt-back', ['ngRoute', 'ngMaterial', 'md.data.table']);
app.config(function ($mdThemingProvider, $routeProvider, $locationProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('grey');

	let config = cmsConfig;
	config.forEach((section) => {
		section.pages.forEach((page) => {
			let route = {
				controller: page.controller || "listItemController",
				controllerAs: page.controllerAs || "ctrl",
				templateUrl: page.templateUrl || "views/default/list.html",
				resolve: {
					page: function(){return page;}
				}
			};
			let path = "/" + section.path + "/" + page.path;
			$routeProvider.when(path, route);
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