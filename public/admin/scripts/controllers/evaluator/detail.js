angular.module('dmt-back').controller('detailItemEvaluatorController', function ($mdDialog, $mdEditDialog, $routeParams, page, $location, $http, $filter) {
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
	ctrl.today = new Date()

	ctrl.currentEntity = dmt.entities[page.entity || page.parent.entity];
	
	ctrl.currentEntity.relations.forEach((relation) => {
		if(relation.entity == 'points'){
			ctrl.points_relation = relation
		}
		ctrl.entities[relation.entity] = {
			filter: {
				options: {
					debounce: 500
				}
			},
			filters:{},
			bookmark: null,
			selected: [],
			options:{},
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
				options:{},
				query: {
					filter: '',
					limit: 10,
					page: 1,
				},
			}
		}

	})

	ctrl.select = function (selection) {
		var relation = ctrl.tab
		if (!relation) {
			return
		}
		if (relation.type === 'n-n') {
			var entity = dmt.entities[relation.intermediate.entity]
			var url = entity.endpoint
			var data = {}
			data[relation.intermediate.rightKey] = selection
			data[relation.intermediate.leftKey] = $routeParams.id
			$http.post(url, data)
		}
	}
	ctrl.unselect = function (selection) {
		var relation = ctrl.tab
		if (!relation) {
			return
		}
		if (relation.type === 'n-n') {
			var entity = dmt.entities[relation.intermediate.entity]
			var url = entity.endpoint + '?' + relation.intermediate.rightKey + '=' + selection + '&' + relation.intermediate.leftKey + '=' + $routeParams.id
			$http.delete(url)
		}
	}
	ctrl.selectTab = function (tab) {
		ctrl.tab = tab
	}
	ctrl.createPoints = function(event){
		$mdDialog.show({
			clickOutsideToClose: true,
			controller: 'addEvaluatorPointsController',
			controllerAs: 'ctrl',
			focusOnOpen: false,
			targetEvent: event,
			templateUrl: 'views/entity/add-points.html',
			locals: {
				entity: ctrl.points_relation.entity,
				lang: ctrl.language,
				relation: ctrl.points_relation,
				parent: {
					data: ctrl.data,
					entity: ctrl.currentEntity
				}
			},
		}).then(ctrl.getData);
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
		var fd = new FormData();
		for (var i in item) {
			fd.append(i, item[i]);
		}
		/*$http({
			method: 'PUT',
			url: entity.endpoint,
			data: item,
			transformRequest: angular.identity,
			headers: {'Content-Type': 'multipart/form-data'}
		})*/
		var request = new XMLHttpRequest();
		request.open("PUT", entity.endpoint);
		request.send(fd);
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
			title: "Editar " + $filter('translate')(field.name),
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
		if(relation.entity === 'institutions'){
			return
		}
		
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
		for (let key in ctrl.entities[relation.entity].query.filters) {
			ctrl.entities[relation.entity].query.filters[key].forEach((value) => {
						str.push("filter_field=" + key);
						str.push("filter_value=" + value);
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
			let ety_intermediate = dmt.entities[relation.intermediate.entity];
			if (!ety_intermediate) {
				ety_intermediate = dmt.tables[relation.intermediate.entity];
			}
			$http.get(ety_intermediate.endpoint + "?" + intermediate.join("&")).then((response) => {
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

		$http.get(entity.endpoint + "?" + str.join("&")).then((response) => {
			let _table = table;
			if(relation.entity === 'points'){
				_table.fields = [
					{
						"name": "id",
						"type": "int",
						"disabled": true,
						"key": true
					},
					{
						"name": "value",
						"type": "int",
						"disabled": false,
						"key": false
					},
					{
						"name": "result",
						"type": "int",
						"disabled": false,
						"key": false
					},
					{
						"name": "id_motives",
						"type": "link",
						"table": "motives",
						"disabled": true,
						"key": false,
						"foreign_key":"id",
						"foreign_name":"name"
					},
					{
						"name": "justification",
						"type": "string",
						"disabled": false,
						"key": false
					},
				]
			}
			ctrl.entities[relation.entity].table = _table;
			ctrl.entities[relation.entity].data = response.data.data;
			ctrl.entities[relation.entity].data.forEach((item)=>{
				for (let p in table.fields){
					if (table.fields[p].type === "boolean") {
						item[table.fields[p].name] = item[table.fields[p].name] === 1;
					}
					if (table.fields[p].type === "datetime" ||
					table.fields[p].type === "timestamp") {
						item[table.fields[p].name] = new Date(item[table.fields[p].name]);
					}
				}		
			})
			ctrl.entities[relation.entity].total_results = response.data.total_results
		})
	}
	ctrl.getSuccess = function (results) {
		ctrl.data = results.data.data[0];
		for (let p in ctrl.currentEntity.fields) { //mysql boolean 1 / 0 to true / false            
			if (ctrl.currentEntity.fields[p].type === "boolean") {
				ctrl.data[ctrl.currentEntity.fields[p].name] = ctrl.data[ctrl.currentEntity.fields[p].name] === 1;
			}
			if (ctrl.currentEntity.fields[p].type === "datetime" ||
			ctrl.currentEntity.fields[p].type === "timestamp") {
				ctrl.data[ctrl.currentEntity.fields[p].name] = new Date(ctrl.data[ctrl.currentEntity.fields[p].name]);
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

		ctrl.promise = $http.get(ctrl.currentEntity.endpoint + "?" + filter);
		ctrl.promise.then(ctrl.getSuccess).catch(function (response) {
			window.location.href = "/admin/login";
		});
	};
	if ($routeParams.id) {
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
		$http.get(base).then(function (results) {
			item.options = results.data.data;
		});
	}

	function addOptions(item, index) {
		var base = item.endpoint;
		if (!base) {
			let entity = dmt.entities[item.table];
			let table = null
			if (!entity) {
				entity = dmt.tables[item.table];
			} 
			base = entity.endpoint
		}
		if (!base) {
			base = ctrl.currentEntity.endpoint;
		}
		$http.get(base+'?limit=5000',{cache:true}).then(function (results) {
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

	function addEntityOptions(item, index) {
		var entity = dmt.entities[item.entity]
		var field = item.f
		var base = dmt.entities[field.table].endpoint;
		if (!base) {
			base = ctrl.currentEntity.endpoint;
		}
		$http.get(base+'?limit=5000',{cache:true}).then(function (results) {
				ctrl.entities[item.entity].options[field.name] = results.data.data
		});
	}
	let eopts = []
	for(var name in this.entities){
		for (var i in dmt.entities[name].fields) {
			var f = dmt.entities[name].fields[i];
			if (f.type === 'link') {
				eopts.push({f:f,entity:name});
			}
		}
	}
	eopts.forEach(addEntityOptions);

	if (ctrl.currentEntity.filters) {
		ctrl.currentEntity.filters.forEach(addFilters);
	}

	this.cancel = $mdDialog.cancel;

	function error(err) {
		window.location.href = "/admin/login";
	}

	this.sendMessage = function(){
		$mdDialog.show({
			clickOutsideToClose: true,
			controller: entity.delete ? entity.delete.controller || 'sendMessageController' : 'sendMessageController',
			controllerAs: 'ctrl',
			focusOnOpen: false,
			targetEvent: event,
			locals: {
				user: ctrl.data,
				entity: false
			},
			templateUrl: entity.delete ? entity.delete.templateUrl || 'views/user/message-dialog.html' : 'views/user/message-dialog.html',
		}).then(ctrl.getData);
	}
	this.saveItem = function () {
		ctrl.form.$setSubmitted();
		if (ctrl.form.$valid) {
			var base = ctrl.currentEntity.endpoint;
			var data = new FormData();
			var update = false;
			ctrl.currentEntity.fields.forEach(function (field) {
				if (field.type !== 'file') {
					if (typeof ctrl.data[field.name] === 'object' || typeof ctrl.data[field.name] === 'array') {
						return;
					}
					if (field.name === 'timestamp') {
						return;
					}
				}
				if (field.type === 'boolean') {
					data.append(field.name, ctrl.data[field.name] === true ? 1 : 0)
					return;
				}
				if (!ctrl.data[field.name]) {
					return;
				}
				if (field.name === ctrl.currentEntity.defaultSort) {
					update = true;
				}
					data.append(field.name, ctrl.data[field.name])
				
			})
			if (ctrl.currentEntity.translate) {
				data.append("language", ctrl.language);
			}
			var request = new XMLHttpRequest();
			if (update) {
				//$http.put(base, data).then(ctrl.getData).catch(error);
				request.open("PUT", base);
				request.setRequestHeader("Authorization", localStorage.getItem("token"));
				request.onload = ctrl.getData;
				request.send(data);
			} else {
				request.open("POST", base);
				request.setRequestHeader("Authorization", localStorage.getItem("token"));
				request.onload = function () {
					var p = page.parent
					var url = p.path;
					while (p.parent) {
						p = p.parent;
						url = p.path + '/' + url;
					}
					$location.path(url);
				};
				request.send(data);

				/*$http.post(base, data).then(function () {
					//ctrl.getData
				}).catch(error);*/
			}
		}
	};
});
