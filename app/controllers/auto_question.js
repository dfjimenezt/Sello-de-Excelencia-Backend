/**  * CONTROLLER AUTO_GENERATED BY DMT-GENERATOR
 * question
 * DMT 2017
 * GENERATED: 17 / 8 / 2017 - 22:25:52
 **/
var BaseController = require('../utils/controller.js')
var util = require('util');
var utiles = require('../utils/utiles.js')
var Errors = require('../utils/errors.js')
var Permissions = require('../utils/permissions.js')
var Auth_ctrl = require('./auth.js')
var entity_evaluation_request = require('../models/entity_evaluation_request.js')
var evaluation_request = require('../models/evaluation_request.js')
var entity_user_answer = require('../models/entity_user_answer.js')
var request_status = require('../models/request_status.js')
var entity_service = require('../models/entity_service.js')
var questions = require('../models/question.js')
var question_controller = function () {
	var model_entity_evaluation_request = new entity_evaluation_request()
	var model_evaluation_request = new evaluation_request()
	var model_entity_user_answer = new entity_user_answer()
	var model_request_status = new request_status()
	var model_entity_service = new entity_service()
	var model_questions = new questions()
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
	 * @api {get} api/question/evaluation_request Request evaluation_request information
	 * @apiName Getevaluation_request
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id evaluation_request unique ID.
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
	 *		"id": 16,
	 *		"timestamp": "1969-05-20",
	 *		"result": 0,
	 *		"justify_reject": "This is an example text",
	 *		"alert_time": "1969-05-20",
	 *		"end_time": "1969-05-20",
	 *		"user": {
	 *			"id": 67,
	 *			"picture": "This is an example text",
	 *			"name": "This is an example text",
	 *			"secondname": "This is an example text",
	 *			"lastname": "This is an example text",
	 *			"secondlastname": "This is an example text",
	 *			"email": "This is an example text",
	 *			"phone": "This is an example text",
	 *			"extension": "This is an example text",
	 *			"mobile": "This is an example text",
	 *			"organization": "This is an example text",
	 *			"ocupation": "This is an example text",
	 *			"education_level": "This is an example text",
	 *			"tmp_pwd": 0,
	 *			"points": 98,
	 *			"active": 0,
	 *			"verified": 0,
	 *			"terms": 0,
	 *			"newsletter": 1,
	 *			"timestamp": "1969-05-20",
	 *			"id_region": 74,
	 *			"id_country": 81,
	 *			"document": "This is an example text",
	 *			"availability": {
	 *				"id": 4,
	 *				"name": "This is an example text"
	 *			},
	 *			"city": {
	 *				"id": 66,
	 *				"name": "This is an example text",
	 *				"code": "This is an example text",
	 *				"latitude": 81,
	 *				"longitude": 48,
	 *				"region": {
	 *					"id": 8,
	 *					"name": "This is an example text",
	 *					"id_capital": 17,
	 *					"id_country": 37,
	 *					"code": "This is an example text"
	 *				}
	 *			},
	 *			"type_document": {
	 *				"id": 15,
	 *				"name": "This is an example text"
	 *			}
	 *		},
	 *		"service": {
	 *			"id": 3,
	 *			"name": "This is an example text",
	 *			"url": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *			"id_user": 92,
	 *			"hash": "This is an example text",
	 *			"rate": 16,
	 *			"test_user": "This is an example text",
	 *			"test_password": "This is an example text",
	 *			"is_active": 0,
	 *			"is_product": 1,
	 *			"is_service": 1,
	 *			"timestamp": "1969-05-20",
	 *			"category": {
	 *				"id": 99,
	 *				"name": "This is an example text"
	 *			},
	 *			"institution": {
	 *				"id": 86,
	 *				"name": "This is an example text",
	 *				"nit": "This is an example text",
	 *				"address": "This is an example text",
	 *				"website": "This is an example text",
	 *				"email": "This is an example text",
	 *				"second_email": "This is an example text",
	 *				"phone": "This is an example text",
	 *				"extension_phone": "This is an example text",
	 *				"head_sector": 0,
	 *				"timestamp": "1969-05-20",
	 *				"designation_act": "This is an example text",
	 *				"legalrep_name": "This is an example text",
	 *				"legalrep_secondname": "This is an example text",
	 *				"legalrep_lastname": "This is an example text",
	 *				"legalrep_secondlastname": "This is an example text",
	 *				"legalrep_document": "This is an example text",
	 *				"legalrep_typedoc": 22,
	 *				"legalrep_email": "This is an example text",
	 *				"legalrep_phone": "This is an example text",
	 *				"legalrep_mobile": "This is an example text",
	 *				"id_country": 27,
	 *				"city": {
	 *					"id": 88,
	 *					"name": "This is an example text",
	 *					"code": "This is an example text",
	 *					"latitude": 85,
	 *					"longitude": 61,
	 *					"region": {
	 *						"id": 46,
	 *						"name": "This is an example text",
	 *						"id_capital": 37,
	 *						"id_country": 91,
	 *						"code": "This is an example text"
	 *					}
	 *				},
	 *				"region": {
	 *					"id": 88,
	 *					"name": "This is an example text",
	 *					"id_capital": 39,
	 *					"id_country": 64,
	 *					"code": "This is an example text"
	 *				},
	 *				"creator": {
	 *					"id": 94,
	 *					"picture": "This is an example text",
	 *					"name": "This is an example text",
	 *					"secondname": "This is an example text",
	 *					"lastname": "This is an example text",
	 *					"secondlastname": "This is an example text",
	 *					"email": "This is an example text",
	 *					"phone": "This is an example text",
	 *					"extension": "This is an example text",
	 *					"mobile": "This is an example text",
	 *					"organization": "This is an example text",
	 *					"ocupation": "This is an example text",
	 *					"education_level": "This is an example text",
	 *					"tmp_pwd": 0,
	 *					"points": 96,
	 *					"active": 0,
	 *					"verified": 1,
	 *					"terms": 0,
	 *					"newsletter": 1,
	 *					"timestamp": "1969-05-20",
	 *					"id_region": 35,
	 *					"id_country": 79,
	 *					"document": "This is an example text",
	 *					"availability": {
	 *						"id": 81,
	 *						"name": "This is an example text"
	 *					},
	 *					"city": {
	 *						"id": 60,
	 *						"name": "This is an example text",
	 *						"code": "This is an example text",
	 *						"latitude": 47,
	 *						"longitude": 7,
	 *						"region": {
	 *							"id": 41,
	 *							"name": "This is an example text",
	 *							"id_capital": 21,
	 *							"id_country": 98,
	 *							"code": "This is an example text"
	 *						}
	 *					},
	 *					"type_document": {
	 *						"id": 93,
	 *						"name": "This is an example text"
	 *					}
	 *				}
	 *			},
	 *			"status": {
	 *				"id": 13,
	 *				"name": "This is an example text",
	 *				"duration": 32,
	 *				"pre_end": 41,
	 *				"alert": 0
	 *			}
	 *		},
	 *		"status": {
	 *			"id": 98,
	 *			"name": "This is an example text"
	 *		},
	 *		"answer": {
	 *			"id": 41,
	 *			"id_answer": 21,
	 *			"datetime": "1969-05-20",
	 *			"timestamp": "1969-05-20",
	 *			"requisite": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *			"support_legal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *			"justification": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *			"evidence": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *			"help": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *			"id_service": 55,
	 *			"id_status": 72,
	 *			"question": {
	 *				"id": 7,
	 *				"id_topic": 93,
	 *				"level": 7,
	 *				"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *				"criteria": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *				"evidence": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *				"legal_support": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *				"help": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique."
	 *			},
	 *			"user": {
	 *				"id": 79,
	 *				"picture": "This is an example text",
	 *				"name": "This is an example text",
	 *				"secondname": "This is an example text",
	 *				"lastname": "This is an example text",
	 *				"secondlastname": "This is an example text",
	 *				"email": "This is an example text",
	 *				"phone": "This is an example text",
	 *				"extension": "This is an example text",
	 *				"mobile": "This is an example text",
	 *				"organization": "This is an example text",
	 *				"ocupation": "This is an example text",
	 *				"education_level": "This is an example text",
	 *				"tmp_pwd": 0,
	 *				"points": 36,
	 *				"active": 1,
	 *				"verified": 1,
	 *				"terms": 0,
	 *				"newsletter": 1,
	 *				"timestamp": "1969-05-20",
	 *				"id_region": 24,
	 *				"id_country": 21,
	 *				"document": "This is an example text",
	 *				"availability": {
	 *					"id": 38,
	 *					"name": "This is an example text"
	 *				},
	 *				"city": {
	 *					"id": 42,
	 *					"name": "This is an example text",
	 *					"code": "This is an example text",
	 *					"latitude": 4,
	 *					"longitude": 76,
	 *					"region": {
	 *						"id": 88,
	 *						"name": "This is an example text",
	 *						"id_capital": 10,
	 *						"id_country": 64,
	 *						"code": "This is an example text"
	 *					}
	 *				},
	 *				"type_document": {
	 *					"id": 46,
	 *					"name": "This is an example text"
	 *				}
	 *			},
	 *			"media": {
	 *				"id": 26,
	 *				"url": "This is an example text",
	 *				"type": "This is an example text",
	 *				"timestamp": "1969-05-20"
	 *			},
	 *			"topic": {
	 *				"id": 76,
	 *				"name": "This is an example text",
	 *				"id_usertype": 95,
	 *				"id_category": 17
	 *			}
	 *		}
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_entity_evaluation_request = function (user, params) {
		return _get(model_entity_evaluation_request,user,params)
	}
	/**
	 * @api {get} api/question/user_answer Request user_answer information
	 * @apiName Getuser_answer
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id user_answer unique ID.
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
	 *		"id": 98,
	 *		"id_answer": 92,
	 *		"datetime": "1969-05-20",
	 *		"timestamp": "1969-05-20",
	 *		"requisite": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"support_legal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"justification": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"evidence": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"help": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"id_service": 51,
	 *		"id_status": 42,
	 *		"question": {
	 *			"id": 9,
	 *			"id_topic": 4,
	 *			"level": 83,
	 *			"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *			"criteria": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *			"evidence": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *			"legal_support": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *			"help": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique."
	 *		},
	 *		"user": {
	 *			"id": 74,
	 *			"picture": "This is an example text",
	 *			"name": "This is an example text",
	 *			"secondname": "This is an example text",
	 *			"lastname": "This is an example text",
	 *			"secondlastname": "This is an example text",
	 *			"email": "This is an example text",
	 *			"phone": "This is an example text",
	 *			"extension": "This is an example text",
	 *			"mobile": "This is an example text",
	 *			"organization": "This is an example text",
	 *			"ocupation": "This is an example text",
	 *			"education_level": "This is an example text",
	 *			"tmp_pwd": 1,
	 *			"points": 59,
	 *			"active": 1,
	 *			"verified": 0,
	 *			"terms": 1,
	 *			"newsletter": 1,
	 *			"timestamp": "1969-05-20",
	 *			"id_region": 28,
	 *			"id_country": 73,
	 *			"document": "This is an example text",
	 *			"availability": {
	 *				"id": 25,
	 *				"name": "This is an example text"
	 *			},
	 *			"city": {
	 *				"id": 10,
	 *				"name": "This is an example text",
	 *				"code": "This is an example text",
	 *				"latitude": 60,
	 *				"longitude": 63,
	 *				"region": {
	 *					"id": 68,
	 *					"name": "This is an example text",
	 *					"id_capital": 36,
	 *					"id_country": 60,
	 *					"code": "This is an example text"
	 *				}
	 *			},
	 *			"type_document": {
	 *				"id": 63,
	 *				"name": "This is an example text"
	 *			}
	 *		},
	 *		"media": {
	 *			"id": 65,
	 *			"url": "This is an example text",
	 *			"type": "This is an example text",
	 *			"timestamp": "1969-05-20"
	 *		},
	 *		"topic": {
	 *			"id": 13,
	 *			"name": "This is an example text",
	 *			"id_usertype": 1,
	 *			"id_category": 14
	 *		}
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_entity_user_answer = function (user, params) {
		return _get(model_entity_user_answer,user,params)
	}
	/**
	 * @api {get} api/question/request_status Request request_status information
	 * @apiName Getrequest_status
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id request_status unique ID.
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
	 *		"id": 11,
	 *		"name": "This is an example text"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_request_status = function (user, params) {
		return _get(model_request_status,user,params)
	}

	var get_requirements_from_category_level_create_service = function (user, params) {
		let tabla_categoria = "stamp."
		switch(params.id_category){
			case "1":
				tabla_categoria += "gobierno_en_linea_datos_abiertos"
				break
			case "2":
				tabla_categoria += "gobierno_en_linea_requisitos_participacion"
				break
			case "3":
				tabla_categoria += "servicios_en_linea"
				break
			case "4":
				tabla_categoria += "gestion_de_ti"
				break
		}
		var query = `
SELECT ${tabla_categoria}.Requisito,
${tabla_categoria}.Criterio,
${tabla_categoria}.Evidencia,
${tabla_categoria}.\`Sustento legal o técnico\`, 
${tabla_categoria}.Ayuda,
${tabla_categoria}.\`Area Tematica\`,
stamp.questiontopic.id AS id_topic
FROM ${tabla_categoria}
LEFT JOIN stamp.questiontopic ON stamp.questiontopic.name = ${tabla_categoria}.\`Area Tematica\`
WHERE ${tabla_categoria}.Nivel <= ${params.level}
AND stamp.questiontopic.id_category = ${params.id_category}
;`
		return model_entity_service.customQuery(query).then((requirements) => {
			let count = 1
			for (var i in requirements) {
				requirements[i].id_question = count
				count += 1
			}
			return requirements
		})
	}

	var get_filtered_list_requirements = function (user, params) {
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
			// TODO: Only certified services must be displayed
			query += 'AND stamp.service.current_status = 6;'
		*/
		query += ';'
		return model_institution.customQuery(query)
	}

	// WARNING WHEN MERGE!
	var get_service_retro = function (user, params) {
		var query = `
SELECT stamp.user_answer.requisite AS requisite, stamp.user_answer.justification AS justification,
stamp.user_answer.evidence AS evidence, stamp.user_answer.support_legal AS support_legal, stamp.user_answer.help AS help,
stamp.media.url AS url, stamp.mmedia.comment AS comment
FROM stamp.user_answer JOIN stamp.media ON stamp.user_answer.id_media = stamp.media.id
WHERE stamp.user_answer.`
	}

	var get_evaluator_asigned = function (user, body) {
		var query = `
SELECT DISTINCT
stamp.institution.name AS name_institution,
stamp.service.name AS name_service,
stamp.service.timestamp AS postulation_date,
stamp.service.id_level AS level,
stamp.questiontopic.name AS questiontopic,
stamp.evaluation_request.id AS id_evaluation_request
FROM stamp.institution
JOIN stamp.service ON stamp.service.id_institution = stamp.institution.id
JOIN stamp.user_answer ON stamp.user_answer.id_service = stamp.service.id
JOIN stamp.questiontopic ON stamp.questiontopic.id = stamp.user_answer.id_topic
JOIN stamp.evaluation_request ON stamp.evaluation_request.id_service = stamp.user_answer.id_service
WHERE stamp.evaluation_request.id_user = ${user.id}
AND stamp.evaluation_request.id_request_status = 1
;`
		return model_entity_service.customQuery(query)
	}

	var get_services_in_process = function (user, body) {
		var query = `
SELECT DISTINCT
stamp.institution.name AS name_institution,
stamp.service.name AS name_service,
stamp.service.timestamp AS postulation_date,
stamp.service.id_level AS level,
stamp.questiontopic.name AS questiontopic,
stamp.user_answer.id_question AS id_question,
stamp.service.url AS url
FROM stamp.institution
JOIN stamp.service ON stamp.service.id_institution = stamp.institution.id
JOIN stamp.user_answer ON stamp.user_answer.id_service = stamp.service.id
JOIN stamp.questiontopic ON stamp.questiontopic.id = stamp.user_answer.id_topic
JOIN stamp.evaluation_request ON stamp.evaluation_request.id_service = stamp.user_answer.id_service
WHERE stamp.evaluation_request.id_user = ${user.id}
AND stamp.evaluation_request.id_request_status = 4 
;`
		return model_entity_service.customQuery(query) 
	}

	var get_evaluating_requisite = function (user, body) {
		var query = `
SELECT
stamp.user_answer.requisite AS requisite,
stamp.user_answer.support_legal AS support_legal,
stamp.user_answer.help AS help,
stamp.user_answer.justifiaction AS justifications, # TODO: Correct this column name
stamp.user_answer.evidence AS evidence,
stamp.media.url AS url
# WARNING: COMMENT MISSING IN TABLE USER_ANSWER
FROM stamp.user_answer
JOIN stamp.media ON stamp.media.id = stamp.user_answer.id_media
WHERE stamp.user_answer.id_question = ${body.id_question}
;`
		return model_entity_service.customQuery(query) 
	}

	var get_evaluated_services = function (user, body) {
		var query = `
SELECT DISTINCT
stamp.institution.name AS name_institution,
stamp.service.name AS name_service,
stamp.user_answer.id_question AS id_question,	
stamp.service.timestamp AS postulation_date,
stamp.service.id_level AS level,
stamp.questiontopic.name AS questiontopic,
stamp.evaluation_request.result AS result
FROM stamp.institution
JOIN stamp.service ON stamp.service.id_institution = stamp.institution.id
JOIN stamp.user_answer ON stamp.user_answer.id_service = stamp.service.id
JOIN stamp.questiontopic ON stamp.questiontopic.id = stamp.user_answer.id_topic
JOIN stamp.evaluation_request ON stamp.evaluation_request.id_service = stamp.user_answer.id_service
WHERE stamp.evaluation_request.id_user = ${user.id}
AND (stamp.evaluation_request.result = 1 OR stamp.evaluation_request.result = 0)
;`
		return model_entity_service.customQuery(query) 
	}
	
	var get_services_questions_and_status = function(token, params){
		return model_questions.getFiltered(params)
	}
	
	getMap.set('evaluation_request', { method: get_entity_evaluation_request, permits: Permissions.NONE })
	getMap.set('user_answer', { method: get_entity_user_answer, permits: Permissions.NONE })
	getMap.set('request_status', { method: get_request_status, permits: Permissions.NONE })
	getMap.set('get_requirements_from_category_level', { method: get_requirements_from_category_level_create_service, permits: Permissions.ENTITY_SERVICE })
	getMap.set('get_filtered_list_requirements', { method: get_filtered_list_requirements, permits: Permissions.EVALUATE })
	getMap.set('get_evaluator_asigned', { method: get_evaluator_asigned, permits: Permissions.EVALUATE })
	getMap.set('get_services_in_process', { method: get_services_in_process, permits: Permissions.EVALUATE })
	getMap.set('get_evaluating_requisite', { method: get_evaluating_requisite, permits: Permissions.EVALUATE })
	getMap.set('get_evaluated_services', { method: get_evaluated_services, permits: Permissions.EVALUATE })
	getMap.set('services_questions_status', { method: get_services_questions_and_status, permits: Permissions.NONE }) // Revisar permisos 
	getMap.set('evaluation_request', { method: get_entity_evaluation_request, permits: Permissions.NONE })
	getMap.set('user_answer', { method: get_entity_user_answer, permits: Permissions.NONE })
	getMap.set('request_status', { method: get_request_status, permits: Permissions.NONE })
	/**
	 * @api {post} api/question/evaluation_request Create evaluation_request information
	 * @apiName Postevaluation_request
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_user 
	 * @apiParam {Number} id_user_answer 
	 * @apiParam {Number} id_service 
	 * @apiParam {Number} id_request_status 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Boolean} result 
	 * @apiParam {String} justify_reject 
	 * @apiParam {Date} alert_time 
	 * @apiParam {Date} end_time 
	 * @apiParam {Object} user 
	 * @apiParam {Object} service 
	 * @apiParam {Object} status 
	 * @apiParam {Object} answer 
 	 * 
	 */
	var create_entity_evaluation_request = function (user, body) {
		return model_entity_evaluation_request.create(body)
	}
	/**
	 * @api {post} api/question/user_answer Create user_answer information
	 * @apiName Postuser_answer
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_answer 
	 * @apiParam {Number} id_question 
	 * @apiParam {Number} id_user 
	 * @apiParam {Date} datetime 
	 * @apiParam {Number} id_media 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Text} requisite 
	 * @apiParam {Text} support_legal 
	 * @apiParam {Text} justification 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Text} evidence 
	 * @apiParam {Text} help 
	 * @apiParam {Number} id_service 
	 * @apiParam {Number} id_status 
	 * @apiParam {Object} question 
	 * @apiParam {Object} user 
	 * @apiParam {Object} media 
	 * @apiParam {Object} topic 
 	 * 
	 */
	var create_entity_user_answer = function (user, body) {
		return model_entity_user_answer.create(body)
	}
	/**
	 * @api {post} api/question/request_status Create request_status information
	 * @apiName Postrequest_status
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
 	 * 
	 */
	var create_request_status = function (user, body) {
		return model_request_status.create(body)
	}

	var add_service_evaluator = function (user, body) {
		var query = `
SELECT stamp.user_questiontopic.id_user AS id_user,
stamp.user_answer.id AS id_user_answer,
stamp.user_answer.id_service AS id_service
FROM stamp.user_questiontopic
JOIN stamp.user_answer ON stamp.user_answer.id_topic = stamp.user_questiontopic.id_topic
WHERE stamp.user_answer.id_service = ${body.id_service}
AND stamp.user_questiontopic.id_user = ${user.id}
;`
		return model_request_status.customQuery(query).then((requests) => {
			for(var i in requests) {
				requests[i].id_request_status = 4 // 4 es el id_request_status para un servicio Solicitado
			}
			return model_evaluation_request.createMultiple2(requests)
		})
	}

	/*
	 * Crear question
	 */
	var create_question = function(user, body){
		if(body.id_topic){
			body.id_topic = parseInt(body.id_topic)
		}else{
			return { message: "se requiere id_topic" }
		}
		if(body.level){
			body.level = parseInt(body.level)
		}else{
			return { message: "se requiere level" }
		}
		if(body.text == undefined){
			return { message: "se requiere text" }
		}
		if(body.criteria == undefined){
			return { message: "se requiere criteria" }
		}
		if(body.evidence == undefined){
			return { message: "se requiere evidence" }
		}
		if(body.legal_support == undefined){
			return { message: "se requiere legal_support" }
		}
		if(body.help == undefined){
			return { message: "se requiere help" }
		}
		return model_questions.create(body).then(() => {
			return { message: "Question creado" }
		})
	}

	postMap.set('evaluation_request', { method: create_entity_evaluation_request, permits: Permissions.EVALUATE })
	postMap.set('user_answer', { method: create_entity_user_answer, permits: Permissions.EVALUATE })
	postMap.set('evaluation_request', { method: create_entity_evaluation_request, permits: Permissions.ADMIN })
	postMap.set('user_answer', { method: create_entity_user_answer, permits: Permissions.ADMIN })
	postMap.set('request_status', { method: create_request_status, permits: Permissions.ADMIN })
	postMap.set('add_service_evaluator', { method: add_service_evaluator, permits: Permissions.EVALUATE })
	postMap.set('question', { method: create_question, permits: Permissions.ADMIN })
	
	/**
	 * @api {put} api/question/evaluation_request Update evaluation_request information
	 * @apiName Putevaluation_request
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_user 
	 * @apiParam {Number} id_user_answer 
	 * @apiParam {Number} id_service 
	 * @apiParam {Number} id_request_status 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Boolean} result 
	 * @apiParam {String} justify_reject 
	 * @apiParam {Date} alert_time 
	 * @apiParam {Date} end_time 
	 * @apiParam {Object} user 
	 * @apiParam {Object} service 
	 * @apiParam {Object} status 
	 * @apiParam {Object} answer 
 	 * 
	 */
	var update_entity_evaluation_request = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_evaluation_request.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/question/user_answer Update user_answer information
	 * @apiName Putuser_answer
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_answer 
	 * @apiParam {Number} id_question 
	 * @apiParam {Number} id_user 
	 * @apiParam {Date} datetime 
	 * @apiParam {Number} id_media 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Text} requisite 
	 * @apiParam {Text} support_legal 
	 * @apiParam {Text} justification 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Text} evidence 
	 * @apiParam {Text} help 
	 * @apiParam {Number} id_service 
	 * @apiParam {Number} id_status 
	 * @apiParam {Object} question 
	 * @apiParam {Object} user 
	 * @apiParam {Object} media 
	 * @apiParam {Object} topic 
 	 * 
	 */
	var update_entity_user_answer = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_user_answer.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/question/request_status Update request_status information
	 * @apiName Putrequest_status
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
 	 * 
	 */
	var update_request_status = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_request_status.update(body,{id:body.id})
	}

	var edit_evaluation_request_status = function (user, body) {
		var query = `
UPDATE stamp.evaluation_request
SET stamp.evaluation_request.id_request_status = ${body.id_request_status}
WHERE stamp.evaluation_request.id_user = ${user.id}
AND stamp.evaluation_request.id_service = ${body.id_service}
AND stamp.evaluation_request.id_user_answer = ${body.id_user_answer}
;`
		return model_request_status.customQuery(query)
	}

	var set_final_decission_requisite = function (user, body) {
		var query = `
UPDATE stamp.evaluation_request
SET stamp.evaluation_request.result = ${body.result}
WHERE stamp.evaluation_request.id_user_answer = ${body.id_user_answer}
;`
		return model_request_status.customQuery(query)
	}

	putMap.set('evaluation_request', { method: update_entity_evaluation_request, permits: Permissions.ADMIN })
	putMap.set('user_answer', { method: update_entity_user_answer, permits: Permissions.ADMIN })
	putMap.set('request_status', { method: update_request_status, permits: Permissions.ADMIN })
	putMap.set('edit_evaluation_request_status', { method: edit_evaluation_request_status, permits: Permissions.EVALUATE })
	putMap.set('set_final_decission_requisite', { method: set_final_decission_requisite, permits: Permissions.EVALUATE })

	/**
	 * @api {delete} api/question/evaluation_request Delete evaluation_request information
	 * @apiName Deleteevaluation_request
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_user 
	 * @apiParam {Number} id_user_answer 
	 * @apiParam {Number} id_service 
	 * @apiParam {Number} id_request_status 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Boolean} result 
	 * @apiParam {String} justify_reject 
	 * @apiParam {Date} alert_time 
	 * @apiParam {Date} end_time 
	 * @apiParam {Object} user 
	 * @apiParam {Object} service 
	 * @apiParam {Object} status 
	 * @apiParam {Object} answer 
 	 * 
	 */
	var delete_entity_evaluation_request = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_evaluation_request.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/question/user_answer Delete user_answer information
	 * @apiName Deleteuser_answer
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_answer 
	 * @apiParam {Number} id_question 
	 * @apiParam {Number} id_user 
	 * @apiParam {Date} datetime 
	 * @apiParam {Number} id_media 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Text} requisite 
	 * @apiParam {Text} support_legal 
	 * @apiParam {Text} justification 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Text} evidence 
	 * @apiParam {Text} help 
	 * @apiParam {Number} id_service 
	 * @apiParam {Number} id_status 
	 * @apiParam {Object} question 
	 * @apiParam {Object} user 
	 * @apiParam {Object} media 
	 * @apiParam {Object} topic 
 	 * 
	 */
	var delete_entity_user_answer = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_user_answer.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/question/request_status Delete request_status information
	 * @apiName Deleterequest_status
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
 	 * 
	 */
	var delete_request_status = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_request_status.delete(body,{id:body.id})
	}
	deleteMap.set('evaluation_request', { method: delete_entity_evaluation_request, permits: Permissions.ADMIN })
	deleteMap.set('user_answer', { method: delete_entity_user_answer, permits: Permissions.ADMIN })
	deleteMap.set('request_status', { method: delete_request_status, permits: Permissions.ADMIN })
	var params = [getMap, postMap, putMap, deleteMap]
	BaseController.apply(this, params)
	//---------------------------------------------------------------
	return this;
}
util.inherits(question_controller, BaseController)
module.exports = question_controller
