angular.module('dmt-back')
	.service('entity', function ($http,$q) {
		return function (entity) {
			this.currentEntity = null
			if(typeof entity === 'string' ){
				this.currentEntity = dmt.entities[entity]
			}else{
				this.currentEntity = entity
			}
			 
			this.entities = {}
			this.data = {}
			if (!this.currentEntity.relations) {
				this.currentEntity.relations = []
			}
			this.currentEntity.relations.forEach((relation) => {
				this.entities[relation.entity] = {
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
					getData: function () { this.getEntityData(relation) },
					search: function () { this.search(relation) }
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
			
			function removeItems(item, index) {
				var base = relation.endpoint;
				var fields = [];
				this.fields.forEach((field) => {
					if (field.key === "true" || field.key === true) {
						if (typeof item === 'object') {
							fields.push(field.name + "=" + item[field.name]);
						}else{
							fields.push(field.name + "=" + item);
						}
					}
				})
				var query = "?" + fields.join("&");
				var promise = $http.delete(base + query);
				promise.then(function () {
					items.splice(index, 1);
				});
				return promise;
			}
			this.delete = function (items,relation) {
				$q.all(items.forEach(removeItems,relation)).then(onComplete).catch(error);
			}

			this.updateItem = function (item, field, relation) {
				var deferred = $q.defer();
				let entity = dmt.entities[relation.entity];
				var data = new FormData();
				var update = false;
				entity.fields.forEach(function (field) {
					if (field.type !== 'file') {
						if (typeof item[field.name] === 'object' || typeof item[field.name] === 'array') {
							if ((item[field.name] instanceof Date)) {
								let _d = item[field.name].toISOString()
								_d = _d.split('T').join(' ').split('.')[0]
								data.append(field.name, _d)
							}
							return;
						}
						if (field.name === 'timestamp') {
							return;
						}
					}
					if (field.type === 'boolean') {
						data.append(field.name, item[field.name] === true ? 1 : 0)
						return;
					}
					if (!item[field.name]) {
						return;
					}
					if (field.name === entity.defaultSort) {
						update = true;
					}
					data.append(field.name, item[field.name])
				})
				var request = new XMLHttpRequest();
				if(update){
					request.open("PUT", entity.endpoint);
				}else{
					request.open("POST", entity.endpoint);
				}				
				request.setRequestHeader("Authorization", localStorage.getItem("token"))
				request.onload = function () {
					if(request.status === XMLHttpRequest.DONE){
						deferred.resolve(request.responseText)
					}else{
						deferred.reject(request.responseText)
					}
				}
				request.send(data)
				return deferred
			}
			this.save = function(){
				return this.updateItem(this.data,null,this.currentEntity)
			}

			this.search = function (relation) {
				if (this.entities[relation.entity].bookmark == null) {
					this.entities[relation.entity].bookmark = this.entities[relation.entity].query.page;
				}
				this.entities[relation.entity].query.page = 1;
				this.entities[relation.entity].getData();
			}
			this.removeFilter = function (relation) {
				this.entities[relation.entity].filter.show = false;
				this.entities[relation.entity].query.filter = '';
				this.entities[relation.entity].query.page = ctrl.entities[relation.entity].bookmark;
				this.entities[relation.entity].bookmark = null;
				if (this.entities[relation.entity].filter.form.$dirty) {
					this.entities[relation.entity].filter.form.$setPristine();
				}
				this.entities[relation.entity].getData();
			}
			this.getEntityData = function (relation) {
				let str = [];
				let entity = dmt.entities[relation.entity];
				let table = null
				if (!entity) {
					entity = dmt.tables[relation.entity];
					table = entity
				} else {
					table = dmt.tables[entity.table]
				}
				if (this.entities[relation.entity].query.filter.length) {
					str.push("filter=" + this.entities[relation.entity].query.filter);
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
				} else if (relation.intermediate && this.entities[relation.entity].selected.length === 0) {
					let intermediate = []
					intermediate.push("filter_field=" + relation.intermediate.leftKey);
					intermediate.push("filter_value=" + $routeParams.id);
					if(this.language){intermediate.push("lang=" + this.language )}
					let ety_intermediate = dmt.entities[relation.intermediate.entity];
					if (!ety_intermediate) {
						ety_intermediate = dmt.tables[relation.intermediate.entity];
					}
					$http.get(ety_intermediate.endpoint + "?" + intermediate.join("&")).then((response) => {
						response.data.data.forEach(function (item) {
							if (this.entities[relation.entity].selected.indexOf(item[relation.intermediate.rightKey]) === -1) {
								this.entities[relation.entity].selected.push(item[relation.intermediate.rightKey])
							}
						})
					})
				}
			}
			this.getData = function(){
				return this.getEntityData(this.entity)
			}

		}

	})
