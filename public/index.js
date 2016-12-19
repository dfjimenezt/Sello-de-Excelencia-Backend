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

var app = angular.module('dmt-back', ['ngMaterial','md.data.table']);
app.config(function ($mdThemingProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('grey');
});

app.controller('backCtrl', function ($scope,$mdSidenav,$http) {
	var leftMenu=[
		{
			section:"Configuración",
			pages:[{
				name:"Ciudades",
				table:"city",
				defaultSort:"id",
				endpoint:"/api/place/city",//get service
				fields:[
					{
						name:"id",
						type:"int",
						editable:"false"
					},
					{
						name:"name",
						type:"string",
						editable:"true"
					},
					{
						name:"code",
						type:"string",
						editable:"true"
					},
					{
						name:"id_country",
						type:"link",
						editable:"true",
						table:"country",
						foreign_key:"id"
					}
				]
			},
			{
				section:"Foro",
				name:"Regiones",
				table:"region",
				endpoint:"/api/place/region",//get service
				fields:[
					{
						name:"id",
						type:"int",
						editable:"false"
					},
					{
						name:"name",
						type:"string",
						editable:"true"
					},
					{
						name:"id_capital",
						type:"link",
						editable:"true",
						table:"city",
						foreign_key:"id"
					}
				]
			}]
		},
		{
			section:"Foro",
			pages:[{
				name:"Temas",
				table:"topic",
				fields:[
					{
						name:"id",
						type:"int",
						editable:"false"
					},
					{
						name:"name",
						type:"string",
						editable:"true"
					},
					{
						name:"id_parent",
						type:"link",
						editable:"true",
						table:"topic",
						foreign_key:"id"
					}
				]
			}]
		}
	];
	$scope.menu = function(){
		$mdSidenav("menu").toggle();
	};

	$scope.leftMenu = leftMenu;
	/**
	 * Manipulate items
	 */
	$scope.results = [];
	$scope.query = {
		order: $scope.currentPage ? $scope.currentPage.defaultSort : "name",
		limit: 5,
		page: 1
	};
	$scope.getSuccess = function(results){
		$scope.items = results;
	};

	$scope.getData = function(){
		$scope.promise = $http.get($scope.currentPage.endpoint);
		$scope.promise.then($scope.getSuccess);
	};
	$scope.currentItem = [];
	$scope.selectPage = function(p){
		$scope.currentPage = p;
		$scope.currentItem = [];
		$scope.getData();
	};
	$scope.selectItem = function(i){
		$scope.currentItem = i;
	};

	
});