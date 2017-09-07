/**  * CONTROLLER AUTO_GENERATED BY DMT-GENERATOR
 * forum
 * DMT 2017
 * GENERATED: 5 / 9 / 2017 - 7:39:27
 **/
var BaseController = require('../utils/controller.js')
var util = require('util');
var utiles = require('../utils/utiles.js')
var Errors = require('../utils/errors.js')
var Permissions = require('../utils/permissions.js')
var Auth_ctrl = require('./auth.js')
var entity_hangouts = require('../models/entity_hangouts.js')
var forum_controller = function () {
	var model_entity_hangouts = new entity_hangouts()
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
	 * @api {get} api/forum/hangouts Request hangouts information
	 * @apiName Gethangouts
	 * @apiGroup forum
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id hangouts unique ID.
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
	 *		"id": 77,
	 *		"title": "This is an example text",
	 *		"url": "This is an example text",
	 *		"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"id_role": 1,
	 *		"activation_date": "1969-05-20"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_entity_hangouts = function (user, params) {
		return _get(model_entity_hangouts,user,params)
	}
	getMap.set('hangouts', { method: get_entity_hangouts, permits: Permissions.NONE })
	/**
	 * @api {post} api/forum/hangouts Create hangouts information
	 * @apiName Posthangouts
	 * @apiGroup forum
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} title 
	 * @apiParam {String} url 
	 * @apiParam {Text} description 
	 * @apiParam {Boolean} id_role 
	 * @apiParam {Date} activation_date 
 	 * 
	 */
	var create_entity_hangouts = function (user, body) {
		return model_entity_hangouts.create(body)
	}
	postMap.set('hangouts', { method: create_entity_hangouts, permits: Permissions.ADMIN_HANGOUTS })
	/**
	 * @api {put} api/forum/hangouts Update hangouts information
	 * @apiName Puthangouts
	 * @apiGroup forum
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} title 
	 * @apiParam {String} url 
	 * @apiParam {Text} description 
	 * @apiParam {Boolean} id_role 
	 * @apiParam {Date} activation_date 
 	 * 
	 */
	var update_entity_hangouts = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_hangouts.update(body,{id:body.id})
	}
	putMap.set('hangouts', { method: update_entity_hangouts, permits: Permissions.ADMIN_HANGOUTS })
	/**
	 * @api {delete} api/forum/hangouts Delete hangouts information
	 * @apiName Deletehangouts
	 * @apiGroup forum
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} title 
	 * @apiParam {String} url 
	 * @apiParam {Text} description 
	 * @apiParam {Boolean} id_role 
	 * @apiParam {Date} activation_date 
 	 * 
	 */
	var delete_entity_hangouts = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_hangouts.delete(body,{id:body.id})
	}
	deleteMap.set('hangouts', { method: delete_entity_hangouts, permits: Permissions.ADMIN_HANGOUTS })
	var params = [getMap, postMap, putMap, deleteMap]
	BaseController.apply(this, params)
	//---------------------------------------------------------------
	return this;
}
util.inherits(forum_controller, BaseController)
module.exports = forum_controller