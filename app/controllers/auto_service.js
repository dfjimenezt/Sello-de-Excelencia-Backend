/**  * CONTROLLER AUTO_GENERATED BY DMT-GENERATOR
 * service
 * DMT 2017
 * GENERATED: 5 / 8 / 2017 - 14:44:43
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
var Service_comment = require('../models/service_comment.js')
var Media = require('../models/media.js')
var Institution = require('../models/institution.js')
var user_answer = require('../models/user_answer.js')
var service_controller = function () {
	var model_entity_service = new entity_service()
	var model_category = new category()
	var model_questiontopic = new questiontopic()
	var model_entity_form = new entity_form()
	var model_type = new type()
	var model_question = new question()
	var model_service_comment = new Service_comment()
	var service_status = new Service_status()
	var institution_user = new Institution_user()
	var model_media = new Media()
	var model_institution = new Institution()
	var model_user_answer = new user_answer()
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
	 *		"id": 4,
	 *		"name": "This is an example text",
	 *		"url": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"id_level": 69,
	 *		"id_user": 85,
	 *		"hash": "This is an example text",
	 *		"rate": 48,
	 *		"test_user": "This is an example text",
	 *		"test_password": "This is an example text",
	 *		"is_product": 0,
	 *		"is_service": 1,
	 *		"timestamp": "1969-05-20",
	 *		"roles": [
	 *			{
	 *				"id": 40,
	 *				"name": "This is an example text"
	 *			}
	 *		],
	 *		"category": {
	 *			"id": 5,
	 *			"name": "This is an example text"
	 *		},
	 *		"institution": {
	 *			"id": 70,
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
	 *			"legalrep_typedoc": 63,
	 *			"legalrep_email": "This is an example text",
	 *			"flag_hall": 0,
	 *			"ranking_hall": 46,
	 *			"city": {
	 *				"id": 90,
	 *				"name": "This is an example text",
	 *				"code": "This is an example text",
	 *				"latitude": 46,
	 *				"longitude": 42,
	 *				"region": {
	 *					"id": 91,
	 *					"name": "This is an example text",
	 *					"id_capital": 93,
	 *					"code": "This is an example text"
	 *				}
	 *			},
	 *			"region": {
	 *				"id": 37,
	 *				"name": "This is an example text",
	 *				"id_capital": 43,
	 *				"code": "This is an example text"
	 *			},
	 *			"creator": {
	 *				"id": 59,
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
	 *				"flag_hall": 1,
	 *				"ranking_hall": 20,
	 *				"terms": 0,
	 *				"newsletter": 0,
	 *				"timestamp": "1969-05-20",
	 *				"points": 63,
	 *				"document": "This is an example text",
	 *				"education_level": "This is an example text",
	 *				"ocupation": "This is an example text",
	 *				"organization": "This is an example text",
	 *				"availability": {
	 *					"id": 11,
	 *					"name": "This is an example text"
	 *				},
	 *				"level": {
	 *					"id": 54,
	 *					"name": "This is an example text"
	 *				},
	 *				"city": {
	 *					"id": 82,
	 *					"name": "This is an example text",
	 *					"code": "This is an example text",
	 *					"latitude": 51,
	 *					"longitude": 93,
	 *					"region": {
	 *						"id": 95,
	 *						"name": "This is an example text",
	 *						"id_capital": 56,
	 *						"code": "This is an example text"
	 *					}
	 *				},
	 *				"type_document": {
	 *					"id": 78,
	 *					"name": "This is an example text"
	 *				}
	 *			}
	 *		},
	 *		"history": [
	 *			{
	 *				"valid_to": "1969-05-20",
	 *				"timestamp": "1969-05-20",
	 *				"status": {
	 *					"id": 25,
	 *					"name": "This is an example text"
	 *				}
	 *			}
	 *		],
	 *		"status": {
	 *			"id": 70,
	 *			"name": "This is an example text"
	 *		},
	 *		"comments": [
	 *			{
	 *				"id": 2,
	 *				"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *				"rate": 0,
	 *				"timestamp": "1969-05-20",
	 *				"user": {
	 *					"id": 26,
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
	 *					"verified": 1,
	 *					"tmp_pwd": 0,
	 *					"flag_hall": 0,
	 *					"ranking_hall": 31,
	 *					"terms": 1,
	 *					"newsletter": 0,
	 *					"timestamp": "1969-05-20",
	 *					"points": 11,
	 *					"document": "This is an example text",
	 *					"education_level": "This is an example text",
	 *					"ocupation": "This is an example text",
	 *					"organization": "This is an example text",
	 *					"availability": {
	 *						"id": 29,
	 *						"name": "This is an example text"
	 *					},
	 *					"level": {
	 *						"id": 21,
	 *						"name": "This is an example text"
	 *					},
	 *					"city": {
	 *						"id": 60,
	 *						"name": "This is an example text",
	 *						"code": "This is an example text",
	 *						"latitude": 30,
	 *						"longitude": 10,
	 *						"region": {
	 *							"id": 65,
	 *							"name": "This is an example text",
	 *							"id_capital": 73,
	 *							"code": "This is an example text"
	 *						}
	 *					},
	 *					"type_document": {
	 *						"id": 45,
	 *						"name": "This is an example text"
	 *					}
	 *				}
	 *			}
	 *		],
	 *		"requirements": [
	 *			{
	 *				"id": 44,
	 *				"name": "This is an example text",
	 *				"timestamp": "1969-05-20",
	 *				"category": {
	 *					"id": 8,
	 *					"name": "This is an example text"
	 *				},
	 *				"topic": {
	 *					"id": 12,
	 *					"name": "This is an example text",
	 *					"id_category": 9
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
	 *		"id": 22,
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
	 *		"id": 91,
	 *		"name": "This is an example text",
	 *		"id_category": 13
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
	 *		"id": 89,
	 *		"name": "This is an example text",
	 *		"timestamp": "1969-05-20",
	 *		"category": {
	 *			"id": 65,
	 *			"name": "This is an example text"
	 *		},
	 *		"topic": {
	 *			"id": 38,
	 *			"name": "This is an example text",
	 *			"id_category": 56
	 *		},
	 *		"questions": [
	 *			{
	 *				"id": 89,
	 *				"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *				"id_type": 55,
	 *				"id_topic": 60
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
	 *		"id": 9,
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
	 *		"id": 53,
	 *		"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"id_type": 82,
	 *		"id_topic": 83,
	 *		"id_form": 64
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
		return _get(model_entity_service, user, { filter_field: "id_category", filter_value: "1" })
	}

	/**
	 * @api {get} api/service/service_institution_name Request service information
	 * @apiName Getservice
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 */
	var get_entity_service_institution_name = function (user, params) {
		return _get(model_entity_service, user, { filter_field: "institution_name", filter_value: "Pepito" })
	}

	/**
	 * @api {get} api/service/service_name Request service information
	 * @apiName Getservice
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 */
	var get_entity_service_name = function (user, params) {
		return _get(model_entity_service, user, { filter_field: "institution_name", filter_value: "Pepito" })
	}

	var get_filtered_list_institutions = function (user, params) {
	//id_category=1&name=entidad1&service_name=Rut&date0=2010-01-01&date1=2010-01-01
		// TODO: Only certified services must be displayed
		var query = `SELECT stamp.institution.name AS name, stamp.service.name AS service_name, stamp.service.url AS url, stamp.service.timestamp as publication_date
FROM stamp.institution JOIN stamp.service ON stamp.institution.id = stamp.service.id_institution\nWHERE `
		// Add category filter
		// TODO: Verify or inform the order of the tabs ids in the mokup
		switch(params.id_category) {
			case '1': // Tramites o servicios en linea
				query += 'stamp.service.id_category = 3\n'
				break
			case '2':
				query += 'stamp.service.id_category = 1\n'
				break
			case '3':
				query += 'stamp.service.id_category = 2\n'
				break
			case '4':
				query += 'stamp.service.id_category = 4\n'
				break
			default:
				// TODO: ERROR MESSAGE
				break
		}
		// Insert filter institution name to query
		if (params.name)
			query += 'AND stamp.institution.name LIKE \"%'+params.name+'%\"\n'
		// Insert filter service name to query
		if (params.service_name)
			query += 'AND stamp.service.name LIKE \"%'+params.service_name+'%\"\n'
		// Insert filter name to query
		if (params.date0) {
			var date0 = params.date0.split("-")
			var date0_0 = new Date(parseInt(date0[0]), parseInt(date0[1])-1, parseInt(date0[2])-3) // Month starts from 0
			date0_0 = date0_0.toISOString().slice(0,10)
			var date0_1 = new Date(parseInt(date0[0]), parseInt(date0[1])-1, parseInt(date0[2])+3) // One week interval 6 days
			date0_1 = date0_1.toISOString().slice(0,10)
			query += 'AND stamp.service.timestamp >= \"'+date0_0+'\" AND stamp.service.timestamp < \"'+date0_1+'\"\n'
		}
		/*
		// Insert filter name to query
		// TODO: Find aprobation date table
		if (params.date1) {
			var date1 = parseInt(params.date0.split("-"))
			var date1_0 = new Date(date1[0], date1[1]-1, date1[2]-3) // Month starts from 0
			date1_0.toISOString().substring(0, 10);
			var date1_1 = new Date(date1[0], date1[1]-1, date1[2]+3) // One week interval 6 days
			date1_1.toISOString().substring(0, 10);
			query += 'AND stamp.service.timestamp >= '+date1_0.getTime+' AND stamp.service.timestamp < '+date1_1.getTime+'\n'
		}
		*/
		/*                                                      
		// TODO: Only certified services must be display
		query += 'AND stamp.service.current_status = 6;'
		*/ 
		query += ';'
		return model_institution.customQuery(query)
	}

	var get_filtered_list_institutions_csv = function (user, params) {
		return get_filtered_list_institutions(user, params).then((filtered_list) => {
			return utiles.JSONToCSVConvertor(filtered_list, "Entidades Certificadas", true);
		})
	}

	var list_by_status = function (user, params) {
		var query = `
SELECT stamp.service.name, stamp.category.name as category, stamp.service.level, stamp.service.timestamp
FROM stamp.user JOIN stamp.institution_user ON stamp.institution_user.id_user = stamp.user.id
RIGHT JOIN stamp.service ON stamp.service.id_institution = stamp.institution_user.id_institution
RIGHT JOIN stamp.category ON stamp.service.id_category = stamp.category.id
WHERE stamp.user.id = ${user.id} AND stamp.service.current_status = ${params.id_status};`
		return model_institution.customQuery(query)
	}

	var get_service_info = function (user, params) {
		var query = `
SELECT stamp.service.name AS name_service, 
stamp.category.name AS name_category, 
stamp.service.id_level AS level,
stamp.service.timestamp AS date_postulation, 
stamp.service_status.timestamp AS date_certified,
stamp.service.url AS url, 
stamp.service_status.id_status AS status, 
stamp.service.rate AS rate
FROM stamp.service 
JOIN stamp.service_status ON stamp.service_status.id_service = stamp.service.id
JOIN stamp.category ON stamp.service.id_category = stamp.category.id
WHERE stamp.service.id = ${params.id_service}
;`
		return model_institution.customQuery(query);
	}

	var get_service_comments = function (user, params) {
		var query = `
SELECT stamp.user.name AS name_user,
stamp.service_comment.timestamp AS date,
stamp.service_comment.text AS text
FROM stamp.service
JOIN stamp.service_comment ON stamp.service_comment.id_service = stamp.service.id
JOIN stamp.user ON stamp.user.id = stamp.service_comment.id_user
WHERE stamp.service_comment.id_service = ${params.id_service}
;`
		return model_institution.customQuery(query);
	}

	var get_service_process = function (user, params) {
		var block = []
		var query1 = `
SELECT stamp.service.name AS name_service,
stamp.category.name AS name_category,
stamp.service_status.level AS level,
stamp.service.timestamp AS date_postulation,
stamp.service.url AS url,
stamp.service_status.id_status AS status
FROM stamp.service
JOIN stamp.service_status on stamp.service_status.id_service = stamp.service.id
JOIN stamp.category ON stamp.service.id_category = stamp.category.id
WHERE stamp.service.id_service = ${params.id_service};`
		block[0] = model_institution.customQuery(query1)
		var query2 = `
 `
	}

	/* Se listará los servicios elegibles a evaluar, finalmente, solo deben ser mostradas
	 * aquellas en las cuales el evaluador es apto.
	 *
	 * token -> solo se mostrará aquellos en los cuales el usuario es apto para evaluar
	 * params -> serán los parámetros con los cuales se harán los filtros.
	 * params
	 * 	name_entity
	 * 	region	(place)
	 * 	category	(categoría del servicio)
	 * 	level	(nivel del servicio)
	 */

	var get_filtered_list_services_for_select = function(token, params){
		var query = `SELECT DISTINCT ser.name, ins.name as institution, ser.id_category, ser.timestamp
FROM stamp.service ser
RIGHT JOIN stamp.institution ins ON ser.id_institution = ins.id
RIGHT JOIN stamp.region reg ON ins.id_region = reg.id `
		if (params.name_institution || params.id_region || params.id_category || params.id_level){
			// Un servicio postulado es status 3, status 1, es cuando hasta ahora se está postulando
			query += "WHERE ser.current_status = 3 "
			if (params.name_institution != undefined ){
				query += `AND ins.name LIKE "%${params.name_institution}%" `
			}
			if (params.id_region != undefined ){
				query += "AND reg.id = "+parseInt(params.id_region)+" "
			}
			if (params.id_category != undefined ){
				query += "AND ser.id_category = "+parseInt(params.id_category)+" "
			}
			if (params.id_level != undefined ){
				query += "AND ser.id_level = "+parseInt(params.id_level)+" "
			}
		}
		query += ";"
		return model_entity_service.customQuery(query)
	}

	getMap.set('service', { method: get_entity_service, permits: Permissions.NONE })
	getMap.set('category', { method: get_category, permits: Permissions.NONE })
	getMap.set('questiontopic', { method: get_questiontopic, permits: Permissions.NONE })
	getMap.set('form', { method: get_entity_form, permits: Permissions.NONE })
	getMap.set('type', { method: get_type, permits: Permissions.NONE })
	getMap.set('question', { method: get_question, permits: Permissions.NONE })
	getMap.set('service_category', { method: get_entity_service_category, permits: Permissions.NONE })
	getMap.set('service_institution_name', { method: get_entity_service_institution_name, permits: Permissions.NONE })
	getMap.set('service_name', { method: get_entity_service_name, permits: Permissions.NONE })
	getMap.set('list_institutions', { method: get_filtered_list_institutions, permits: Permissions.NONE })
	getMap.set('table_institutions', { method: get_filtered_list_institutions_csv, permits: Permissions.NONE })
	getMap.set('list_by_status', { method: list_by_status, permits: Permissions.ENTITY_SERVICE })
	getMap.set('service_info', { method: get_service_info, permits: Permissions.ENTITY_SERVICE })
	getMap.set('service_comments', { method: get_service_comments, permits: Permissions.ENTITY_SERVICE })
	getMap.set('list_services_selectable', { method: get_filtered_list_services_for_select, permits: Permissions.NONE})
	/**
	 * @api {post} api/service/service Create service information
	 * @apiName Postservice
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Text} url 
	 * @apiParam {Number} id_category 
	 * @apiParam {Number} id_level 
	 * @apiParam {Number} id_institution 
	 * @apiParam {Number} id_user 
	 * @apiParam {String} hash 
	 * @apiParam {Number} rate 
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
		var query = "SELECT * FROM stamp.institution_user WHERE id_user = " + user.id + ";"
		return institution_user.customQuery(query).then((user_institution) => {
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
	 * @apiParam {Number} id_category 
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

	var create_service_comment = function(user, body) {
		body.id_user = user.id
		//body.id_service = service.id
		return model_service_comment.create(body)
	}

	/*var getPromiseUrl = function(id, files, i, length) {
		return new Promise(function (resolve, reject) {
			var url = utiles.uploadFileToGCS(id, files[i], id, files[i].type)
			if (i >= length-1) {
				resolve(url)
			} else {
				if (!url) reject(Error("getPromiseUrl broke"));
				else {
					model_media.create({
						url: url,
						type: files[i].type
					})
					resolve(getPromiseUrl(id, files, i+1, length))
				}
			}
		})
	}

	var save_service_evidence = function (user, body, files) {
		var files_objs = []
		var urls = []
		let len = 0
		for (var i in files) {
			files_objs.push(files[i])
			len++
		}
		//utiles.uploadFilesToGCS(user.id, files, user.id).then((url) => {
		getPromiseUrl(user.id, files_objs, 0, len).then((urls) => {
			for(var i = 0; i < urls.length; i++) {
				model_media.create({
					url: urls[i],
					type: files_objs[i].type
				})
			return urls
		})
	}
	*/

	// TODO: FINISH and check how to return if success
	/*var getPromiseUrl = function(id, file, folder, type) {
		return new Promise(function (resolve, reject) {
			var url = utiles.uploadFileToGCS(id, file, folder, type)
			if (!url) reject(Error("getPromiseUrl broke"));
			else resolve(url);
		})
	}
	
	var save_service_evidence = function (user, body, files) {
		for (var i in files) {
			getPromiseUrl(user.id, file[i], user.id, file[i].type).then((url) => {
				model_media.create({
					url: url,
					type: files[i].type
				})
			})
		}
	}
	*/

	var save_service_evidence = function (user, body, files) {
		for (var i in files) {
			utiles.uploadFileToGCS(user.id, files[i], user.id, files[i].type).then((url) => {
				// Insertar objetos multimedia en tabla stamp.media
				return model_media.create({
					url: url,
					type: files[i].type
				}).then((media) => {
					// Relacionar usuario, servicio y multimedia con el requisito
					return model_user_answer.create({
						id_answer: null,
						id_question: body.id_question,
						id_user: user.id,
						datetime: null, // TODO: what is datetime in table (REVISADO, es on UPDATE)
						id_media: media.insertId,
						requisite: body.requisite || "",
						support_legal: body.support_legal || "",
						justifiaction: body.justification || "", // TODO: Correct with justification!
						id_topic: body.id_topic || "",
						evidence: body.evidence || "",
						help: body.help || "",
						id_service: body.id_service
					})
				})
			})
		}
	}
	
	postMap.set('service', { method: create_entity_service, permits: Permissions.ENTITY_SERVICE })
	postMap.set('save_evidence', { method: save_service_evidence, permits: Permissions.ENTITY_SERVICE })
	postMap.set('service_comment', { method: create_service_comment, permits: Permissions.FORUM })
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
	 * @apiParam {Number} id_category 
	 * @apiParam {Number} id_level 
	 * @apiParam {Number} id_institution 
	 * @apiParam {Number} id_user 
	 * @apiParam {String} hash 
	 * @apiParam {Number} rate 
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
	 * @apiParam {Number} id_category 
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
	 * @apiParam {Number} id_category 
	 * @apiParam {Number} id_level 
	 * @apiParam {Number} id_institution 
	 * @apiParam {Number} id_user 
	 * @apiParam {String} hash 
	 * @apiParam {Number} rate 
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
	 * @apiParam {Number} id_category 
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
