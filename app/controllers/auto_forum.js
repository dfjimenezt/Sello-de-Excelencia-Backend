/**  * CONTROLLER AUTO_GENERATED BY DMT-GENERATOR
 * forum
 * DMT 2017
 * GENERATED: 13 / 8 / 2017 - 19:53:2
 **/
var BaseController = require('../utils/controller.js')
var util = require('util');
var utiles = require('../utils/utiles.js')
var Errors = require('../utils/errors.js')
var Permissions = require('../utils/permissions.js')
var Auth_ctrl = require('./auth.js')
var topic = require('../models/topic.js')
var message = require('../models/message.js')
var forum_controller = function () {
	var model_topic = new topic()
	var model_message = new message()
	//---------------------------------------------------------------
	var getMap = new Map(), postMap = new Map(), putMap = new Map(), deleteMap = new Map()
	var _get = function(model,user,params){
		let key = model.getPrimaryKey()
		if (params.filter_field) {
			if (typeof params.filter_field == 'string') {
				params.filter_field = [params.filter_field]
				params.filter_value = [params.filter_value]
			}
		} else {
			params.filter_field = []
			params.filter_value = []
		}
		if (params[key]) {
			params.filter_field.push(key)
			params.filter_value.push(params[key])
		}
		return model.getAll({
			filter: params.filter,
			limit: params.limit,
			page: params.page,
			order: params.order,
			filter_fields: params.filter_field,
			filter_values: params.filter_value,
			fields: params.field,
			lang: params.lang
		})
	}
	/**
	 * @api {get} api/forum/topic Request topic information
	 * @apiName Gettopic
	 * @apiGroup forum
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id topic unique ID.
	 * @apiParam {String} filter Texto to search into DB.
	 * @apiParam {Array} fields Fields where the search have to be fetched.
	 * @apiParam {Number} limit number of items per page.
	 * @apiParam {Number} page number of the page to be fetched.
	 * @apiParam {Number} field to order the results.
	 * @apiParam {Array} filter_field used with filter_value to make specific filters into the data.
	 * @apiParam {Array} filter_value used with filter_field to make specific filters into the data.
	 * @apiParam {String} lang id of the language to get content if available.
	 * 
	 * @apiSuccessExample Success-Response:
	 * HTTP/1.1 200 OK
	 * {
	 * 	data:{
	 *		"id": 76,
	 *		"name": "This is an example text",
	 *		"id_parent": 49,
	 *		"private": 1,
	 *		"timestamp": "1969-05-20"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_topic = function (user, params) {
		return _get(model_topic,user,params)
	}
	/**
	 * @api {get} api/forum/message Request message information
	 * @apiName Getmessage
	 * @apiGroup forum
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id message unique ID.
	 * @apiParam {String} filter Texto to search into DB.
	 * @apiParam {Array} fields Fields where the search have to be fetched.
	 * @apiParam {Number} limit number of items per page.
	 * @apiParam {Number} page number of the page to be fetched.
	 * @apiParam {Number} field to order the results.
	 * @apiParam {Array} filter_field used with filter_value to make specific filters into the data.
	 * @apiParam {Array} filter_value used with filter_field to make specific filters into the data.
	 * @apiParam {String} lang id of the language to get content if available.
	 * 
	 * @apiSuccessExample Success-Response:
	 * HTTP/1.1 200 OK
	 * {
	 * 	data:{
	 *		"id": 67,
	 *		"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"url": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"id_topic": 85,
	 *		"id_user": 9,
	 *		"timestamp": "1969-05-20"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_message = function (user, params) {
		return _get(model_message,user,params)
	}
	getMap.set('topic', { method: get_topic, permits: Permissions.NONE })
	getMap.set('message', { method: get_message, permits: Permissions.NONE })
	/**
	 * @api {post} api/forum/topic Create topic information
	 * @apiName Posttopic
	 * @apiGroup forum
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Number} id_parent 
	 * @apiParam {Boolean} private 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var create_topic = function (user, body) {
		return model_topic.create(body)
	}
	/**
	 * @api {post} api/forum/message Create message information
	 * @apiName Postmessage
	 * @apiGroup forum
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Text} text 
	 * @apiParam {Text} url 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Number} id_user 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var create_message = function (user, body) {
		return model_message.create(body)
	}
	postMap.set('topic', { method: create_topic, permits: Permissions.ADMIN })
	postMap.set('message', { method: create_message, permits: Permissions.ADMIN })
	/**
	 * @api {put} api/forum/topic Update topic information
	 * @apiName Puttopic
	 * @apiGroup forum
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Number} id_parent 
	 * @apiParam {Boolean} private 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var update_topic = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_topic.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/forum/message Update message information
	 * @apiName Putmessage
	 * @apiGroup forum
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Text} text 
	 * @apiParam {Text} url 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Number} id_user 
	 * @apiParam {Date} timestamp 
 	 * 
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
	 * @api {delete} api/forum/topic Delete topic information
	 * @apiName Deletetopic
	 * @apiGroup forum
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Number} id_parent 
	 * @apiParam {Boolean} private 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var delete_topic = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_topic.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/forum/message Delete message information
	 * @apiName Deletemessage
	 * @apiGroup forum
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Text} text 
	 * @apiParam {Text} url 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Number} id_user 
	 * @apiParam {Date} timestamp 
 	 * 
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
	return this;
}
util.inherits(forum_controller, BaseController)
module.exports = forum_controller
