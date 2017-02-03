/**  * CONTROLLER AUTO_GENERATED BY DMT-GENERATOR
 * Foro
 * DMT 2017
 * GENERATED: 2 / 2 / 2017 - 21:20:22
 **/
var BaseController = require('../utils/controller.js')
var util = require('util')
var utiles = require('../utils/utiles.js')
var Errors = require('../utils/errors.js')
var Permissions = require('../utils/permissions.js')
var Auth_ctrl = require('./auth.js')
var topic = require('../models/topic.js')
var message = require('../models/message.js')
var Foro = function () {
	var model_topic = new topic()
	var model_message = new message()
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
	 * topic
	*/
	var get_topic = function (user, params) {
		return _get(model_topic,user,params)
	}
	/**
	 * message
	*/
	var get_message = function (user, params) {
		return _get(model_message,user,params)
	}
	getMap.set('topic', { method: get_topic, permits: Permissions.ADMIN })
	getMap.set('message', { method: get_message, permits: Permissions.ADMIN })
	/**
	 * topic
	*/
	var create_topic = function (user, body) {
		return model_topic.create(body)
	}
	/**
	 * message
	*/
	var create_message = function (user, body) {
		return model_message.create(body)
	}
	postMap.set('topic', { method: create_topic, permits: Permissions.ADMIN })
	postMap.set('message', { method: create_message, permits: Permissions.ADMIN })
	/**
	 * topic
	*/
	var update_topic = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_topic.update(body,{id:body.id})
	}
	/**
	 * message
	*/
	var update_message = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_message.update(body,{id:body.id})
	}
	putMap.set('topic', { method: update_topic, permits: Permissions.ADMIN })
	putMap.set('message', { method: update_message, permits: Permissions.ADMIN })
	/**
	 * topic
	*/
	var delete_topic = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_topic.delete(body,{id:body.id})
	}
	/**
	 * message
	*/
	var delete_message = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_message.delete(body,{id:body.id})
	}
	deleteMap.set('topic', { method: delete_topic, permits: Permissions.ADMIN })
	deleteMap.set('message', { method: delete_message, permits: Permissions.ADMIN })
	var params = [getMap, postMap, putMap, deleteMap]
	BaseController.apply(this, params)
	//---------------------------------------------------------------
	return this
}
util.inherits(Foro, BaseController)
module.exports = Foro