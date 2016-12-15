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

	postMap.set("institution",create_institution);
	
	var params = [getMap, postMap, putMap, deleteMap];
	BaseController.apply(this, params);
	//---------------------------------------------------------------

	return this;
};

util.inherits(Place, BaseController);

module.exports = Place;