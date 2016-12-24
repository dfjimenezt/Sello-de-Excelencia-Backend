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

app.controller('backCtrl', function ($scope,$mdSidenav,$mdDialog,$mdEditDialog,$http) {
	if(!localStorage.getItem("token")){
		window.location.href="/login";
		return;
	}
	$http.defaults.headers.common.Authorization = localStorage.getItem("token");
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
					},
					{
						name:"lastname",
						type:"string",
						disabled:"false"
					},
					{
						name:"email",
						type:"email",
						disabled:"false"
					},
					{
						name:"phone",
						type:"string",
						disabled:"false"
					},
					{
						name:"extension",
						type:"string",
						disabled:"false"
					},
					{
						name:"mobile",
						type:"string",
						disabled:"false"
					},
					{
						name:"active",
						type:"boolean",
						disabled:"false"
					},
					{
						name:"verified",
						type:"boolean",
						disabled:"true"
					},
					{
						name:"tmp_pwd",
						type:"boolean",
						disabled:"false"
					},
					{
						name:"terms",
						type:"boolean",
						disabled:"false"
					},
					{
						name:"timestamp",
						type:"string",
						disabled:"true"
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
				defaultSort:"id_role",
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
					defaultSort:"name",
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
							name:"address",
							type:"string",
							disabled:"false"
						},
						{
							name:"email",
							type:"string",
							disabled:"false"
						},
						{
							name:"second_email",
							type:"string",
							disabled:"false"
						},
						{
							name:"phone",
							type:"string",
							disabled:"false"
						},
						{
							name:"head_sector",
							type:"boolean",
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
							name:"id_user_creator",
							type:"link",
							disabled:"false",
							endpoint:"/api/configuration/",
							table:"user",
							foreign_key:"id",
							foreign_name:"name"
						},
						{
							name:"timestamp",
							type:"string",
							disabled:"true"
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
			section:"Sello de Excelencia",
			pages:[
				{
					name:"Servicios",
					table:"service",
					defaultSort:"name",
					endpoint:"/api/service/",
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
							name:"address",
							type:"string",
							disabled:"false"
						},
						{
							name:"email",
							type:"email",
							disabled:"false"
						},
						{
							name:"second_email",
							type:"email",
							disabled:"false"
						},
						{
							name:"second_email",
							type:"email",
							disabled:"false"
						},
						{
							name:"id_institution",
							type:"link",
							disabled:"false",
							table:"institution",
							endpoint:"/api/place/",
							foreign_key:"id",
							foreign_name:"name"
						},
						{
							name:"id_user_creator",
							type:"link",
							disabled:"false",
							table:"user",
							endpoint:"/api/configuration/",
							foreign_key:"id",
							foreign_name:"name"
						},
						{
							name:"hash",
							type:"string",
							disabled:"false"
						},
						{
							name:"rate",
							type:"int",
							disabled:"true"
						},
						{
							name:"id_category",
							type:"link",
							disabled:"false",
							table:"category",
							endpoint:"/api/service/",
							foreign_key:"id",
							foreign_name:"name"
						}
					]
				},
				{
					name:"Categorías",
					table:"category",
					endpoint:"/api/service/",
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
				}
			]
		},
		{
			section:"Foro",
			pages:[{
				name:"Temas",
				table:"topic",
				defaultSort:"name",
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
    }).then($scope.getData);
  };
  
	$scope.editField = function (event, item, field) {
		if(field.type === "link"){return;}
		if(field.disabled === "true"){return;}
		event.stopPropagation();
		
		var promise = $mdEditDialog.large({
			modelValue: item[field.name],
			placeholder: field.name,
			cancel: "Cancelar",
			ok: "Guardar",
			title:"Editar "+field.name,
			save: function (input) {
				item[field.name] = input.$modelValue;
				$http.put($scope.currentPage.endpoint+ $scope.currentPage.table, item);
			},
			type:	field.type === "int"? "number": 
						field.type === "boolean"? "checkbox" :"text",
			targetEvent: event
		});
		promise.then(function (ctrl) {
			var input = ctrl.getInput();
			input.$viewChangeListeners.push(function () {
				input.$setValidity('test', input.$modelValue !== 'test');
			});
		});
	};

  $scope.delete = function (event) {
    $mdDialog.show({
      clickOutsideToClose: true,
      controller: 'deleteController',
      controllerAs: 'ctrl',
      focusOnOpen: false,
      targetEvent: event,
      locals: { page: $scope.currentPage,
				items: $scope.selected },
      templateUrl: 'delete-dialog.html',
    }).then($scope.getData);
  };
	$scope.results = [];
	$scope.filter = {
    options: {
      debounce: 500
    }
  };
	var bookmark;
	$scope.$watch('query.filter', function (newValue, oldValue) {
    if(!oldValue) {
      bookmark = $scope.query.page;
    }
    if(newValue !== oldValue) {
      $scope.query.page = 1;
    }
    if(!newValue) {
      $scope.query.page = bookmark;
    }
    $scope.getData();
  });
	$scope.removeFilter = function(){
		$scope.filter.show = false;
    $scope.query.filter = '';
    
    if($scope.filter.form.$dirty) {
      $scope.filter.form.$setPristine();
    }
	};

	$scope.query = {
		filter:'',
		order: $scope.currentPage ? $scope.currentPage.defaultSort : "name",
		limit: 5,
		page: 1
	};
	
	$scope.getSuccess = function(results){
		$scope.items = results.data[0];
		$scope.total_results = results.data[1][0].total_results;
	};

	$scope.getData = function(){
		/**
		 * Webservices composed by endpoint + table
		 */
		if(!$scope.currentPage){
			return;
		}
		var str = [];
		for(var p in $scope.query)
		str.push(encodeURIComponent(p) + "=" + encodeURIComponent($scope.query[p]));
		var filter = str.join("&");
				
		$scope.promise = $http.get($scope.currentPage.endpoint+$scope.currentPage.table+"?"+filter);
		$scope.promise.then($scope.getSuccess).catch(function(response){
				window.location.href="/login";
		});
	};
	$scope.selected = [];
	function addOptions(item,index){
		var base = item.endpoint;
		if(!base){
			base = $scope.currentPage.endpoint;
		} 
		$http.get(base+item.table).then(function(results){
			$scope.options[item.name]=results.data;
		});
	}
	$scope.selectPage = function(p){
		$scope.currentPage = p;
		$scope.query = {
			filter:'',
			order: $scope.currentPage.defaultSort || "name",
			limit: 5,
			page: 1
		};
		$scope.selected = [];
		$scope.getData();
		$scope.options = {};
		
		var opts = [];
		for(var i in $scope.currentPage.fields){
			var f = $scope.currentPage.fields[i];
			if(f.type === 'link'){
				opts.push(f);
			}
		}
		opts.forEach(addOptions);
	};
});

