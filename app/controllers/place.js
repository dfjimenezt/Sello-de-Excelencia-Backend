var BaseController = require('../utils/controller.js');
var util = require('util');
var utiles = require('../utils/utiles.js');
var Errors = require('../utils/errors.js');
var Permissions = require('../utils/permissions.js');
var auth_ctrl = require("./auth.js");

var city_model = require("../models/city.js");
var region_model = require("../models/region.js");
var institution_model = require("../models/institution.js");

var Place = function () {
	var auth = new auth_ctrl();
	var city = new city_model();
	var region = new region_model();
	var institution = new institution_model();
	//---------------------------------------------------------------
	var getMap = new Map(), postMap = new Map(), putMap = new Map(), deleteMap = new Map();

	/**
	 * Cities
	 */
	var get_city = function (token, params) {
		if (params.id) {
			return city.getByUid(params);
		} else {
			return city.getAll({
				filter: params.filter,
				limit: params.limit,
				page: params.page,
				order: params.order,
				filter_fields: params.filter_field,
				filter_values: params.filter_value,
				fields: ["name"]
			});
		}
	};

	/**
	 * Regions
	 */
	var get_region = function (token, params) {
		if (params.id) {
			return region.getByUid(params);
		} else {
			return region.getAll({
				filter: params.filter,
				limit: params.limit,
				page: params.page,
				order: params.order,
				filter_fields: params.filter_field,
				filter_values: params.filter_value,
				fields: ["name"]
			});
		}
	};

	/**
	 * Institutions
	 */
	var get_institution = function (token, params) {
		if (params.id) {
			return institution.getByUid(params);
		} else {
			return institution.getAll({
				filter: params.filter,
				limit: params.limit,
				page: params.page,
				order: params.order,
				filter_fields: params.filter_field,
				filter_values: params.filter_value,
				fields: ["name"]
			});
		}
	};
	getMap.set('institution', { method: get_institution, permits: Permissions.NONE });
	getMap.set('city', { method: get_city, permits: Permissions.NONE });
	getMap.set('region', { method: get_region, permits: Permissions.NONE });

	/**
	 * Create Institution
	 */
	var create_institution = function (token, body, file) {
		if (file.data) {
			let data = utiles.parseExcelFile(file.data.path);
			return institution.createMultiple(data);
		}
		return institution.create(body)
	};

	/**
	 * Bind a user to an institution
	 */
	var bind_user_institution = function (token, body) {
			return institution_user.create({
				id_institution: parseInt(body.id_institution),
				id_user: parseInt(body.id_user),
				role: body.role,
				admin: body.admin === "true"
			}).then(function (i_u) {
				if (i_u.insertId) {
					return utiles.informError(0);
				} else {
					return utiles.informError(400);
				}
			});
		
	};

	/**
	 * Create city
	 */
	var create_city = function (user, body, file) {
		if (file.data) {
			let data = utiles.parseExcelFile(file.data.path);
			return city.createMultiple(data);
		}
		return city.create(body);
	};
	/**
	 * Create region
	 */
	var create_region = function (user, body, file) {
		if (file.data) {
			let data = utiles.parseExcelFile(file.data.path);
			return region.createMultiple(data);
		}
		return region.create(body);
	};
	postMap.set("city", { method: create_city, permits: Permissions.NONE });
	postMap.set("region", { method: create_region, permits: Permissions.NONE });
	postMap.set("institution", { method: create_institution, permits: Permissions.ADMIN });
	postMap.set("bind_user_institution", { method: bind_user_institution, permits: Permissions.ADMIN });

	/**
	 * Updates a City
	 */
	var update_city = function (token, body) {
		if (!body.id) {
			throw utiles.informError(400);
		}
		city.update(body, { id: body.id });
	};

	/**
	 * Updates an Region
	 */
	var update_region = function (token, body) {
		if (!body.id) {
			throw utiles.informError(400);
		}
		region.update(body, { id: body.id });
	};

	/**
	 * Updates an Institution
	 */
	var update_institution = function (token, body) {
		if (!body.id) {
			throw utiles.informError(400);
		}
		institution.update(body, { id: body.id });
	};

	putMap.set("city", { method: update_city, permits: Permissions.ADMIN });
	putMap.set("region", { method: update_region, permits: Permissions.ADMIN });
	putMap.set("institution", { method: update_institution, permits: Permissions.ADMIN });

	/**
	 * Deletes a City
	 */
	var delete_city = function (token, body) {
		if (!body.id) {
			throw utiles.informError(400);
		}
		city.delete(body, { id: body.id });
	};

	/**
	 * Deletes an Region
	 */
	var delete_region = function (token, body) {
		if (!body.id) {
			throw utiles.informError(400);
		}
		region.delete(body, { id: body.id });
	};

	/**
	 * Deletes an Institution
	 */
	var delete_institution = function (token, body) {
		if (!body.id) {
			throw utiles.informError(400);
		}
		institution.delete(body, { id: body.id });
	};

	deleteMap.set("city", { method: delete_city, permits: Permissions.ADMIN });
	deleteMap.set("region", { method: delete_region, permits: Permissions.ADMIN });
	deleteMap.set("institution", { method: delete_institution, permits: Permissions.ADMIN });

	var params = [getMap, postMap, putMap, deleteMap];
	BaseController.apply(this, params);
	//---------------------------------------------------------------

	return this;
};

util.inherits(Place, BaseController);

module.exports = Place;