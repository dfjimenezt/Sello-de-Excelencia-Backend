angular.module('dmt-back').controller('detailItemExtendedController', function ($mdDialog, $routeParams, page, $location, $http) {
	var ctrl = this;
	ctrl.data = {};
	ctrl.breadcrum = buildBreadcrum($location.path(),page);
	
	ctrl.options = {};
	ctrl.currentEntity = page.parent.entity;

	ctrl.getSuccess = function(results){
		ctrl.data = results.data[0];
	}

	ctrl.getData = function () {
		/**
		 * Webservices composed by endpoint + table
		 */
        if (!ctrl.currentEntity) {
            return;
        }
        let str = [];
        for (let p in ctrl.currentEntity.fields) {
            if (ctrl.currentEntity.fields[p].key) {
                str.push(ctrl.currentEntity.fields[p].name +"=" + $routeParams[ctrl.currentEntity.fields[p].name]);
            }
        }
        let filter = str.join("&");

        ctrl.promise = $http.get(ctrl.currentEntity.endpoint + ctrl.currentEntity.table + "?" + filter);
        ctrl.promise.then(ctrl.getSuccess).catch(function (response) {
            window.location.href = "/login";
        });
    };
		ctrl.getData();
});
