var BaseController = require('../utils/controller.js');
var util = require('util');
var utiles = require('../utils/utiles.js');
var Errors = require('../utils/errors.js');
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

	/**
	 * Returns a topic by @param id, or by @param topic parent or just get all.
	 */
	var get_topics = function(params){
		if(params.id){
			return topic.getByUid(params.id);
		}else if(params.topic){
			return topic.getByParams({id_parent:params.topic});
		}else{
			return topic.getAll();
		}
		
	};
	/**
	 * Returns all mesages, or a message by @param topic or by @param id
	 */
	var get_messages = function(params){
		if(params.id){
			return message.getByUid(params.id);
		}else if(params.topic){
			return message.getByParams({id_topic:params.topic});
		}else{
			return message.getAll();
		}
	};

	getMap.set("get_messages",get_messages);
	getMap.set("get_topics", get_topics);
	/**
	 * Creates a message in the topic @param id_topic
	 */
	var create_message = function(token,body,files){
		return auth.authorize(token,"platform").then(function(authorization){
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
		return auth.authorize(token,"platform").then(function(authorization){
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
	postMap.set("vote_message",vote_message);
	postMap.set("create_message",create_message);
	
	var params = [getMap, postMap, putMap, deleteMap];
	BaseController.apply(this, params);
	//---------------------------------------------------------------

	return this;
};

util.inherits(Forum, BaseController);

module.exports = Forum;