angular.module('dmt-back').controller('addItemController', function ($mdDialog, page, $http) {
  var ctrl = this;
	ctrl.data = {};
	ctrl.options = {};
	ctrl.currentPage = page;
	function addOptions(item,index){
		var base = item.endpoint;
		if(!base){
			base = ctrl.currentPage.endpoint;
		} 
		$http.get(base+item.table).then(function(results){
			ctrl.options[item.name]=results.data;
		});
	}
	var opts = [];
	for(var i in this.currentPage.fields){
		var f = this.currentPage.fields[i];
		if(f.type === 'link'){
			opts.push(f);
		}
	}
	opts.forEach(addOptions);

  this.cancel = $mdDialog.cancel;
  
	function error(err){
		window.location.href = "/login";
	}
  function success() {
    $mdDialog.hide();
  }
  this.addItem = function () {
    ctrl.form.$setSubmitted();
    if(ctrl.form.$valid) {
			var base = ctrl.currentPage.endpoint;
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
  
  function removeItems(item, index) {
    var promise = $http.delete();
    promise.then(function () {
      items.splice(index, 1);
    });
    return promise;
  }
  
  function onComplete() {
    $mdDialog.hide();
  }
	function error(err){
		window.location.href = "/login";
	}
  
  function deleteItems() {
    $q.all(items.forEach(removeItems)).then(onComplete).catch(error);
  }
});