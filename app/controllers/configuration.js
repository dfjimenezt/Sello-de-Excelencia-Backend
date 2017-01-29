var BaseController = require('../utils/controller.js');
var util = require('util');
var utiles = require('../utils/utiles.js');
var Errors = require('../utils/errors.js');
var Permissions = require('../utils/permissions.js');
var auth_ctrl = require("./auth.js");

var user_model = require("../models/user.js");
var role_model = require("../models/role.js");
var user_role_model = require("../models/user_role.js");
var permission_model = require("../models/permission.js");
var permission_role_model = require("../models/permission_role.js");

var Configuration = function () {
	var auth = new auth_ctrl();
	var _user = new user_model();
	var role = new role_model();
	var user_role = new user_role_model();
	var permission = new permission_model();
	var permission_role = new permission_role_model();

	//---------------------------------------------------------------
	var getMap = new Map(), postMap = new Map(), putMap = new Map(), deleteMap = new Map();

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
	 * Users
	 */
	var users = function (user, params) {
		if(params.line){
			return _user.getByLine(params.line);
		}else{
			return _get(_user,user,params);
		}
		
	};

	/**
	 * Roles disponibles
	 */
	var roles = function (user, params) {
		return _get(role,user,params);
	};

	/**
	 * Permisos disponibles
	 */
	var permissions = function (user, params) {
		return _get(permission,user,params);
	};
	/**
	 * Usuario _ Role
	 */
	var user_roles = function (user, params) {
		return _get(user_role,user,params);
	};
	/**
	 * Permission _ Role
	 */
	var permission_roles = function (user, params) {
		return _get(permission_role,user,params);
	};

	getMap.set("user", { method: users, permits: Permissions.PLATFORM });
	getMap.set("role", { method: roles, permits: Permissions.ADMIN });
	getMap.set("user_role", { method: user_roles, permits: Permissions.ADMIN });
	getMap.set("permission", { method: permissions, permits: Permissions.ADMIN });
	getMap.set("permission_role", { method: permission_roles, permits: Permissions.ADMIN });

	var _create = function(model,body){
		return model.create(body).then((u) => {
			if (u.insertId) {
				return { error: Errors.NO_ERROR };
			}
			return { error: Errors[7] };
		});
	}
	/**
	 * Crear usuario
	 */
	var create_user = function (user, body) {
		return _create(_user,body)
	};
	/**
	 * Crear Rol
	 */
	var create_role = function (user, body) {
		return _create(role,body);
	};
	/**
	 * Crear Permiso
	 */
	var create_permission = function (token, body) {
		return _create(permission,body);
	};

	/**
	 * Crear Usuario Role
	 */
	var bind_user_role = function (token, body) {
		return user_roles.create(body).then((u) => {
			return { error: Errors.NO_ERROR };
		});
	};

	/**
	 * Crear Usuario Role
	 */
	var bind_permission_role = function (token, body) {
		return permission_role.create(body).then((u) => {
			return { error: Errors.NO_ERROR };
		});
	};

	postMap.set("user", { method: create_user, permits: Permissions.ADMIN });
	postMap.set("role", { method: create_role, permits: Permissions.ADMIN });
	postMap.set("permission", { method: create_permission, permits: Permissions.ADMIN });
	postMap.set("user_role", { method: bind_user_role, permits: Permissions.ADMIN });
	postMap.set("permission_role", { method: bind_permission_role, permits: Permissions.ADMIN });

	/**
	 * Updates an User
	 */
	var update_user = function (token, body) {
		return auth.authorize(token, "admin").then(function (authorization) {
			if (!authorization) { //admin for every user
				return auth.authorize(token, "platform").then(function (authorization) { //if user can change if and only if it's own user
					if (!authorization) {
						throw { error: Errors.AUTHORIZATION.NOT_AUTHORIZED };
					}
					if (!body.id) {
						throw { error: Errors.BAD_REQUEST.MALFORMED_REQUEST };
					}
					if (authorization.id !== body.id) {
						throw { error: Errors.AUTHORIZATION.NOT_AUTHORIZED };
					}
					user.update(body, { id: body.id });
				});
			}
			if (!body.id) {
				throw { error: Errors.BAD_REQUEST.MALFORMED_REQUEST };
			}
			user.update(body, { id: body.id });
		});
	};

	/**
	 * Updates an Role
	 */
	var update_role = function (token, body) {
		if (!body.id) {
			throw { error: Errors.BAD_REQUEST.MALFORMED_REQUEST };
		}
		role.update(body, { id: body.id });
	};

	/**
	 * Updates a Permission
	 */
	var update_permission = function (token, body) {
		if (!body.id) {
			throw { error: Errors.BAD_REQUEST.MALFORMED_REQUEST };
		}
		permission.update(body, { id: body.id });
	};

	/**
	 * Updates an User_Role
	 */
	var update_user_role = function (token, body) {
		if (!body.id) {
			throw { error: Errors.BAD_REQUEST.MALFORMED_REQUEST };
		}
		user_role.update(body, { id_user: body.id_user, id_role: body.id_role });
	};

	/**
	 * Updates an permission_role
	 */
	var update_permission_role = function (token, body) {
		if (!body.id) {
			throw { error: Errors.BAD_REQUEST.MALFORMED_REQUEST };
		}
		psermission_role.update(body, { id_user: body.id_user, id_permission: body.id_permission });
	};

	putMap.set("user", { method: update_user, permits: Permissions.ADMIN });
	putMap.set("role", { method: update_role, permits: Permissions.ADMIN });
	putMap.set("permission", { method: update_permission, permits: Permissions.ADMIN });
	putMap.set("user_role", { method: update_user_role, permits: Permissions.ADMIN });
	putMap.set("permission_role", { method: update_permission_role, permits: Permissions.ADMIN });

	/**
	 * user
	*/
	var delete_user = function (user, body) {
		if (!body.id) {
			throw { error: Errors.BAD_REQUEST.MALFORMED_REQUEST };
		}
		return user.deleteUser(body,{id:body.id});
	};
	/**
	 * role
	*/
	var delete_role = function (user, body) {
		if (!body.id) {
			throw { error: Errors.BAD_REQUEST.MALFORMED_REQUEST };
		}
		return role.delete(body,{id:body.id});
	};
	/**
	 * permission
	*/
	var delete_permission = function (user, body) {
		if (!body.id) {
			throw { error: Errors.BAD_REQUEST.MALFORMED_REQUEST };
		}
		return permission.delete(body,{id:body.id});
	};
	/**
	 * permission_role
	*/
	var delete_permission_role = function (user, body) {
		if (!body.id) {
			throw { error: Errors.BAD_REQUEST.MALFORMED_REQUEST };
		}
		return permission_role.delete(body,{id:body.id});
	};
	deleteMap.set('user', { method: delete_user, permits: Permissions.ADMIN });
	deleteMap.set('role', { method: delete_role, permits: Permissions.ADMIN });
	deleteMap.set('permission', { method: delete_permission, permits: Permissions.ADMIN });
	deleteMap.set('permission_role', { method: delete_permission_role, permits: Permissions.ADMIN });
	
	var params = [getMap, postMap, putMap, deleteMap];
	BaseController.apply(this, params);
	//---------------------------------------------------------------

	return this;
};

util.inherits(Configuration, BaseController);

module.exports = Configuration;