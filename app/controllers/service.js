var BaseController = require('../utils/controller.js');
var util = require('util');
var Errors = require('../utils/errors.js');
var utiles = require('../utils/utiles.js');
var auth_ctrl = require("./auth.js");

var service_model = require("../models/service.js");
var service_status_model = require("../models/service_status.js");

var Service = function(){
	var service = new service_model();
	var service_status = new service_status_model();
	var auth = new auth_ctrl();
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

	/**
	 * Get services by @param id
	 */
	var get_services = function(queryParams){
		if(queryParams.id){
			return service.getByUid(queryParams.id);
		}else{
			return service.getAll();
		}
	};
	
	getMap.set("get_services",get_services);
	getMap.set("hall_fame",hall_fame);

	/**
	 * Postulate a service
	 */
	var postulate = function(token,body){
		return auth.authorize(token,"platform").then(function(authorization){ //check for authorization to postulate a service
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
					return {error:Errors[0]};
				}
			});
		});
	};

	postMap.set("postulate",postulate);
	
	var params = [getMap, postMap, putMap, deleteMap];
	BaseController.apply(this, params);
	//---------------------------------------------------------------

	return this;
};

util.inherits(Service, BaseController);

module.exports = Service;