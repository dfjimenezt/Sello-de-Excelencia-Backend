angular.module('dmt-back').controller('detailItemExtendedController', function ($mdDialog, $mdEditDialog, $routeParams, page, $location, $http) {
	var ctrl = this;
	ctrl.data = {};
	ctrl.breadcrum = buildBreadcrum($location.path(), page);
	ctrl.language = 1;
	ctrl.entities = {};
	ctrl.languages = [];
	ctrl.selected = [];
	ctrl.options = {};
	ctrl.page = page;
	ctrl.tab = null;
	ctrl.currentEntity = dmt.entities[page.parent.entity];
	ctrl.currentEntity.relations.forEach((relation) => {
		ctrl.entities[relation.entity] = {
			filter: {
				options: {
					debounce: 500
				}
			},
			bookmark: null,
			selected: [],
			query: {
				filter: '',
				limit: 10,
				page: 1,
			},
			getData: function () { ctrl.getEntityData(relation) },
			search: function () { ctrl.search(relation) }
		}
		if (relation.intermediate) {
			ctrl.entities[relation.intermediate.entity] = {
				filter: {
					options: {
						debounce: 500
					}
				},
				bookmark: null,
				selected: [],
				query: {
					filter: '',
					limit: 10,
					page: 1,
				},
			}
		}
	})

	$http.get("api/configuracion/lang").then((response) => {
		ctrl.languages = response.data.data;
	}).catch((e)=>{
		console.log("no languages available")
	})
	ctrl.select = function(selection){
		var relation = ctrl.tab
		if(!relation){
			return
		}
		if(relation.type === 'n-n'){
			var entity = dmt.entities[relation.intermediate.entity]
			var url = entity.endpoint+relation.intermediate.entity
			var data = {}
			data[relation.intermediate.rightKey] = selection
			data[relation.intermediate.leftKey] = $routeParams.id
			$http.post(url,data)
		}
	}
	ctrl.unselect = function(selection){
		var relation = ctrl.tab
		if(!relation){
			return
		}
		if(relation.type === 'n-n'){
			var entity = dmt.entities[relation.intermediate.entity]
			var url = entity.endpoint+relation.intermediate.entity+'?'+relation.intermediate.rightKey+'='+selection+'&'+relation.intermediate.leftKey+'='+$routeParams.id
			$http.delete(url)	
		}
	}
	ctrl.selectTab = function(tab){
		ctrl.tab = tab
	}

	ctrl.create = function (event, relation) {
		let entity = dmt.entities[relation.entity];
		$mdDialog.show({
			clickOutsideToClose: true,
			controller: entity.add ? entity.add.controller || 'addItemController' : 'addItemController',
			controllerAs: 'ctrl',
			focusOnOpen: false,
			targetEvent: event,
			templateUrl: entity.add ? entity.add.template || 'views/default/add-dialog.html' : 'views/default/add-dialog.html',
			locals: {
				entity: relation.entity || relation.table,
				lang: ctrl.language,
				relation: relation,
				parent: {
					data: ctrl.data,
					entity: ctrl.currentEntity
				}
			},
		}).then(ctrl.getData);
	};
	ctrl.updateItem = function (item, field, relation) {
		let entity = dmt.entities[relation.entity];
		if (item.timestamp) {
			delete item.timestamp;
		}
		if (entity.translate) {
			item.language = ctrl.language
		}
		$http.put(entity.endpoint + relation.entity, item).then(ctrl.getData);
	};
	ctrl.delete = function (event, relation) {
		let entity = dmt.entities[relation.entity];
		$mdDialog.show({
			clickOutsideToClose: true,
			controller: entity.delete ? entity.delete.controller || 'deleteItemController' : 'deleteItemController',
			controllerAs: 'ctrl',
			focusOnOpen: false,
			targetEvent: event,
			locals: {
				entity: entity,
				items: ctrl.entities[relation.entity].selected,
			},
			templateUrl: entity.delete ? entity.delete.templateUrl || 'views/default/delete-dialog.html' : 'views/default/delete-dialog.html',
		}).then(ctrl.getData);
	}
	ctrl.editField = function (event, item, field, relation) {
		event.stopPropagation();
		if (field.disabled) { return; }

		var promise = $mdEditDialog.large({
			modelValue: item[field.name],
			placeholder: field.name,
			cancel: "Cancelar",
			ok: "Guardar",
			title: "Editar " + field.name,
			save: function (input) {
				item[field.name] = input.$modelValue;
				ctrl.updateItem(item, field, relation);
			},
			type: field.type === "int" ? "number" :
				field.type === "boolean" ? "checkbox" : "text",
			targetEvent: event
		});
	};
	ctrl.search = function (relation) {
		if (ctrl.entities[relation.entity].bookmark == null) {
			ctrl.entities[relation.entity].bookmark = ctrl.entities[relation.entity].query.page;
		}
		ctrl.entities[relation.entity].query.page = 1;
		ctrl.entities[relation.entity].getData();
	}
	ctrl.removeFilter = function (relation) {
		ctrl.entities[relation.entity].filter.show = false;
		ctrl.entities[relation.entity].query.filter = '';
		ctrl.entities[relation.entity].query.page = ctrl.entities[relation.entity].bookmark;
		ctrl.entities[relation.entity].bookmark = null;
		if (ctrl.entities[relation.entity].filter.form.$dirty) {
			ctrl.entities[relation.entity].filter.form.$setPristine();
		}
		ctrl.entities[relation.entity].getData();
	}
	ctrl.getEntityData = function (relation) {
		let str = [];
		let entity = dmt.entities[relation.entity];
		let table = null
		if (!entity) {
			entity = dmt.tables[relation.entity];
			table = entity
		} else {
			table = dmt.tables[entity.table]
		}
		if (ctrl.entities[relation.entity].query.filter.length) {
			str.push("filter=" + ctrl.entities[relation.entity].query.filter);
			table.fields.forEach((f) => {
				if (f.type === "string" || f.type === "text") {
					var name = f.name;
					if (f.prefix) {
						name = f.prefix + name
					}
					str.push("field=" + name);
				}
			})
		}
		if (relation.rightKey) { //1-n
			str.push("filter_field=" + relation.rightKey);
			str.push("filter_value=" + $routeParams.id);
		} else if (relation.intermediate && ctrl.entities[relation.entity].selected.length === 0) {
			let intermediate = []
			intermediate.push("filter_field=" + relation.intermediate.leftKey);
			intermediate.push("filter_value=" + $routeParams.id);
			intermediate.push("lang=" + ctrl.language)
			$http.get(entity.endpoint + relation.intermediate.entity + "?" + intermediate.join("&")).then((response) => {
				response.data.data.forEach(function (item) {
					if (ctrl.entities[relation.entity].selected.indexOf(item[relation.intermediate.rightKey]) === -1) {
						ctrl.entities[relation.entity].selected.push(item[relation.intermediate.rightKey])
					}
				})
			})
		}
		str.push("page=" + ctrl.entities[relation.entity].query.page)
		str.push("limit=" + ctrl.entities[relation.entity].query.limit)
		str.push("lang=" + ctrl.language)

		$http.get(entity.endpoint + relation.entity + "?" + str.join("&")).then((response) => {
			ctrl.entities[relation.entity].table = table;
			ctrl.entities[relation.entity].data = response.data.data;
			ctrl.entities[relation.entity].total_results = response.data.total_results
		})
	}
	ctrl.getSuccess = function (results) {
		ctrl.data = results.data.data[0];
		for (let p in ctrl.currentEntity.fields) { //mysql boolean 1 / 0 to true / false            
			if (ctrl.currentEntity.fields[p].type === "boolean") {
				ctrl.data[ctrl.currentEntity.fields[p].name] = ctrl.data[ctrl.currentEntity.fields[p].name] === 1;
			}
		}
		if (ctrl.currentEntity.relations) {
			ctrl.currentEntity.relations.forEach(ctrl.getEntityData)
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
				str.push(ctrl.currentEntity.fields[p].name + "=" + $routeParams.id);
			}
		}
		if (str.length == 0) {
			return;
		}
		str.push("lang=" + ctrl.language);
		let filter = str.join("&");

		ctrl.promise = $http.get(ctrl.currentEntity.endpoint + page.parent.entity + "?" + filter);
		ctrl.promise.then(ctrl.getSuccess).catch(function (response) {
			window.location.href = "/admin/login";
		});
	};
	if($routeParams.id){
		ctrl.getData();
	}

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
			item.options = results.data.data;
		});
	}

	function addOptions(item, index) {
		var base = item.endpoint;
		if (!base) {
			base = ctrl.currentEntity.endpoint;
		}
		$http.get(base + item.table).then(function (results) {
			ctrl.options[item.name] = results.data.data;
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

	this.saveItem = function () {
		ctrl.form.$setSubmitted();
		if (ctrl.form.$valid) {
			var base = ctrl.currentEntity.endpoint;
			let data = {}
			ctrl.currentEntity.fields.forEach(function (field) {
				if (typeof ctrl.data[field.name] === 'object' || typeof ctrl.data[field.name] === 'array')
					return;
				data[field.name] = ctrl.data[field.name]
			})
			if (ctrl.currentEntity.translate) {
				data.language = ctrl.language;
			}
			if (data.timestamp) {
				delete data.timestamp;
			}
			if (data[ctrl.currentEntity.defaultSort]) {
				$http.put(base + page.parent.entity, data).then(ctrl.getData).catch(error);
			} else {
				$http.post(base + page.parent.entity, data).then(function(){
					//ctrl.getData
					var p = page.parent
					var url = p.path;
					while(p.parent){
						p = p.parent;
						url = p.path + '/' + url;
					}
					console.log(url);
					$location.path(url);

				}).catch(error);
			}

		}
	};
});
