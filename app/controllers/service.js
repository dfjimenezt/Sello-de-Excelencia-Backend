var BaseController = require('../utils/controller.js');
var util = require('util');
var Errors = require('../utils/errors.js');
var utiles = require('../utils/utiles.js');
var Permissions = require('../utils/permissions.js');
var auth_ctrl = require("./auth.js");
var service_model = require("../models/service.js");
var service_status_model = require("../models/service_status.js");
var category_model = require("../models/category.js");

var Service = function(){
	var auth = new auth_ctrl();

	var service = new service_model();
	var service_status = new service_status_model();
	var category = new category_model();

	//---------------------------------------------------------------
	var getMap = new Map(), postMap = new Map(), putMap = new Map(), deleteMap = new Map();


	/**
	 * Hall of fame, approved services sorted by rates
	 */
	var hall_fame = function(){
		return service.getByParams({status:4}).then(function(services){
			return services.sort(function(a,b){return b.rate - a.rate;});
		});
	};

	var _get = function(model,user,params){
		if (params.id) {
			return model.getByUid(params.id);
		} else {
			return model.getAll({
				filter: params.filter,
				limit: params.limit,
				page: params.page,
				order: params.order,
				filter_fields:params.filter_field,
				filter_values:params.filter_value,
				fields: params.field
			});
		}
	}
	/**
	 * service
	*/
	var get_service = function (user, params) {
		return _get(service,user,params);
	};
	/**
	 * category
	*/
	var get_category = function (user, params) {
		return _get(category,user,params);
	};
	getMap.set('service', { method: get_service, permits: Permissions.NONE });
	getMap.set('category', { method: get_category, permits: Permissions.NONE });

	getMap.set("hall_fame",{method: hall_fame, permits: Permissions.NONE});

	/**
	 * Postulate a service
	 */
	var postulate = function(token,body){
		return auth.authorize(token,Permissions.PLATFORM).then(function(authorization){ //check for authorization to postulate a service
			if(!authorization){
				throw {error:Errors[4]};
			}
			return service.create({
				name:body.name,
				address:body.address,
				email:body.email,
				second_email:body.second_email,
				head_sector: body.head_sector === "true",
				id_institution:parseInt(body.id_institution),
				id_user_creator:parseInt(body.id_user_creator),
				hash:utiles.createUid(),
				rate:0,
				id_category:parseInt(body.id_category)
			}).then(function(s){
				if(!s){//if there is any problem creating the service
					throw {error:Errors[7]};
				}else{// created problem
					var valid  = new Date();
					valid.setFullYear(now.getFullYear()+1);
					//create the status for the problem, will be valid for 1 year
					service_status.create({
						id_service:s.insertId,
						id_status:1,
						valid_to:valid
					});
					return {error:Errors.NO_ERROR};
				}
			});
		});
	};

	var create_category = function(token,body){
		return auth.authorize(token,"admin").then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			return category.create(body).then(function(c){
				if(c.insertId){
					return {error:Errors.NO_ERROR};
				}else{
					throw {error:Errors[7]};
				}
			});
		});
	};

	postMap.set("category",{method: create_category, permits: Permissions.NONE});
	postMap.set("service",{method: postulate, permits: Permissions.NONE});
	
	/**
	 * Updates a category
	 */
	var update_category = function(token,body){
		return auth.authorize(token,"admin").then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			if(!body.id){
				throw {error:Errors.BAD_REQUEST.MALFORMED_REQUEST};
			}
			category.update(body,{id:body.id});
		});
	};

	/**
	 * Updates a Service
	 */
	var update_service = function(token,body){
		return auth.authorize(token,"admin").then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			if(!body.id){
				throw {error:Errors.BAD_REQUEST.MALFORMED_REQUEST};
			}
			service.update(body,{id:body.id});
		});
	};

	putMap.set("category",{method: update_category, permits: Permissions.NONE});
	putMap.set("service",{method: update_service, permits: Permissions.NONE});

	var params = [getMap, postMap, putMap, deleteMap];
	BaseController.apply(this, params);
	//---------------------------------------------------------------

	return this;
};

util.inherits(Service, BaseController);

module.exports = Service;