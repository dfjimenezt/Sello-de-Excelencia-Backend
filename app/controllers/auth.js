var BaseController = require('../utils/controller.js');
var util = require('util');
var utiles = require('../utils/utiles.js');
var Errors = require('../utils/errors.js');

var user = require('../models/user.js');
var user_role = require("../models/user_role.js");
var permission_role = require("../models/permission_role.js");
var session = require("../models/session.js");
var jwt = require('jsonwebtoken');
var config = require("../../config.json");

var Auth = function () {
	var user_model = new user();
	var user_role_model = new user_role();
	var permission_role_model = new permission_role();
	var session_model = new session();

	//---------------------------------------------------------------
	var getMap = new Map(), postMap = new Map(), putMap = new Map(), deleteMap = new Map();

	this.authorize = function(token,permission){
		return session_model.getByParams({token:token}).then(function(session){
			if(session.length !== 1){
				return false;
			}
			var now = new Date();
			if(now > session[0].valid_to){
				return false;
			}
			var user = jwt.decode(token,config.secret);
			for(var i in user.permissions){
				if(user.permissions[i] === permission){
					return user;
				}
			}
			return false;
		});
	};
	var login = function (token,body){
		return user_model.getUser(body.email).then(function(user){
			if(!user){//user doesnt exists
				throw {error:Errors.LOGIN.USER_NOT_EXISTS};
			}else{
				if(user.password === body.password){
					delete user.password;
					//encode
					var now = new Date();
					now.setDate(now.getDate()+15);
					var session = {
						token:jwt.sign(user,config.secret),
						id_user:user.id,
						expires:now
					};
					session_model.create(session);
					return {token:session.token};
				}else{
					throw {error:Errors.LOGIN.LOGIN_FAILED};
				}
			}
		});
	};
	var register = function(token,body){
		return user_model.getByParams({email:body.email}).then(function(user){
			if(user.length>0){//user exists then cant be registered again
				throw {error:Errors.LOGIN.USER_EXISTS};
			}else{//user doesnt exists will proceed to create one
				return user_model.create({
					name:body.name,
					lastname:body.lastname,
					email:body.email,
					phone:body.phone,
					active:false,
					verified:false,
					password:body.password,
					tmp_pwd:true,
					terms:body.terms === "true",
					newsletter:body.newsletter === "true"
				}).then(function(user){
					if(user){ // if the user was created sucessfully
						if(!body.role){
							body.role = "1";
						}
						user_role_model.create({ //create the role assignment
							id_user:user.insertId,
							id_role:parseInt(body.role)
						});
						user.role = body.role; // add the role manually reduce time
						return {error:Errors.NO_ERROR}; // return user
					}else{ //if there was an error on creating the user
						throw {error:Errors.DATABASE_ERROR};
					}
				});
			}
		});
	};

	var recover = function(token,body){
		return user_model.getByParams({email:body.email}).then(function(user){
			if(user.length === 0){ //if the user doesnt exists then send error
				return {error:Errors.LOGIN.USER_NOT_EXISTS};
			}else{ //send email and confirm
				//TODO: //send email and reset password
				return {error:Errors.NO_ERROR}; 
			}
		});
	};

	postMap.set("login", login);
	postMap.set("register", register);
	postMap.set("recover", recover);

	var params = [getMap, postMap, putMap, deleteMap];
	BaseController.apply(this, params);
	//---------------------------------------------------------------

	return this;
};

util.inherits(Auth, BaseController);

module.exports = Auth;