var BaseController = require('../utils/controller.js')
var util = require('util')
var utiles = require('../utils/utiles.js')
var Errors = require('../utils/errors.js')
var Permissions = require('../utils/permissions.js')
var auth_ctrl = require("./auth.js")

var user_model = require("../models/user.js")
var role_model = require("../models/role.js")
var user_role_model = require("../models/user_role.js")
var permission_model = require("../models/permission.js")
var permission_role_model = require("../models/permission_role.js")

var Configuration = function () {
	var auth = new auth_ctrl()
	var _user = new user_model()
	var role = new role_model()
	var user_role = new user_role_model()
	var permission = new permission_model()
	var permission_role = new permission_role_model()

	//---------------------------------------------------------------
	var getMap = new Map(), postMap = new Map(), putMap = new Map(), deleteMap = new Map()

	var _get = function(model,user,params){
		if (params.id) {
			return model.getByUid(params.id)
		} else {
			return model.getAll({
				filter: params.filter,
				limit: params.limit,
				page: params.page,
				order: params.order,
				filter_fields:params.filter_field,
				filter_values:params.filter_value,
				fields: params.field
			})
		}
	}
	/**
	 * Users
	 */
	var users = function (user, params) {
		return _get(_user,user,params)
	}

	/**
	 * Roles disponibles
	 */
	var roles = function (user, params) {
		return _get(role,user,params)
	}

	/**
	 * Permisos disponibles
	 */
	var permissions = function (user, params) {
		return _get(permission,user,params)
	}
	/**
	 * Usuario _ Role
	 */
	var user_roles = function (user, params) {
		return _get(user_role,user,params)
	}
	/**
	 * Permission _ Role
	 */
	var permission_roles = function (user, params) {
		return _get(permission_role,user,params)
	}

	getMap.set("user", { method: users, permits: Permissions.PLATFORM })
	getMap.set("role", { method: roles, permits: Permissions.ADMIN })
	getMap.set("user_role", { method: user_roles, permits: Permissions.ADMIN })
	getMap.set("permission", { method: permissions, permits: Permissions.ADMIN })
	getMap.set("permission_role", { method: permission_roles, permits: Permissions.ADMIN })

	var _create = function(model,body){
		return model.create(body).then((u) => {
			if (u.insertId) {
				return utiles.informError(0)
			}
			return utiles.informError(400)
		})
	}
	/**
	 * Crear usuario
	 */
	var create_user = function (user, body ,file) {
		if(file.data){
			let data = utiles.parseExcelFile(file.data.path)
			return _user.createMultiple(data)
		}
		return _create(_user,body)
	}
	/**
	 * Crear Rol
	 */
	var create_role = function (user, body) {
		return _create(role,body)
	}
	/**
	 * Crear Permiso
	 */
	var create_permission = function (token, body) {
		return _create(permission,body)
	}

	/**
	 * Crear Usuario Role
	 */
	var bind_user_role = function (token, body) {
		return user_roles.create(body).then((u) => {
			return utiles.informError(0)
		})
	}

	/**
	 * Crear Usuario Role
	 */
	var bind_permission_role = function (token, body) {
		return permission_role.create(body).then((u) => {
			return utiles.informError(0)
		})
	}

	/**
	 * Crear Usuario Role
	 */
	var import_data = function (token, body, files) {
		
	}

	postMap.set("user", { method: create_user, permits: Permissions.ADMIN })
	postMap.set("role", { method: create_role, permits: Permissions.ADMIN })
	postMap.set("permission", { method: create_permission, permits: Permissions.ADMIN })
	postMap.set("user_role", { method: bind_user_role, permits: Permissions.ADMIN })
	postMap.set("permission_role", { method: bind_permission_role, permits: Permissions.ADMIN })
	postMap.set("import_data", { method: import_data, permits: Permissions.ADMIN })

	/**
	 * Updates an User
	 */
	var update_user = function (user, body) {
		if(user.id !== body.id){
			if(user.permissions.indexOf("admin") == -1){
				throw utiles.informError(401)	
			}
		}
		if(!body.id){
			throw utiles.informError(400)
		}
		return _user.update(body,{id:body.id})
	}

	/**
	 * Updates an Role
	 */
	var update_role = function (token, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		role.update(body, { id: body.id })
	}

	/**
	 * Updates a Permission
	 */
	var update_permission = function (token, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		permission.update(body, { id: body.id })
	}

	/**
	 * Updates an User_Role
	 */
	var update_user_role = function (token, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		user_role.update(body, { id_user: body.id_user, id_role: body.id_role })
	}

	/**
	 * Updates an permission_role
	 */
	var update_permission_role = function (token, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		psermission_role.update(body, { id_user: body.id_user, id_permission: body.id_permission })
	}

	putMap.set("user", { method: update_user, permits: Permissions.PLATFORM })
	putMap.set("role", { method: update_role, permits: Permissions.ADMIN })
	putMap.set("permission", { method: update_permission, permits: Permissions.ADMIN })
	putMap.set("user_role", { method: update_user_role, permits: Permissions.ADMIN })
	putMap.set("permission_role", { method: update_permission_role, permits: Permissions.ADMIN })

	/**
	 * user
	*/
	var delete_user = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return _user.deleteUser(body,{id:body.id})
	}
	/**
	 * role
	*/
	var delete_role = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return role.delete(body,{id:body.id})
	}
	/**
	 * permission
	*/
	var delete_permission = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return permission.delete(body,{id:body.id})
	}
	/**
	 * permission_role
	*/
	var delete_permission_role = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return permission_role.delete(body,{id:body.id})
	}
	deleteMap.set('user', { method: delete_user, permits: Permissions.ADMIN })
	deleteMap.set('role', { method: delete_role, permits: Permissions.ADMIN })
	deleteMap.set('permission', { method: delete_permission, permits: Permissions.ADMIN })
	deleteMap.set('permission_role', { method: delete_permission_role, permits: Permissions.ADMIN })
	
	var params = [getMap, postMap, putMap, deleteMap]
	BaseController.apply(this, params)
	//---------------------------------------------------------------

	return this
}

util.inherits(Configuration, BaseController)

module.exports = Configuration