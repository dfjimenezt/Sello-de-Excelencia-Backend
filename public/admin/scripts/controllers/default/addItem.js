angular.module('dmt-back').controller('addItemController', function ($mdDialog, entity, lang, relation, parent, $http) {
	var ctrl = this;
	ctrl.data = {};
	ctrl.options = {};
	ctrl.currentEntity = dmt.entities[entity];
	ctrl.relation = relation;
	ctrl.parent = parent;
	ctrl.language = lang;
	if (ctrl.relation) {
		if (ctrl.relation.rightKey) {
			ctrl.data[ctrl.relation.rightKey] = ctrl.parent.data[ctrl.parent.entity.defaultSort]
		}
	}
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
		window.location.href = "/admin/login";
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
			if(ctrl.currentEntity.translate){
				ctrl.data.language = ctrl.language
			}
			/*var fd = new FormData();
			for(let i in ctrl.data){
				fd.append(i,ctrl.data[i]);
			}*/

			$http.post(base + entity, ctrl.data).then(success).catch(error);
		}
	};
});