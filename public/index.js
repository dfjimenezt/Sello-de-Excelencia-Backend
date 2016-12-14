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

var app = angular.module('anpApp', ['ngMaterial', 'angular-loading-bar', 'bootstrapLightbox']);

app.config(function ($mdThemingProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('green')
		.accentPalette('brown');
});

app.controller('apisController', function ($scope, $http, Lightbox, $mdSidenav) {
	$scope.currentNavItem = 'page1';
	$scope.assets = [];
	$scope.mockups = [];
	$scope.tests = [];
	$scope.services = [];

	function request(paramUrl, parameters) {
		return $http({
			url: paramUrl,
			method: "GET",
			params: parameters,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			}
		});
	}

	request("info/assets.json", {}).then(function (answer) { $scope.assets = answer.data; });
	request("info/mockups.json", {}).then(function (answer) { $scope.mockups = answer.data; });
	request("info/tests.json", {}).then(function (answer) { $scope.tests = answer.data; });
	request("info/services.json", {}).then(function (answer) { $scope.services = answer.data; });

	$scope.getR = function (paramUrl, parameters) {
		request(paramUrl, parameters).then(function (answer) {
			var texto = "URL: <b>" + paramUrl + "</b><br>";
			texto += "Parametros: " + JSON.stringify(parameters) + "<br><br>";
			texto += "<textarea rows='20' cols='48'>" + JSON.stringify(answer.data, null, '\t') + "</textarea>";
			swal({
				title: "Ejemplo de la respuesta:",
				text: texto,
				type: "success",
				html: true
			});
		}).catch(function (err) { console.log(err); });
	};//</gerR>

	$scope.openLightboxModal = function (index, array) {
		Lightbox.openModal(array, index);
	};
	$scope.toggleLeft = function () {
		$mdSidenav('left').toggle();
	};
	$scope.toggleRight = function () {
		$mdSidenav('right').toggle();
	};
});