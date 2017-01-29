var BaseController = require('../utils/controller.js');
var util = require('util');
var utiles = require('../utils/utiles.js');
var Errors = require('../utils/errors.js');
var Permissions = require('../utils/permissions.js');
var auth_ctrl = require("./auth.js");

var city_model = require("../models/city.js");
var region_model = require("../models/region.js");
var institution_model = require("../models/institution.js");

var Place = function(){
	var auth = new auth_ctrl();
	var city = new city_model();
	var region = new region_model();
	var institution = new institution_model();
	//---------------------------------------------------------------
	var getMap = new Map(), postMap = new Map(), putMap = new Map(), deleteMap = new Map();

	/**
	 * Cities
	 */
	var get_city = function(token,params){
		if(params.id){
			return city.getByUid(params);
		}else {
				return city.getAll({
					filter:params.filter,
					limit:params.limit,
					page:params.page,
					order:params.order,
					filter_fields:params.filter_field,
					filter_values:params.filter_value,
					fields:["name"]});
			}
	};

	/**
	 * Regions
	 */
	var get_region = function(token,params){
		if(params.id){
			return region.getByUid(params);
		}else {
				return region.getAll({
					filter:params.filter,
					limit:params.limit,
					page:params.page,
					order:params.order,
					filter_fields:params.filter_field,
					filter_values:params.filter_value,
					fields:["name"]});
			}
	};

	/**
	 * Institutions
	 */
	var get_institution = function(token,params){
		if(params.id){
			return institution.getByUid(params);
		}else {
				return institution.getAll({
					filter:params.filter,
					limit:params.limit,
					page:params.page,
					order:params.order,
					filter_fields:params.filter_field,
					filter_values:params.filter_value,
					fields:["name"]});
			}
	};
	getMap.set('institution', { method: get_institution, permits: Permissions.NONE });
	getMap.set('city', { method: get_city, permits: Permissions.NONE });
	getMap.set('region', { method: get_region, permits: Permissions.NONE });
	
	/**
	 * Create Institution
	 */
	var create_institution = function(token,body){
		return auth.authorize(token,Permissions.PLATFORM).then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			return institution.create(body).then(function(i){
				if(i.insertId){
					return {error:Errors.NO_ERROR};
				}
				return {error:Errors[7]};
			});
		});
	};

	/**
	 * Bind a user to an institution
	 */
	var bind_user_institution = function(token,body){
		return auth.authorize(token,Permissions.PLATFORM).then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			return institution_user.create({
				id_institution: parseInt(body.id_institution),
				id_user : parseInt(body.id_user),
				role: body.role,
				admin: body.admin === "true"
			}).then(function(i_u){
				if(i_u.insertId){
					return {error:Errors.NO_ERROR};
				}else{
					return {error:Errors[7]};
				}
			});
		});
	};

	/**
	 * Import data from divipola file
	 * Divipola is the official code for cities and regions in Colombia
	 * requires admin access
	 */
	var import_divipola = function(token,body,files){
		return auth.authorize(token,"admin").then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			var xlsx = require("xlsx");
			//TODO: check file 
			var workbook = XLSX.readFile(files.divipola.name);
			var sheet_name_list = workbook.SheetNames;
			sheet_name_list.forEach(function(y) { /* iterate through sheets */
				var worksheet = workbook.Sheets[y];
				for (var z in worksheet) { /* all keys that do not begin with "!" correspond to cell addresses */
					if(z[0] === '!') continue;
					console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
				}
			});
		});
	};

	/**
	 * Create city
	 */
	var create_city = function(token,body){
		return auth.authorize(token,Permissions.ADMIN).then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			return city.create(body).then(function(c){
				if(c.insertId){
					return {error:Errors.NO_ERROR};
				}else{
					return {error:Errors[7]};
				}
			});
		});
	};
	/**
	 * Create region
	 */
	var create_region = function(token,body){
		return auth.authorize(token,Permissions.ADMIN).then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			return region.create(body).then(function(r){
				if(r.insertId){
					return {error:Errors.NO_ERROR};
				}else{
					return {error:Errors[7]};
				}
			});
		});
	};
	postMap.set("city",create_city);
	postMap.set("region",create_region);
	postMap.set("institution",create_institution);
	postMap.set("bind_user_institution",bind_user_institution);
	postMap.set("import_divipola",import_divipola);

	/**
	 * Updates a City
	 */
	var update_city = function(token,body){
		return auth.authorize(token,"admin").then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			if(!body.id){
				throw {error:Errors.BAD_REQUEST.MALFORMED_REQUEST};
			}
			city.update(body,{id:body.id});
		});
	};

	/**
	 * Updates an Region
	 */
	var update_region = function(token,body){
		return auth.authorize(token,"admin").then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			if(!body.id){
				throw {error:Errors.BAD_REQUEST.MALFORMED_REQUEST};
			}
			region.update(body,{id:body.id});
		});
	};

	/**
	 * Updates an Institution
	 */
	var update_institution = function(token,body){
		return auth.authorize(token,"admin").then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			if(!body.id){
				throw {error:Errors.BAD_REQUEST.MALFORMED_REQUEST};
			}
			institution.update(body,{id:body.id});
		});
	};

	putMap.set("city",update_city);
	putMap.set("region",update_region);
	putMap.set("institution",update_institution);
	
	var params = [getMap, postMap, putMap, deleteMap];
	BaseController.apply(this, params);
	//---------------------------------------------------------------

	return this;
};

util.inherits(Place, BaseController);

module.exports = Place;