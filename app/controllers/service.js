var BaseController = require('../utils/controller.js');
var util = require('util');
var utiles = require('../utils/utiles.js');

var service_model = require("../models/service.js");
var service_status_model = require("../models/service_status.js");

var Service = function(){
	var service = new service_model();
	var service_status = new service_status_model();
	//---------------------------------------------------------------
	var getMap = new Map(), postMap = new Map(), putMap = new Map(), deleteMap = new Map();

	/**
	 * Hall of fame, approved services sorted by rates
	 */
	var hall_fame = function(){
		return service.getByParams({status:4}).then(function(services){
			return services.sort(function(a,b){return b.rate - a.rate});
		});
	}

	getMap.set("hall_fame",hall_fame);

	/**
	 * Postulate a service
	 */
	var postulate = function(body){
		return service.create({
			name:body.name,
			id_institution:body.institution.id,
			id_user:body.user.id,
			hash:utiles.createUid(),
			rate:0,
			id_category:body.category.id
		}).then(function(s){
			if(!s){//if there is any problem creating the service
				throw {error:Errors[7]};
			}else{// created problem
				var valid  = new Date();
				valid.setFullYear(now.getFullYear()+1);
				//create the status for the problem, will be valid for 1 year
				service_status.create({
					id_service:s.id,
					id_status:1,
					valid_to:valid
				});
				return {error:Errors[0]};
			}
		});
	}

	postMap.set("postulate",postulate);
	
	var params = [getMap, postMap, putMap, deleteMap];
	BaseController.apply(this, params);
	//---------------------------------------------------------------

	return this;
};

util.inherits(Service, BaseController);

module.exports = Service;