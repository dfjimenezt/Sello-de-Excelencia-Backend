/**  * CONTROLLER AUTO_GENERATED BY DMT-GENERATOR
 * service
 * DMT 2017
 * GENERATED: 13 / 7 / 2017 - 13:17:41
 **/
var BaseController = require('../utils/controller.js')
var util = require('util');
var utiles = require('../utils/utiles.js')
var Errors = require('../utils/errors.js')
var Permissions = require('../utils/permissions.js')
var Auth_ctrl = require('./auth.js')
var entity_service = require('../models/entity_service.js')
var category = require('../models/category.js')
var questiontopic = require('../models/questiontopic.js')
var entity_form = require('../models/entity_form.js')
var type = require('../models/type.js')
var question = require('../models/question.js')
var Service_status = require('../models/service_status.js')
var Institution_user = require('../models/institution_user.js')
var service_controller = function () {
	var model_entity_service = new entity_service()
	var model_category = new category()
	var model_questiontopic = new questiontopic()
	var model_entity_form = new entity_form()
	var model_type = new type()
	var model_question = new question()
    var service_status = new Service_status()
    var institution_user = new Institution_user()
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
	 * @api {get} api/service/service Request service information
	 * @apiName Getservice
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id service unique ID.
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
	 *		"id": 62,
	 *		"name": "This is an example text",
	 *		"url": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"id_user": 75,
	 *		"hash": "This is an example text",
	 *		"rate": 35,
	 *		"test_user": "This is an example text",
	 *		"test_password": "This is an example text",
	 *		"is_product": 1,
	 *		"is_service": 0,
	 *		"timestamp": "1969-05-20",
	 *		"roles": [
	 *			{
	 *				"id": 25,
	 *				"name": "This is an example text"
	 *			}
	 *		],
	 *		"category": {
	 *			"id": 79,
	 *			"name": "This is an example text"
	 *		},
	 *		"institution": {
	 *			"id": 47,
	 *			"name": "This is an example text",
	 *			"nit": "This is an example text",
	 *			"address": "This is an example text",
	 *			"website": "This is an example text",
	 *			"email": "This is an example text",
	 *			"second_email": "This is an example text",
	 *			"phone": "This is an example text",
	 *			"head_sector": 1,
	 *			"timestamp": "1969-05-20",
	 *			"designation_act": "This is an example text",
	 *			"legalrep_name": "This is an example text",
	 *			"legalrep_secondname": "This is an example text",
	 *			"legalrep_lastname": "This is an example text",
	 *			"legalrep_secondlastname": "This is an example text",
	 *			"leaglrep_document": "This is an example text",
	 *			"legalrep_typedoc": 100,
	 *			"legalrep_email": "This is an example text",
	 *			"flag_hall": 1,
	 *			"ranking_hall": 37,
	 *			"city": {
	 *				"id": 6,
	 *				"name": "This is an example text",
	 *				"code": "This is an example text",
	 *				"latitude": 3,
	 *				"longitude": 40,
	 *				"region": {
	 *					"id": 35,
	 *					"name": "This is an example text",
	 *					"id_capital": 38,
	 *					"code": "This is an example text"
	 *				}
	 *			},
	 *			"region": {
	 *				"id": 43,
	 *				"name": "This is an example text",
	 *				"id_capital": 94,
	 *				"code": "This is an example text"
	 *			},
	 *			"creator": {
	 *				"id": 36,
	 *				"picture": "This is an example text",
	 *				"name": "This is an example text",
	 *				"secondname": "This is an example text",
	 *				"lastname": "This is an example text",
	 *				"secondlastname": "This is an example text",
	 *				"email": "This is an example text",
	 *				"phone": "This is an example text",
	 *				"extension": "This is an example text",
	 *				"mobile": "This is an example text",
	 *				"active": 0,
	 *				"verified": 1,
	 *				"tmp_pwd": 0,
	 *				"flag_hall": 0,
	 *				"ranking_hall": 89,
	 *				"terms": 1,
	 *				"newsletter": 1,
	 *				"timestamp": "1969-05-20",
	 *				"id_type_document": 65,
	 *				"availability": {
	 *					"id": 41,
	 *					"name": "This is an example text"
	 *				},
	 *				"level": {
	 *					"id": 14,
	 *					"name": "This is an example text"
	 *				},
	 *				"city": {
	 *					"id": 89,
	 *					"name": "This is an example text",
	 *					"code": "This is an example text",
	 *					"latitude": 33,
	 *					"longitude": 35,
	 *					"region": {
	 *						"id": 81,
	 *						"name": "This is an example text",
	 *						"id_capital": 33,
	 *						"code": "This is an example text"
	 *					}
	 *				}
	 *			}
	 *		},
	 *		"history": [
	 *			{
	 *				"level": 0,
	 *				"valid_to": "1969-05-20",
	 *				"timestamp": "1969-05-20",
	 *				"status": {
	 *					"id": 52,
	 *					"name": "This is an example text"
	 *				}
	 *			}
	 *		],
	 *		"status": {
	 *			"id": 86,
	 *			"name": "This is an example text"
	 *		},
	 *		"comments": [
	 *			{
	 *				"id": 93,
	 *				"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *				"rate": 1,
	 *				"timestamp": "1969-05-20",
	 *				"user": {
	 *					"id": 85,
	 *					"picture": "This is an example text",
	 *					"name": "This is an example text",
	 *					"secondname": "This is an example text",
	 *					"lastname": "This is an example text",
	 *					"secondlastname": "This is an example text",
	 *					"email": "This is an example text",
	 *					"phone": "This is an example text",
	 *					"extension": "This is an example text",
	 *					"mobile": "This is an example text",
	 *					"active": 1,
	 *					"verified": 0,
	 *					"tmp_pwd": 1,
	 *					"flag_hall": 1,
	 *					"ranking_hall": 1,
	 *					"terms": 0,
	 *					"newsletter": 0,
	 *					"timestamp": "1969-05-20",
	 *					"id_type_document": 52,
	 *					"availability": {
	 *						"id": 66,
	 *						"name": "This is an example text"
	 *					},
	 *					"level": {
	 *						"id": 76,
	 *						"name": "This is an example text"
	 *					},
	 *					"city": {
	 *						"id": 47,
	 *						"name": "This is an example text",
	 *						"code": "This is an example text",
	 *						"latitude": 45,
	 *						"longitude": 10,
	 *						"region": {
	 *							"id": 63,
	 *							"name": "This is an example text",
	 *							"id_capital": 71,
	 *							"code": "This is an example text"
	 *						}
	 *					}
	 *				}
	 *			}
	 *		],
	 *		"requirements": [
	 *			{
	 *				"id": 62,
	 *				"name": "This is an example text",
	 *				"timestamp": "1969-05-20",
	 *				"category": {
	 *					"id": 54,
	 *					"name": "This is an example text"
	 *				},
	 *				"topic": {
	 *					"id": 98,
	 *					"name": "This is an example text"
	 *				}
	 *			}
	 *		]
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_entity_service = function (user, params) {
		return _get(model_entity_service,user,params)
	}

	/**
	 * @api {get} api/service/category Request category information
	 * @apiName Getcategory
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id category unique ID.
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
	 *		"id": 40,
	 *		"name": "This is an example text"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_category = function (user, params) {
		return _get(model_category,user,params)
	}
	/**
	 * @api {get} api/service/questiontopic Request questiontopic information
	 * @apiName Getquestiontopic
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id questiontopic unique ID.
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
	 *		"id": 2,
	 *		"name": "This is an example text"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_questiontopic = function (user, params) {
		return _get(model_questiontopic,user,params)
	}
	/**
	 * @api {get} api/service/form Request form information
	 * @apiName Getform
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id form unique ID.
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
	 *		"id": 80,
	 *		"name": "This is an example text",
	 *		"timestamp": "1969-05-20",
	 *		"category": {
	 *			"id": 62,
	 *			"name": "This is an example text"
	 *		},
	 *		"topic": {
	 *			"id": 12,
	 *			"name": "This is an example text"
	 *		},
	 *		"questions": [
	 *			{
	 *				"id": 28,
	 *				"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *				"id_type": 13,
	 *				"id_topic": 95
	 *			}
	 *		]
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_entity_form = function (user, params) {
		return _get(model_entity_form,user,params)
	}
	/**
	 * @api {get} api/service/type Request type information
	 * @apiName Gettype
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id type unique ID.
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
	 *		"id": 83,
	 *		"name": "This is an example text"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_type = function (user, params) {
		return _get(model_type,user,params)
	}
	/**
	 * @api {get} api/service/question Request question information
	 * @apiName Getquestion
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id question unique ID.
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
	 *		"id": 59,
	 *		"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"id_type": 94,
	 *		"id_topic": 64,
	 *		"id_form": 75
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_question = function (user, params) {
		return _get(model_question,user,params)
	}

//-----------------------------------------------------------------------------------------
	/**
	 * @api {get} api/service/service_category Request service information
	 * @apiName Getservice
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 */ 
	var get_entity_service_category = function (user, params) {
		return _get(model_entity_service,user,{filter_field: "id_category", filter_value: "1"})
	}

	/**
	 * @api {get} api/service/service_institution_name Request service information
	 * @apiName Getservice
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 */ 
	var get_entity_service_institution_name = function (user, params) {
		return _get(model_entity_service,user,{filter_field: "institution_name", filter_value: "Pepito"})
	}

	/**
	 * @api {get} api/service/service_name Request service information
	 * @apiName Getservice
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 */ 
	var get_entity_service_name = function (user, params) {
		return _get(model_entity_service,user,{filter_field: "institution_name", filter_value: "Pepito"})
	}
//-----------------------------------------------------------------------------------------
	getMap.set('service', { method: get_entity_service, permits: Permissions.NONE })
	getMap.set('category', { method: get_category, permits: Permissions.NONE })
	getMap.set('questiontopic', { method: get_questiontopic, permits: Permissions.NONE })
	getMap.set('form', { method: get_entity_form, permits: Permissions.NONE })
	getMap.set('type', { method: get_type, permits: Permissions.NONE })
	getMap.set('question', { method: get_question, permits: Permissions.NONE })
	getMap.set('service_category', { method: get_entity_service_category, permits: Permissions.NONE })
	getMap.set('service_institution_name', { method: get_entity_service_institution_name, permits: Permissions.NONE })
	getMap.set('service_name', { method: get_entity_service_name, permits: Permissions.NONE })
	/**
	 * @api {post} api/service/service Create service information
	 * @apiName Postservice
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Text} url 
	 * @apiParam {Number} id_institution 
	 * @apiParam {Number} id_user 
	 * @apiParam {String} hash 
	 * @apiParam {Number} rate 
	 * @apiParam {Number} id_category 
	 * @apiParam {String} test_user 
	 * @apiParam {String} test_password 
	 * @apiParam {Boolean} is_product 
	 * @apiParam {Boolean} is_service 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Number} current_status 
	 * @apiParam {Array} roles 
	 * @apiParam {Object} category 
	 * @apiParam {Object} institution 
	 * @apiParam {Array} history 
	 * @apiParam {Object} status 
	 * @apiParam {Array} comments 
	 * @apiParam {Array} requirements 
 	 * 
	 */
	var create_entity_service = function (user, body) {
        return institution_user.getByUid(user.id).then((user_institution) => {
            body.id_user = user_institution[0].id_user
            body.id_institution = user_institution[0].id_institution
            body.current_status = 1
	        return model_entity_service.create(body).then((service) => {
                return service_status.create({
                    id_service: service.data.id,
                    id_status: 1
                })
            })
        })
	}
	/**
	 * @api {post} api/service/category Create category information
	 * @apiName Postcategory
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
 	 * 
	 */
	var create_category = function (user, body) {
		return model_category.create(body)
	}
	/**
	 * @api {post} api/service/questiontopic Create questiontopic information
	 * @apiName Postquestiontopic
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
 	 * 
	 */
	var create_questiontopic = function (user, body) {
		return model_questiontopic.create(body)
	}
	/**
	 * @api {post} api/service/form Create form information
	 * @apiName Postform
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Number} id_category 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Object} category 
	 * @apiParam {Object} topic 
	 * @apiParam {Array} questions 
 	 * 
	 */
	var create_entity_form = function (user, body) {
		return model_entity_form.create(body)
	}
	/**
	 * @api {post} api/service/type Create type information
	 * @apiName Posttype
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
 	 * 
	 */
	var create_type = function (user, body) {
		return model_type.create(body)
	}
	/**
	 * @api {post} api/service/question Create question information
	 * @apiName Postquestion
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Text} text 
	 * @apiParam {Number} id_type 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Number} id_form 
 	 * 
	 */
	var create_question = function (user, body) {
		return model_question.create(body)
	}


    var save_entity_service_evidence = function (user, body, files) {
        return files
        //return mediaModel.uploadFile(files.image, user.id, '1', null).then(result => {
            //console.log(result)
            //return userModel.update(params, { id: body.id })
        //})
    }

	postMap.set('service', { method: create_entity_service, permits: Permissions.ENTITY_SERVICE })
	postMap.set('save_evidence', { method: save_entity_service_evidence, permits: Permissions.ENTITY_SERVICE })
	postMap.set('category', { method: create_category, permits: Permissions.ADMIN })
	postMap.set('questiontopic', { method: create_questiontopic, permits: Permissions.ADMIN })
	postMap.set('form', { method: create_entity_form, permits: Permissions.ADMIN })
	postMap.set('type', { method: create_type, permits: Permissions.ADMIN })
	postMap.set('question', { method: create_question, permits: Permissions.ADMIN })
	/**
	 * @api {put} api/service/service Update service information
	 * @apiName Putservice
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Text} url 
	 * @apiParam {Number} id_institution 
	 * @apiParam {Number} id_user 
	 * @apiParam {String} hash 
	 * @apiParam {Number} rate 
	 * @apiParam {Number} id_category 
	 * @apiParam {String} test_user 
	 * @apiParam {String} test_password 
	 * @apiParam {Boolean} is_product 
	 * @apiParam {Boolean} is_service 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Number} current_status 
	 * @apiParam {Array} roles 
	 * @apiParam {Object} category 
	 * @apiParam {Object} institution 
	 * @apiParam {Array} history 
	 * @apiParam {Object} status 
	 * @apiParam {Array} comments 
	 * @apiParam {Array} requirements 
 	 * 
	 */
	var update_entity_service = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_service.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/service/category Update category information
	 * @apiName Putcategory
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
 	 * 
	 */
	var update_category = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_category.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/service/questiontopic Update questiontopic information
	 * @apiName Putquestiontopic
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
 	 * 
	 */
	var update_questiontopic = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_questiontopic.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/service/form Update form information
	 * @apiName Putform
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Number} id_category 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Object} category 
	 * @apiParam {Object} topic 
	 * @apiParam {Array} questions 
 	 * 
	 */
	var update_entity_form = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_form.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/service/type Update type information
	 * @apiName Puttype
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
 	 * 
	 */
	var update_type = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_type.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/service/question Update question information
	 * @apiName Putquestion
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Text} text 
	 * @apiParam {Number} id_type 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Number} id_form 
 	 * 
	 */
	var update_question = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_question.update(body,{id:body.id})
	}
	putMap.set('service', { method: update_entity_service, permits: Permissions.ADMIN })
	putMap.set('category', { method: update_category, permits: Permissions.ADMIN })
	putMap.set('questiontopic', { method: update_questiontopic, permits: Permissions.ADMIN })
	putMap.set('form', { method: update_entity_form, permits: Permissions.ADMIN })
	putMap.set('type', { method: update_type, permits: Permissions.ADMIN })
	putMap.set('question', { method: update_question, permits: Permissions.ADMIN })
	/**
	 * @api {delete} api/service/service Delete service information
	 * @apiName Deleteservice
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Text} url 
	 * @apiParam {Number} id_institution 
	 * @apiParam {Number} id_user 
	 * @apiParam {String} hash 
	 * @apiParam {Number} rate 
	 * @apiParam {Number} id_category 
	 * @apiParam {String} test_user 
	 * @apiParam {String} test_password 
	 * @apiParam {Boolean} is_product 
	 * @apiParam {Boolean} is_service 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Number} current_status 
	 * @apiParam {Array} roles 
	 * @apiParam {Object} category 
	 * @apiParam {Object} institution 
	 * @apiParam {Array} history 
	 * @apiParam {Object} status 
	 * @apiParam {Array} comments 
	 * @apiParam {Array} requirements 
 	 * 
	 */
	var delete_entity_service = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_service.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/service/category Delete category information
	 * @apiName Deletecategory
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
 	 * 
	 */
	var delete_category = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_category.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/service/questiontopic Delete questiontopic information
	 * @apiName Deletequestiontopic
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
 	 * 
	 */
	var delete_questiontopic = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_questiontopic.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/service/form Delete form information
	 * @apiName Deleteform
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Number} id_category 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Object} category 
	 * @apiParam {Object} topic 
	 * @apiParam {Array} questions 
 	 * 
	 */
	var delete_entity_form = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_form.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/service/type Delete type information
	 * @apiName Deletetype
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
 	 * 
	 */
	var delete_type = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_type.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/service/question Delete question information
	 * @apiName Deletequestion
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Text} text 
	 * @apiParam {Number} id_type 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Number} id_form 
 	 * 
	 */
	var delete_question = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_question.delete(body,{id:body.id})
	}
	deleteMap.set('service', { method: delete_entity_service, permits: Permissions.ADMIN })
	deleteMap.set('category', { method: delete_category, permits: Permissions.ADMIN })
	deleteMap.set('questiontopic', { method: delete_questiontopic, permits: Permissions.ADMIN })
	deleteMap.set('form', { method: delete_entity_form, permits: Permissions.ADMIN })
	deleteMap.set('type', { method: delete_type, permits: Permissions.ADMIN })
	deleteMap.set('question', { method: delete_question, permits: Permissions.ADMIN })
	var params = [getMap, postMap, putMap, deleteMap]
	BaseController.apply(this, params)
	//---------------------------------------------------------------
	return this;
}
util.inherits(service_controller, BaseController)
module.exports = service_controller
