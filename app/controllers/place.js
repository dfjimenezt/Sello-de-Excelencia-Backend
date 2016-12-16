var BaseController = require('../utils/controller.js');
var util = require('util');
var utiles = require('../utils/utiles.js');
var Errors = require('../utils/errors.js');
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
	var cities = function(params){
		if(params){
			return city.getByUid(params);
		}else{
			return city.getAll();
		}
	};

	/**
	 * Regions
	 */
	var regions = function(params){
		if(params){
			return region.getByUid(params);
		}else{
			return region.getAll();
		}
	};

	/**
	 * Institutions
	 */
	var institutions = function(params){
		if(params){
			return institution.getByUid(params);
		}else{
			return institution.getAll();
		}
	};
	getMap.set("city",cities);
	getMap.set("region",regions);
	getMap.set("institution",institutions);

	/**
	 * Create Institution
	 */
	var create_institution = function(token,body){
		return auth.authorize(token,"platform").then(function(authorization){
			if(!authorization){
				throw {error:Errors[4]};
			}
			return institution.create(body).then(function(i){
				if(i.insertId){
					return {error:Errors[0]};
				}
				return {error:Errors[7]};
			});
		});
	};

	/**
	 * Bind a user to an institution
	 */
	var bind_user_institution = function(token,body){
		return auth.authorize(token,"platform").then(function(authorization){
			if(!authorization){
				throw {error:Errors[4]};
			}
			return institution_user.create({
				id_institution: parseInt(body.id_institution),
				id_user : parseInt(body.id_user),
				role: body.role,
				admin: body.admin === "true"
			}).then(function(i_u){
				if(i_u.insertId){
					return {error:Errors[0]};
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
				throw {error:Errors[4]};
			}
			var xlsx = require("xlsx");
			//TODO: check file 
			var workbook = XLSX.readFile(files.divipola.name);
			var sheet_name_list = workbook.SheetNames;
			sheet_name_list.forEach(function(y) { /* iterate through sheets */
				var worksheet = workbook.Sheets[y];
				for (z in worksheet) { /* all keys that do not begin with "!" correspond to cell addresses */
					if(z[0] === '!') continue;
					console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
				};
			});
		});
	};

	postMap.set("institution",create_institution);
	postMap.set("bind_user_institution",bind_user_institution);
	postMap.set("import_divipola",import_divipola);
	
	var params = [getMap, postMap, putMap, deleteMap];
	BaseController.apply(this, params);
	//---------------------------------------------------------------

	return this;
};

util.inherits(Place, BaseController);

module.exports = Place;