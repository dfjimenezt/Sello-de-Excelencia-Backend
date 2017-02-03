angular.module('dmt-back').controller('addItemExtendedController', function ($mdDialog, $routeParams, page, $location, $http) {
	var ctrl = this;
	ctrl.data = {};
	ctrl.breadcrum = buildBreadcrum($location.path(), page);
	ctrl.options = {};
	ctrl.currentEntity = page.parent.entity;
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
