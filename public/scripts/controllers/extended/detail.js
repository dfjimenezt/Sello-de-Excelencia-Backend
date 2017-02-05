angular.module('dmt-back').controller('detailItemExtendedController', function ($mdDialog, $routeParams, page, $location, $http) {
    var ctrl = this;
    ctrl.data = {};
    ctrl.breadcrum = buildBreadcrum($location.path(), page);

    ctrl.options = {};
    ctrl.page = page;
    ctrl.currentEntity = dmt.entities[page.parent.entity];

    ctrl.getSuccess = function (results) {
        ctrl.data = results.data[0];
        for (let p in ctrl.currentEntity.fields) { //mysql boolean 1 / 0 to true / false            
            if(ctrl.currentEntity.fields[p].type === "boolean"){
                ctrl.data[ctrl.currentEntity.fields[p].name] = ctrl.data[ctrl.currentEntity.fields[p].name]  === 1;
            }
        }
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
                str.push(ctrl.currentEntity.fields[p].name + "=" + $routeParams[ctrl.currentEntity.fields[p].name]);
            }
        }
        if(str.length == 0){
            return;
        }
        let filter = str.join("&");

        ctrl.promise = $http.get(ctrl.currentEntity.endpoint + page.parent.entity + "?" + filter);
        ctrl.promise.then(ctrl.getSuccess).catch(function (response) {
            window.location.href = "/login";
        });
    };
    ctrl.getData();

    /**
	 * Initialize data
	 */

	function updateFilter(filter) {
		if (filter.filter) { //affects another filter
			ctrl.currentEntity.filters.forEach((item) => {
				if (item.name === filter.filter) { //find the associated filter
					if (filter.selected === "null") { //cleaning the filter
						item.options = item.fulloptions || item.options;
						delete item.fulloptions;
					} else {
						if (!item.fulloptions) {
							item.fulloptions = item.options; // store the options
						}
						item.options = item.fulloptions.filter((option) => { //filter the options
							let match = true;
							filter.fields.forEach((field) => { //iterate trough the values
								if (option[field] != filter.selected) { //AND relation
									match = false;
								}
							})
							return match;
						});
					}
				}
			});
		} else { //direct fields
			if (filter.selected === "null") { //cleaning the filter
				filter.fields.forEach((field) => { //iterate trough the values
					$scope.query.filters[field.name] = [];
				})
				$scope.getData();
			} else {
				filter.fields.forEach((field) => { //iterate trough the values
					ctrl.options[field.name].forEach((option) => {
						$scope.query.filters[field.name] = [];
						if (option[field.foreign_key] == filter.selected) { //AND relation
							$scope.query.filters[field.name].push(option[filter.foreign_key]);
						}
					})
				})
				$scope.getData();
			}
		}
	}
	function addFilters(item, index) {
		var base = item.endpoint;
		if (!base) {
			base = ctrl.currentEntity.endpoint;
		}
		$http.get(base + item.table).then(function (results) {
			item.options = results.data;
		});
	}

	function addOptions(item, index) {
		var base = item.endpoint;
		if (!base) {
			base = ctrl.currentEntity.endpoint;
		}
		$http.get(base + item.table).then(function (results) {
			ctrl.options[item.name] = results.data;
		});
	}
	var opts = [];
	for (var i in this.currentEntity.fields) {
		var f = this.currentEntity.fields[i];
		if (f.type === 'link') {
			opts.push(f);
		}
	}
	opts.forEach(addOptions);
	if (ctrl.currentEntity.filters) {
		ctrl.currentEntity.filters.forEach(addFilters);
	}

	this.cancel = $mdDialog.cancel;

	function error(err) {
		window.location.href = "/login";
	}
	function success() {
		$mdDialog.hide();
	}
	this.addItem = function () {
		ctrl.form.$setSubmitted();
		if (ctrl.form.$valid) {
			var base = ctrl.currentEntity.endpoint;
			if (ctrl.data.timestamp) {
				delete ctrl.data.timestamp;
			}
			/*var fd = new FormData();
			for(let i in ctrl.data){
				fd.append(i,ctrl.data[i]);
			}*/

			$http.post(base + ctrl.currentEntity.table, ctrl.data).then(success).catch(error);
		}
	};
});
