/**  * CONTROLLER AUTO_GENERATED BY DMT-GENERATOR
 * question
 * DMT 2017
 * GENERATED: 5 / 8 / 2017 - 14:44:43
 **/
var BaseController = require('../utils/controller.js')
var util = require('util');
var utiles = require('../utils/utiles.js')
var Errors = require('../utils/errors.js')
var Permissions = require('../utils/permissions.js')
var Auth_ctrl = require('./auth.js')
var entity_evaluation_request = require('../models/entity_evaluation_request.js')
var entity_user_answer = require('../models/entity_user_answer.js')
var request_status = require('../models/request_status.js')
var entity_service = require('../models/entity_service.js')
var question_controller = function () {
	var model_entity_evaluation_request = new entity_evaluation_request()
	var model_entity_user_answer = new entity_user_answer()
	var model_request_status = new request_status()
	var model_entity_service = new entity_service()
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
	 *		"id": 88,
	 *		"timestamp": "1969-05-20",
	 *		"result": 1,
	 *		"user": {
	 *			"id": 10,
	 *			"picture": "This is an example text",
	 *			"name": "This is an example text",
	 *			"secondname": "This is an example text",
	 *			"lastname": "This is an example text",
	 *			"secondlastname": "This is an example text",
	 *			"email": "This is an example text",
	 *			"phone": "This is an example text",
	 *			"extension": "This is an example text",
	 *			"mobile": "This is an example text",
	 *			"active": 0,
	 *			"verified": 0,
	 *			"tmp_pwd": 1,
	 *			"flag_hall": 0,
	 *			"ranking_hall": 9,
	 *			"terms": 1,
	 *			"newsletter": 1,
	 *			"timestamp": "1969-05-20",
	 *			"points": 76,
	 *			"document": "This is an example text",
	 *			"education_level": "This is an example text",
	 *			"ocupation": "This is an example text",
	 *			"organization": "This is an example text",
	 *			"availability": {
	 *				"id": 21,
	 *				"name": "This is an example text"
	 *			},
	 *			"level": {
	 *				"id": 64,
	 *				"name": "This is an example text"
	 *			},
	 *			"city": {
	 *				"id": 4,
	 *				"name": "This is an example text",
	 *				"code": "This is an example text",
	 *				"latitude": 18,
	 *				"longitude": 89,
	 *				"region": {
	 *					"id": 79,
	 *					"name": "This is an example text",
	 *					"id_capital": 69,
	 *					"code": "This is an example text"
	 *				}
	 *			},
	 *			"type_document": {
	 *				"id": 4,
	 *				"name": "This is an example text"
	 *			}
	 *		},
	 *		"service": {
	 *			"id": 85,
	 *			"name": "This is an example text",
	 *			"url": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *			"id_level": 35,
	 *			"id_user": 38,
	 *			"hash": "This is an example text",
	 *			"rate": 44,
	 *			"test_user": "This is an example text",
	 *			"test_password": "This is an example text",
	 *			"is_product": 0,
	 *			"is_service": 1,
	 *			"timestamp": "1969-05-20",
	 *			"category": {
	 *				"id": 44,
	 *				"name": "This is an example text"
	 *			},
	 *			"institution": {
	 *				"id": 81,
	 *				"name": "This is an example text",
	 *				"nit": "This is an example text",
	 *				"address": "This is an example text",
	 *				"website": "This is an example text",
	 *				"email": "This is an example text",
	 *				"second_email": "This is an example text",
	 *				"phone": "This is an example text",
	 *				"head_sector": 1,
	 *				"timestamp": "1969-05-20",
	 *				"designation_act": "This is an example text",
	 *				"legalrep_name": "This is an example text",
	 *				"legalrep_secondname": "This is an example text",
	 *				"legalrep_lastname": "This is an example text",
	 *				"legalrep_secondlastname": "This is an example text",
	 *				"leaglrep_document": "This is an example text",
	 *				"legalrep_typedoc": 92,
	 *				"legalrep_email": "This is an example text",
	 *				"flag_hall": 0,
	 *				"ranking_hall": 33,
	 *				"city": {
	 *					"id": 59,
	 *					"name": "This is an example text",
	 *					"code": "This is an example text",
	 *					"latitude": 16,
	 *					"longitude": 65,
	 *					"region": {
	 *						"id": 88,
	 *						"name": "This is an example text",
	 *						"id_capital": 76,
	 *						"code": "This is an example text"
	 *					}
	 *				},
	 *				"region": {
	 *					"id": 81,
	 *					"name": "This is an example text",
	 *					"id_capital": 49,
	 *					"code": "This is an example text"
	 *				},
	 *				"creator": {
	 *					"id": 3,
	 *					"picture": "This is an example text",
	 *					"name": "This is an example text",
	 *					"secondname": "This is an example text",
	 *					"lastname": "This is an example text",
	 *					"secondlastname": "This is an example text",
	 *					"email": "This is an example text",
	 *					"phone": "This is an example text",
	 *					"extension": "This is an example text",
	 *					"mobile": "This is an example text",
	 *					"active": 0,
	 *					"verified": 1,
	 *					"tmp_pwd": 0,
	 *					"flag_hall": 0,
	 *					"ranking_hall": 46,
	 *					"terms": 1,
	 *					"newsletter": 0,
	 *					"timestamp": "1969-05-20",
	 *					"points": 33,
	 *					"document": "This is an example text",
	 *					"education_level": "This is an example text",
	 *					"ocupation": "This is an example text",
	 *					"organization": "This is an example text",
	 *					"availability": {
	 *						"id": 59,
	 *						"name": "This is an example text"
	 *					},
	 *					"level": {
	 *						"id": 9,
	 *						"name": "This is an example text"
	 *					},
	 *					"city": {
	 *						"id": 52,
	 *						"name": "This is an example text",
	 *						"code": "This is an example text",
	 *						"latitude": 89,
	 *						"longitude": 9,
	 *						"region": {
	 *							"id": 21,
	 *							"name": "This is an example text",
	 *							"id_capital": 24,
	 *							"code": "This is an example text"
	 *						}
	 *					},
	 *					"type_document": {
	 *						"id": 5,
	 *						"name": "This is an example text"
	 *					}
	 *				}
	 *			},
	 *			"status": {
	 *				"id": 20,
	 *				"name": "This is an example text"
	 *			}
	 *		},
	 *		"status": {
	 *			"id": 96,
	 *			"name": "This is an example text"
	 *		},
	 *		"answer": {
	 *			"id": 35,
	 *			"id_answer": 92,
	 *			"datetime": "1969-05-20",
	 *			"timestamp": "1969-05-20",
	 *			"requisite": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *			"support_legal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *			"justifiaction": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *			"evidence": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *			"help": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *			"id_service": 58,
	 *			"question": {
	 *				"id": 87,
	 *				"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *				"id_type": 36,
	 *				"id_topic": 27,
	 *				"id_form": 50
	 *			},
	 *			"user": {
	 *				"id": 46,
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
	 *				"ranking_hall": 96,
	 *				"terms": 0,
	 *				"newsletter": 1,
	 *				"timestamp": "1969-05-20",
	 *				"points": 3,
	 *				"document": "This is an example text",
	 *				"education_level": "This is an example text",
	 *				"ocupation": "This is an example text",
	 *				"organization": "This is an example text",
	 *				"availability": {
	 *					"id": 96,
	 *					"name": "This is an example text"
	 *				},
	 *				"level": {
	 *					"id": 51,
	 *					"name": "This is an example text"
	 *				},
	 *				"city": {
	 *					"id": 67,
	 *					"name": "This is an example text",
	 *					"code": "This is an example text",
	 *					"latitude": 82,
	 *					"longitude": 63,
	 *					"region": {
	 *						"id": 85,
	 *						"name": "This is an example text",
	 *						"id_capital": 47,
	 *						"code": "This is an example text"
	 *					}
	 *				},
	 *				"type_document": {
	 *					"id": 33,
	 *					"name": "This is an example text"
	 *				}
	 *			},
	 *			"media": {
	 *				"id": 42,
	 *				"url": "This is an example text",
	 *				"type": "This is an example text",
	 *				"timestamp": "1969-05-20"
	 *			},
	 *			"topic": {
	 *				"id": 4,
	 *				"name": "This is an example text",
	 *				"id_category": 71
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
	 *		"id": 60,
	 *		"id_answer": 89,
	 *		"datetime": "1969-05-20",
	 *		"timestamp": "1969-05-20",
	 *		"requisite": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"support_legal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"justifiaction": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"evidence": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"help": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"id_service": 75,
	 *		"question": {
	 *			"id": 16,
	 *			"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *			"id_type": 52,
	 *			"id_topic": 2,
	 *			"id_form": 16
	 *		},
	 *		"user": {
	 *			"id": 76,
	 *			"picture": "This is an example text",
	 *			"name": "This is an example text",
	 *			"secondname": "This is an example text",
	 *			"lastname": "This is an example text",
	 *			"secondlastname": "This is an example text",
	 *			"email": "This is an example text",
	 *			"phone": "This is an example text",
	 *			"extension": "This is an example text",
	 *			"mobile": "This is an example text",
	 *			"active": 1,
	 *			"verified": 1,
	 *			"tmp_pwd": 0,
	 *			"flag_hall": 0,
	 *			"ranking_hall": 75,
	 *			"terms": 1,
	 *			"newsletter": 0,
	 *			"timestamp": "1969-05-20",
	 *			"points": 25,
	 *			"document": "This is an example text",
	 *			"education_level": "This is an example text",
	 *			"ocupation": "This is an example text",
	 *			"organization": "This is an example text",
	 *			"availability": {
	 *				"id": 85,
	 *				"name": "This is an example text"
	 *			},
	 *			"level": {
	 *				"id": 52,
	 *				"name": "This is an example text"
	 *			},
	 *			"city": {
	 *				"id": 30,
	 *				"name": "This is an example text",
	 *				"code": "This is an example text",
	 *				"latitude": 68,
	 *				"longitude": 31,
	 *				"region": {
	 *					"id": 19,
	 *					"name": "This is an example text",
	 *					"id_capital": 90,
	 *					"code": "This is an example text"
	 *				}
	 *			},
	 *			"type_document": {
	 *				"id": 49,
	 *				"name": "This is an example text"
	 *			}
	 *		},
	 *		"media": {
	 *			"id": 60,
	 *			"url": "This is an example text",
	 *			"type": "This is an example text",
	 *			"timestamp": "1969-05-20"
	 *		},
	 *		"topic": {
	 *			"id": 18,
	 *			"name": "This is an example text",
	 *			"id_category": 46
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
	 *		"id": 20,
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
		return model_entity_service.customQuery(query)
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
	getMap.set('evaluation_request', { method: get_entity_evaluation_request, permits: Permissions.NONE })
	getMap.set('user_answer', { method: get_entity_user_answer, permits: Permissions.NONE })
	getMap.set('request_status', { method: get_request_status, permits: Permissions.NONE })
	getMap.set('get_requirements_from_category_level', { method: get_requirements_from_category_level_create_service, permits: Permissions.ENTITY_SERVICE })
	getMap.set('get_filtered_list_requirements', { method: get_filtered_list_requirements, permits: Permissions.EVALUATE })
	
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
	 * @apiParam {Object} user 
	 * @apiParam {Object} service 
	 * @apiParam {Object} status 
	 * @apiParam {Object} answer 
 	 * 
	 */
	var create_entity_evaluation_request = function (user, body) {
		body.id_user = user.id
		//body.id_request_status = {2,3} WARNING! Esto donde se define (body o acá)
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
	 * @apiParam {Text} justifiaction 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Text} evidence 
	 * @apiParam {Text} help 
	 * @apiParam {Number} id_service 
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
SELECT stamp.user_answer.id AS id_user_answer
FROM stamp.user_answer
WHERE stamp.user_answer.id_service = ${body.id_service}
AND 
;`
		var result = model_request_status.customQuery(query)
		return result
	}

	postMap.set('evaluation_request', { method: create_entity_evaluation_request, permits: Permissions.EVALUATE })
	postMap.set('user_answer', { method: create_entity_user_answer, permits: Permissions.EVALUATE })
	postMap.set('request_status', { method: create_request_status, permits: Permissions.ADMIN })
	postMap.set('add_service_evaluator', { method: add_service_evaluator, permits: Permissions.EVALUATE })
	
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
	 * @apiParam {Text} justifiaction 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Text} evidence 
	 * @apiParam {Text} help 
	 * @apiParam {Number} id_service 
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
	putMap.set('evaluation_request', { method: update_entity_evaluation_request, permits: Permissions.ADMIN })
	putMap.set('user_answer', { method: update_entity_user_answer, permits: Permissions.ADMIN })
	putMap.set('request_status', { method: update_request_status, permits: Permissions.ADMIN })
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
	 * @apiParam {Text} justifiaction 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Text} evidence 
	 * @apiParam {Text} help 
	 * @apiParam {Number} id_service 
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
