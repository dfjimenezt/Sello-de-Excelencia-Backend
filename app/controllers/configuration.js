var BaseController = require('../utils/controller.js');
var util = require('util');
var utiles = require('../utils/utiles.js');
var Errors = require('../utils/errors.js');
var auth_ctrl = require("./auth.js");

var user_model = require("../models/user.js");
var role_model = require("../models/role.js");
var user_role_model = require("../models/user_role.js");
var permission_model = require("../models/permission.js");
var permission_role_model = require("../models/institution.js");

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
	var users = function(params){
		if(params.id){
			return user.getByUid(params);
		}else{
			return user.getAll();
		}
	};

	/**
	 * Roles disponibles
	 */
	var roles = function(params){
		if(params.id){
			return role.getByUid(params);
		}else{
			return role.getAll();
		}
	};

	/**
	 * Permisos disponibles
	 */
	var permissions = function(params){
		if(params.id){
			return permission.getByUid(params);
		}else{
			return permission.getAll();
		}
	};
	/**
	 * Usuario _ Role
	 */
	var user_roles = function(params){
		if(params.id_user){
			return user_role.getByParams({id_user:id_user});
		}else{
			return user_role.getAll();
		}
	};
	/**
	 * Permission _ Role
	 */
	var permission_roles = function(params){
		if(params.id_user){
			return permission_role.getByParams({id_permission:id_permission});
		}else{
			return permission_role.getAll();
		}
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
		return auth.authorize(token,"admin").then(function(authorization){
			if(!authorization){
				//throw {error:Errors[3]};
			}
			return user.create(body).then(function(u){
				if(u.insertId){
					return {error:Errors[0]};
				}
				return {error:Errors[7]};
			});
		});
	};
	/**
	 * Crear Rol
	 */
	var create_role = function(token,body){
		return auth.authorize(token,"admin").then(function(authorization){
			if(!authorization){
				//throw {error:Errors[3]};
			}
			return role.create(body).then(function(u){
				if(u.insertId){
					return {error:Errors[0]};
				}
				return {error:Errors[7]};
			});
		});
	};
	/**
	 * Crear Permiso
	 */
	var create_permission = function(token,body){
		return auth.authorize(token,"admin").then(function(authorization){
			if(!authorization){
				//throw {error:Errors[3]};
			}
			return permission.create(body).then(function(u){
				if(u.insertId){
					return {error:Errors[0]};
				}
				return {error:Errors[7]};
			});
		});
	};
	/**
	 * Crear Usuario Role
	 */
	var bind_user_role = function(token,body){
		return auth.authorize(token,"admin").then(function(authorization){
			if(!authorization){
				//throw {error:Errors[3]};
			}
			return user_roles.create(body).then(function(u){
				//if(u.insertId){
					return {error:Errors[0]};
				//}
				//throw {error:Errors[7]};
			});
		});
	};

	/**
	 * Crear Usuario Role
	 */
	var bind_permission_role = function(token,body){
		return auth.authorize(token,"admin").then(function(authorization){
			if(!authorization){
				//throw {error:Errors[3]};
			}
			return permission_role.create(body).then(function(u){
				//if(u.insertId){
					return {error:Errors[0]};
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
	
	var params = [getMap, postMap, putMap, deleteMap];
	BaseController.apply(this, params);
	//---------------------------------------------------------------

	return this;
};

util.inherits(Configuration, BaseController);

module.exports = Configuration;