var BaseController = require('../utils/controller.js');
var util = require('util');
var utiles = require('../utils/utiles.js');

var user = require('../models/user.js');
var user_role = require("../models/user_role.js");
var permission_role = require("../models/permission_role.js");
var jwt = require('jsonwebtoken');
var config = require("../../config.json");

var Auth = function () {
	var user_model = new user();
	var user_role_model = new user_role();
	var permission_role_model = new permission_role();

	//---------------------------------------------------------------
	var getMap = new Map(), postMap = new Map(), putMap = new Map(), deleteMap = new Map();

	var login = function (body){
		return user_model.getUser({email:body.email}).then(function(user){
			if(!user){//user doesnt exists
				throw {error:Errors[12]}
			}else{
				if(user.password == body.password){
					delete user.password;
					//encode
					return jwt.sign(user,config.secret);
				}
			}
		});
	}
	var register = function(body){
		return user_model.getByParams({email:body.email}).then(function(user){
			if(user){//user exists then cant be registered again
				throw {error:Errors[11]};
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
					terms:body.terms,
					newsletter:body.newsletter
				}).then(function(user){
					if(user){ // if the user was created sucessfully
						user_role_model.create({ //create the role assignment
							id_user:user.id,
							id_role:body.role
						});
						user.role = body.role; // add the role manually reduce time
						return user; // return user
					}else{ //if there was an error on creating the user
						throw {error:Errors[7]};
					}
				})
			}
		})
	}

	var recover = function(body){
		user_model.getByParams({email:body.email}).then(function(user){
			if(!user){ //if the user doesnt exists then send error
				return {error:Errors[12]};
			}else{ //send email and confirm
				//TODO: //send email and reset password
				return {error:Errors[0]}; 
			}
		})
	}

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