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

var Configuration = function(){
	var auth = new auth_ctrl();
	var user = new user_model();
	var role = new role_model();
	var user_role = new user_role_model();
	var permission = new permission_model();
	var permission_role = new permission_role_model();

	//---------------------------------------------------------------
	var getMap = new Map(), postMap = new Map(), putMap = new Map(), deleteMap = new Map();

	/**
	 * Users
	 */
	var users = function(token,params){
		return auth.authorize(token,Permissions.ADMIN).then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			if(params.id){
				return user.getByUid(params.id);
			}else if(params.filter || params.limit || params.page || params.page){
				return user.getFiltered({
					filter:params.filter,
					limit:params.limit,
					page:params.page,
					order:params.order,
					fields:["name","email"]});
			}else{
				return user.getAll();
			}
		});
	};

	/**
	 * Roles disponibles
	 */
	var roles = function(token,params){
		return auth.authorize(token,Permissions.ADMIN).then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			if(params.id){
				return role.getByUid(params);
			}else if(params.filter || params.limit || params.page || params.page){
				return role.getFiltered({
					filter:params.filter,
					limit:params.limit,
					page:params.page,
					order:params.order,
					fields:["name"]});
			}else{
				return role.getAll();
			}
		});
	};

	/**
	 * Permisos disponibles
	 */
	var permissions = function(token,params){
		return auth.authorize(token,Permissions.ADMIN).then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			if(params.id){
				return permission.getByUid(params);
			}else if(params.filter || params.limit || params.page || params.page){
				return permission.getFiltered({
					filter:params.filter,
					limit:params.limit,
					page:params.page,
					order:params.order,
					fields:["name"]});
			}else{
				return permission.getAll();
			}
		});
	};
	/**
	 * Usuario _ Role
	 */
	var user_roles = function(token,params){
		return auth.authorize(token,Permissions.ADMIN).then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			if(params.id_user){
				return user_role.getByParams({id_user:id_user});
			}else if(params.filter || params.limit || params.page || params.page){
				return user_role.getFiltered({
					filter:params.filter,
					limit:params.limit,
					page:params.page,
					order:params.order,
					fields:["id_user","id_role"]});
			}else{
				return user_role.getAll();
			}
		});
	};
	/**
	 * Permission _ Role
	 */
	var permission_roles = function(token,params){
		return auth.authorize(token,Permissions.ADMIN).then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			if(params.id_user){
				return permission_role.getByParams({id_permission:id_permission});
			}else if(params.filter || params.limit || params.page || params.page){
				return permission_role.getFiltered({
					filter:params.filter,
					limit:params.limit,
					page:params.page,
					order:params.order,
					fields:["id_permission","id_role"]});
			}else{
				return permission_role.getAll();
			}
		});
	};
	getMap.set("user",users);
	getMap.set("role",roles);
	getMap.set("user_role",user_roles);
	getMap.set("permission",permissions);
	getMap.set("permission_role",permission_roles);

	/**
	 * Crear usuario
	 */
	var create_user = function(token,body){
		return auth.authorize(token,Permissions.ADMIN).then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			return user.create(body).then(function(u){
				if(u.insertId){
					return {error:Errors.NO_ERROR};
				}
				return {error:Errors[7]};
			});
		});
	};
	/**
	 * Crear Rol
	 */
	var create_role = function(token,body){
		return auth.authorize(token,Permissions.ADMIN).then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			return role.create(body).then(function(u){
				if(u.insertId){
					return {error:Errors.NO_ERROR};
				}
				return {error:Errors[7]};
			});
		});
	};
	/**
	 * Crear Permiso
	 */
	var create_permission = function(token,body){
		return auth.authorize(token,Permissions.ADMIN).then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			return permission.create(body).then(function(u){
				if(u.insertId){
					return {error:Errors.NO_ERROR};
				}
				return {error:Errors[7]};
			});
		});
	};
	/**
	 * Crear Usuario Role
	 */
	var bind_user_role = function(token,body){
		return auth.authorize(token,Permissions.ADMIN).then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			return user_roles.create(body).then(function(u){
				//if(u.insertId){
					return {error:Errors.NO_ERROR};
				//}
				//throw {error:Errors[7]};
			});
		});
	};

	/**
	 * Crear Usuario Role
	 */
	var bind_permission_role = function(token,body){
		return auth.authorize(token,Permissions.ADMIN).then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			return permission_role.create(body).then(function(u){
				//if(u.insertId){
					return {error:Errors.NO_ERROR};
				//}
				//throw {error:Errors[7]};
			});
		});
	};

	postMap.set("user",create_user);
	postMap.set("role",create_role);
	postMap.set("permission",create_permission);
	postMap.set("user_role",bind_user_role);
	postMap.set("permission_role",bind_permission_role);

	/**
	 * Updates an User
	 */
	var update_user = function(token,body){
		return auth.authorize(token,"admin").then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			if(!body.id){
				throw {error:Errors.BAD_REQUEST.MALFORMED_REQUEST};
			}
			user.update(body,{id:body.id});
		});
	};

	/**
	 * Updates an Role
	 */
	var update_role = function(token,body){
		return auth.authorize(token,"admin").then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			if(!body.id){
				throw {error:Errors.BAD_REQUEST.MALFORMED_REQUEST};
			}
			user.update(role,{id:body.id});
		});
	};

	/**
	 * Updates a Permission
	 */
	var update_permission = function(token,body){
		return auth.authorize(token,"admin").then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			if(!body.id){
				throw {error:Errors.BAD_REQUEST.MALFORMED_REQUEST};
			}
			user.update(permission,{id:body.id});
		});
	};

	/**
	 * Updates an User_Role
	 */
	var update_user_role = function(token,body){
		return auth.authorize(token,"admin").then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			if(!body.id){
				throw {error:Errors.BAD_REQUEST.MALFORMED_REQUEST};
			}
			user.update(user_role,{id_user:body.id_user,id_role:body.id_role});
		});
	};
	
	/**
	 * Updates an permission_role
	 */
	var update_permission_role = function(token,body){
		return auth.authorize(token,"admin").then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			if(!body.id){
				throw {error:Errors.BAD_REQUEST.MALFORMED_REQUEST};
			}
			user.update(permission_role,{id_user:body.id_user,id_permission:body.id_permission});
		});
	};

	putMap.set("user",update_user);
	putMap.set("role",update_role);
	putMap.set("permission",update_permission);
	putMap.set("user_role",update_user_role);
	putMap.set("permission_role",update_permission_role);

	var params = [getMap, postMap, putMap, deleteMap];
	BaseController.apply(this, params);
	//---------------------------------------------------------------

	return this;
};

util.inherits(Configuration, BaseController);

module.exports = Configuration;