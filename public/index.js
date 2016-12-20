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

app.controller('backCtrl', function ($scope,$mdSidenav,$mdDialog,$http) {
	var leftMenu=[
		{
			section:"Configuración",
			pages:[{
				name:"Usuarios",
				table:"user",
				defaultSort:"id",
				endpoint:"/api/configuration/",//get service
				fields:[
					{
						name:"id",
						type:"int",
						disabled:"true"
					},
					{
						name:"name",
						type:"string",
						disabled:"false"
					}
				]
			},{
				name:"Roles",
				table:"role",
				defaultSort:"id",
				endpoint:"/api/configuration/",//get service
				fields:[
					{
						name:"id",
						type:"int",
						disabled:"true"
					},
					{
						name:"name",
						type:"string",
						disabled:"false"
					}
				]
			},
			{
				name:"Permisos",
				table:"permission",
				defaultSort:"id",
				endpoint:"/api/configuration/",//get service
				fields:[
					{
						name:"id",
						type:"int",
						disabled:"true"
					},
					{
						name:"name",
						type:"string",
						disabled:"false"
					}
				]
			},
			{
				name:"Asignación de Permisos a Roles",
				table:"permission_role",
				defaultSort:"id",
				endpoint:"/api/configuration/",//get service
				fields:[
					{
						name:"id_role",
						type:"link",
						disabled:"false",
						table:"role",
						foreign_key:"id",
						foreign_name:"name"
					},
					{
						name:"id_permission",
						type:"link",
						disabled:"false",
						table:"permission",
						foreign_key:"id",
						foreign_name:"name"
					}
				]
			},
			]
		},
		{
			section:"Lugares",
			pages:[
				{
					name:"Instituciones",
					table:"institution",
					defaultSort:"id",
					endpoint:"/api/place/",//get service
					fields:[
						{
							name:"id",
							type:"int",
							disabled:"true"
						},
						{
							name:"name",
							type:"string",
							disabled:"false"
						},
						{
							name:"id_city",
							type:"link",
							disabled:"false",
							table:"city",
							foreign_key:"id",
							foreign_name:"name"
						},
						{
							name:"id_user",
							type:"link",
							disabled:"false",
							endpoint:"/api/configuration/",
							table:"user",
							foreign_key:"id",
							foreign_name:"name"
						}
					]
				},
				{
					name:"Ciudades",
					table:"city",
					defaultSort:"id",
					endpoint:"/api/place/",//get service
					fields:[
						{
							name:"id",
							type:"int",
							disabled:"true"
						},
						{
							name:"name",
							type:"string",
							disabled:"false"
						},
						{
							name:"code",
							type:"string",
							disabled:"false"
						},
						{
							name:"id_region",
							type:"link",
							disabled:"false",
							table:"region",
							foreign_key:"id",
							foreign_name:"name"
						}
					]
				},
				{
					section:"Foro",
					name:"Regiones",
					table:"region",
					endpoint:"/api/place/",//get service
					fields:[
						{
							name:"id",
							type:"int",
							disabled:"true"
						},
						{
							name:"name",
							type:"string",
							disabled:"false"
						},
						{
							name:"id_capital",
							type:"link",
							disabled:"false",
							table:"city",
							foreign_key:"id",
							foreign_name:"name"
						}
					]
				}
			]
		},
		{
			section:"Foro",
			pages:[{
				name:"Temas",
				table:"topic",
				endpoint:"/api/forum/",
				fields:[
					{
						name:"id",
						type:"int",
						disabled:"true"
					},
					{
						name:"name",
						type:"string",
						disabled:"false"
					},
					{
						name:"id_parent",
						type:"link",
						disabled:"false",
						table:"topic",
						foreign_key:"id",
						foreign_name:"name"
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
	$scope.create = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'addItemController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      templateUrl: 'add-dialog.html',
			locals: { page: $scope.currentPage },
    }).then($scope.getDesserts);
  };
  
  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { page: $scope.currentPage,
				items: $scope.currentItem },
      templateUrl: 'delete-dialog.html',
    }).then($scope.getDesserts);
  };
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
		/**
		 * Webservices composed by endpoint + table
		 */
		$scope.promise = $http.get($scope.currentPage.endpoint+$scope.currentPage.table);
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

angular.module('dmt-back').controller('addItemController', function ($mdDialog, page, $http) {
  
	var ctrl = this;
	ctrl.data = {};
	ctrl.options = {};
	ctrl.currentPage = page;
	function addOptions(results){
		ctrl.options[f.name]=results.data; 
	}
	for(var i in this.currentPage.fields){
		var f = this.currentPage.fields[i];
		if(f.type === 'link'){
			$http.get(page.endpoint+f.table).then(addOptions);
		}
	}

	

  this.cancel = $mdDialog.cancel;
  
	function error(err){
		console.log(err);
	}
  function success() {
    $mdDialog.hide();
  }
  this.addItem = function () {
    ctrl.form.$setSubmitted();
    if(ctrl.form.$valid) {
			var base = f.endpoint;
			if(!base){
				base = ctrl.currentPage.endpoint;
			} 
			$http({
				method:"POST",
				url:base+ctrl.currentPage.table,
				data:ctrl.data,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				transformRequest: function(obj) {
						var str = [];
						for(var p in obj)
						str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
						return str.join("&");
				}
			}).then(success).catch(error);
    }
		
  };
});

angular.module('dmt-back').controller('deleteController', function ($mdDialog,$scope, items, page, $q, $http) {
  
  this.cancel = $mdDialog.cancel;
  
  function removeItems(dessert, index) {
    var promise = $http.delete();
    promise.then(function () {
      items.splice(index, 1);
    });
    return promise;
  }
  
  function onComplete() {
    $mdDialog.hide();
  }
  
  function deleteItems() {
    $q.all(items.forEach(removeItems)).then(onComplete);
  }
});