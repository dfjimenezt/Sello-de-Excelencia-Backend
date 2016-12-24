var BaseController = require('../utils/controller.js');
var util = require('util');
var utiles = require('../utils/utiles.js');
var Errors = require('../utils/errors.js');
var Permissions = require('../utils/permissions.js');
var auth_ctrl = require("./auth.js");

var topic_model = require("../models/topic.js");
var message_model = require("../models/message.js");
var message_media_model = require("../models/message_media.js");
var message_votes_model = require("../models/message_votes.js");
var Forum = function(){
	var auth = new auth_ctrl();
	var topic = new topic_model();
	var message = new message_model();
	var message_media = new message_media_model();
	var message_votes = new message_votes_model();
	//---------------------------------------------------------------
	var getMap = new Map(), postMap = new Map(), putMap = new Map(), deleteMap = new Map();

	/**
	 * Returns a topic by @param id, or by @param topic parent or just get all.
	 */
	var get_topics = function(token,params){
		if(params.id){
			return topic.getByUid(params.id);
		}else if(params.topic){
			return topic.getByParams({id_parent:params.topic});
		}else if(params.filter || params.limit || params.page || params.page){
				return topic.getFiltered({
					filter:params.filter,
					limit:params.limit,
					page:params.page,
					order:params.order,
					fields:["name"]});
			}else{
			return topic.getAll();
		}
		
	};
	/**
	 * Returns all mesages, or a message by @param topic or by @param id
	 */
	var get_messages = function(token,params){
		if(params.id){
			return message.getByUid(params.id);
		}else if(params.topic){
			return message.getByParams({id_topic:params.topic});
		}else if(params.filter || params.limit || params.page || params.page){
				return message.getFiltered({
					filter:params.filter,
					limit:params.limit,
					page:params.page,
					order:params.order,
					fields:["name"]});
			}else{
			return message.getAll();
		}
	};

	getMap.set("message",get_messages);
	getMap.set("topic", get_topics);
	/**
	 * Creates a message in the topic @param id_topic
	 */
	var create_message = function(token,body,files){
		return auth.authorize(token,Permissions.PLATFORM).then(function(authorization){
			return message.create({
				text:body.text,
				id_user:authorization.id,
				id_topic:body.id_topic
			}).then(function(m){
				if(m.insertId){
					if(files.length>0){
						//save files
						//then add files to message
					}
				}
			});
		});
	};

	/**
	 * Vote or De-vote a message
	 */
	var vote_message = function(token,body){
		return auth.authorize(token,Permissions.PLATFORM).then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			return message_votes.getByParams({id_message:body.id_message,id_user:body.id_user}).then(function(votes){
				if(votes.length === 0){
					return message_votes.create({
						id_message:body.id_message,id_user:body.id_user
					});
				}else{
					return message_votes.delete({
						id_message:body.id_message,id_user:body.id_user
					});
				}
			});
		});
	};
	/**
	 * Create a topic
	 */
	var create_topic = function(token,body){
		return auth.authorize(token,Permissions.PLATFORM).then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			return topic.create(body).then(function(t){
				if(t.insertId){
					return {error:Errors.NO_ERROR};
				}else{
					throw {error:Errors[4]};
				}
			});
		});
	};
	postMap.set("vote_message",vote_message);
	postMap.set("message",create_message);
	postMap.set("topic",create_topic);

	/**
	 * Updates an Topic
	 */
	var update_topic = function(token,body){
		return auth.authorize(token,"admin").then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			if(!body.id){
				throw {error:Errors.BAD_REQUEST.MALFORMED_REQUEST};
			}
			topic.update(body,{id:body.id});
		});
	};

	/**
	 * Updates an Message
	 */
	var update_message = function(token,body){
		return auth.authorize(token,"admin").then(function(authorization){
			if(!authorization){
				throw {error:Errors.AUTHORIZATION.NOT_AUTHORIZED};
			}
			if(!body.id){
				throw {error:Errors.BAD_REQUEST.MALFORMED_REQUEST};
			}
			message.update(body,{id:body.id});
		});
	};

	putMap.set("topic",update_topic);
	putMap.set("message",update_message);
	
	var params = [getMap, postMap, putMap, deleteMap];
	BaseController.apply(this, params);
	//---------------------------------------------------------------

	return this;
};

util.inherits(Forum, BaseController);

module.exports = Forum;