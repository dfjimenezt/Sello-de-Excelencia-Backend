angular.module('dmt-back').filter('linkvalue',function(){
    return function(items,field,item){
        for(i in items){
            let it = items[i];
            if(item[field.name] === it[field.foreign_key]){
                return it[field.foreign_name];
            }
        }
    }
});
angular.module('dmt-back').controller('listItemController', function ($scope,$mdDialog,$mdEditDialog, page, $http) {
    var ctrl = this;
    ctrl.page = page;
    ctrl.entity = page.entity;
    /**
     * Manipulate items
     */
    $scope.create = function (event) {
        $mdDialog.show({
            clickOutsideToClose: true,
            controller: page.entity.add ? page.entity.add.controller || 'addItemController' : 'addItemController',
            controllerAs: 'ctrl',
            focusOnOpen: false,
            targetEvent: event,
            templateUrl: page.entity.add ? page.entity.add.template || 'views/default/add-dialog.html' : 'views/default/add-dialog.html',
            locals: { entity: entity },
        }).then($scope.getData);
    };

    $scope.updateItem = function (item, field) {
        if (item.timestamp) {
            delete item.timestamp;
        }
        $http.put(page.entity.endpoint + page.entity.table, item).then($scope.getData);

    };
    $scope.editField = function (event, item, field) {
        event.stopPropagation();
        if(page.entity.readOnly){return;}
        if (field.type === "link") { return; }
        if (field.disabled === "true") { return; }

        var promise = $mdEditDialog.large({
            modelValue: item[field.name],
            placeholder: field.name,
            cancel: "Cancelar",
            ok: "Guardar",
            title: "Editar " + field.name,
            save: function (input) {
                item[field.name] = input.$modelValue;
                $scope.updateItem(item, field);
            },
            type: field.type === "int" ? "number" :
                field.type === "boolean" ? "checkbox" : "text",
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
            controller: page.entity.delete ? page.entity.delete.controller || 'deleteItemController' : 'deleteItemController',
            controllerAs: 'ctrl',
            focusOnOpen: false,
            targetEvent: event,
            locals: {
                entity: ctrl.entity,
                items: $scope.selected
            },
            templateUrl: page.entity.delete? page.entity.delete.templateUrl || 'views/default/delete-dialog.html' : 'views/default/delete-dialog.html',
        }).then($scope.getData);
    };

    /**
     * Selection variables
     */
    $scope.results = [];
    $scope.selected = [];
    $scope.filter = {
        options: {
            debounce: 500
        }
    };
    var bookmark;
    $scope.$watch('query.filter', function (newValue, oldValue) {
        if (!oldValue) {
            bookmark = $scope.query.page;
        }
        if (newValue !== oldValue) {
            $scope.query.page = 1;
        }
        if (!newValue) {
            $scope.query.page = bookmark;
        }
        $scope.getData();
    });
    $scope.removeFilter = function () {
        $scope.filter.show = false;
        $scope.query.filter = '';

        if ($scope.filter.form.$dirty) {
            $scope.filter.form.$setPristine();
        }
    };

    $scope.query = {
        filter: '',
        order: page ? page.entity.defaultSort : "name",
        limit: 20,
        page: 1,
        filters:{}
    };

    $scope.getSuccess = function (results) {
        $scope.items = results.data.data;
        $scope.total_results = results.data.total_results;
    };

    $scope.getData = function () {
		/**
		 * Webservices composed by endpoint + table
		 */
        if (!page.entity) {
            return;
        }
        let str = [];
        for (let p in $scope.query) {
            if(p !== "filters"){
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent($scope.query[p]));
            }
        }
        for (let p in page.entity.fields) {
            if (page.entity.fields[p].searchable) {
                str.push("field=" + page.entity.fields[p].name);
            }
        }
        for(let p in $scope.query.filters){
            if($scope.query.filters[p] !== "null"){
                str.push("filter_field="+p);
                str.push("filter_value="+$scope.query.filters[p]);
            }
        }
        let filter = str.join("&");

        $scope.promise = $http.get(page.entity.endpoint + page.entity.table + "?" + filter);
        $scope.promise.then($scope.getSuccess).catch(function (response) {
            //window.location.href = "/login";
        });
    };

    /**
     * Initialize data
     */

    function addOptions(item,index){
		var base = item.endpoint;
		if(!base){
			base = page.entity.endpoint;
		} 
		$http.get(base+item.table).then(function(results){
			ctrl.options[item.name]=results.data;
		});
	}
    function addFilters(item,index){
        var base = item.endpoint;
		if(!base){
			base = page.entity.endpoint;
		}
		$http.get(base+item.table).then(function(results){
			ctrl.filters[item.name]={
                fields: item.fields,
                filter_key: item.filter_key,
                filter_name: item.filter_name,
                data: results.data
            };
            $scope.$watch("dmt_filter_"+item.name,(nv,ov)=>{
                if(!nv){
                    return;
                }
                let filter = $scope.filters[item.name];
                //change query ask again for getData
                $scope.query.filter = nv;
                $scope.query.field
            });
		});
    }

	$scope.getData();
	ctrl.options = {};
    ctrl.filters = {};
    
    var opts = [];
    for(var i in page.entity.fields){
        var f = page.entity.fields[i];
        if(f.type === 'link'){
            opts.push(f);
        }
    }
    opts.forEach(addOptions);
    if(page.entity.filters){
        page.entity.filters.forEach(addFilters);
    }

});
