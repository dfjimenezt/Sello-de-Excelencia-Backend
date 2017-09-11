/**  * CONTROLLER AUTO_GENERATED BY DMT-GENERATOR
 * question
 * DMT 2017
 * GENERATED: 5 / 9 / 2017 - 7:39:27
 **/
var BaseController = require('../utils/controller.js')
var util = require('util');
var utiles = require('../utils/utiles.js')
var Errors = require('../utils/errors.js')
var Permissions = require('../utils/permissions.js')
var Auth_ctrl = require('./auth.js')
var entity_question = require('../models/entity_question.js')
var entity_questiontopic = require('../models/entity_questiontopic.js')
var usertype = require('../models/usertype.js')
var category_questions = require('../models/category_questions.js')
var entity_form = require('../models/entity_form.js')
var entity_user_answer = require('../models/entity_user_answer.js')
var status = require('../models/status.js')
var entity_evaluation_request = require('../models/entity_evaluation_request.js')
var request_status = require('../models/request_status.js')
var chats = require('../models/chats.js')
var media = require('../models/media.js')

var question_controller = function () {
	var model_entity_question = new entity_question()
	var model_entity_questiontopic = new entity_questiontopic()
	var model_usertype = new usertype()
	var model_category_questions = new category_questions()
	var model_entity_form = new entity_form()
	var model_entity_user_answer = new entity_user_answer()
	var model_status = new status()
	var model_entity_evaluation_request = new entity_evaluation_request()
	var model_request_status = new request_status()
	var model_chats = new chats()
	var model_media = new media()
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
	 * @api {get} api/question/question Request question information
	 * @apiName Getquestion
	 * @apiGroup question
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
	 *		"id": 97,
	 *		"id_topic": 69,
	 *		"level": 5,
	 *		"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"criteria": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"evidence": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"legal_support": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"help": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique."
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_entity_question = function (user, params) {
		return _get(model_entity_question,user,params)
	}
	/**
	 * @api {get} api/question/questiontopic Request questiontopic information
	 * @apiName Getquestiontopic
	 * @apiGroup question
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
	 *		"id": 63,
	 *		"name": "This is an example text",
	 *		"id_usertype": 35,
	 *		"id_category": 36
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_entity_questiontopic = function (user, params) {
		return _get(model_entity_questiontopic,user,params)
	}
	/**
	 * @api {get} api/question/usertype Request usertype information
	 * @apiName Getusertype
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id usertype unique ID.
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
	 *		"id": 38,
	 *		"name": "This is an example text"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_usertype = function (user, params) {
		return _get(model_usertype,user,params)
	}
	/**
	 * @api {get} api/question/category_questions Request category_questions information
	 * @apiName Getcategory_questions
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id category_questions unique ID.
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
	 *		"id": 25,
	 *		"id_category": 24,
	 *		"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique."
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_category_questions = function (user, params) {
		return _get(model_category_questions,user,params)
	}
	/**
	 * @api {get} api/question/form Request form information
	 * @apiName Getform
	 * @apiGroup question
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
	 *		"id": 93,
	 *		"name": "This is an example text",
	 *		"id_category": 35,
	 *		"timestamp": "1969-05-20"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_entity_form = function (user, params) {
		return _get(model_entity_form,user,params)
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
	 *		"id": 50,
	 *		"id_order": 29,
	 *		"id_user": 72,
	 *		"id_service": 48,
	 *		"id_question": 29,
	 *		"id_topic": 95,
	 *		"id_status": 46,
	 *		"id_media": 41,
	 *		"comment": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"datetime": "1969-05-20",
	 *		"timestamp": "1969-05-20",
	 *		"requisite": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"support_legal": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"justification": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"evidence": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"help": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"alert": 1
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_entity_user_answer = function (user, params) {
		if(params.postulate){
			return model_entity_user_answer.toPostulate(user,params)
		}
		return _get(model_entity_user_answer,user,params)
	}
	/**
	 * @api {get} api/question/status Request status information
	 * @apiName Getstatus
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id status unique ID.
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
	 *		"id": 66,
	 *		"name": "This is an example text",
	 *		"duration": 10,
	 *		"pre_end": 44,
	 *		"alert": 1
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_status = function (user, params) {
		return _get(model_status,user,params)
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
	 *		"id": 58,
	 *		"id_user": 65,
	 *		"id_question": 20,
	 *		"id_service": 31,
	 *		"id_request_status": 84,
	 *		"timestamp": "1969-05-20",
	 *		"result": 0,
	 *		"branch": 7,
	 *		"justify_reject": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"alert_time": "1969-05-20",
	 *		"end_time": "1969-05-20"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_entity_evaluation_request = function (user, params) {
		return _get(model_entity_evaluation_request,user,params)
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
	/**
	 * @api {get} api/question/chats Request chats information
	 * @apiName Getchats
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id chats unique ID.
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
	 *		"id": 54,
	 *		"id_evaluation_request": 79,
	 *		"id_sender": 49,
	 *		"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"timestamp": "1969-05-20"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_chats = function (user, params) {
		return _get(model_chats,user,params)
	}
	getMap.set('question', { method: get_entity_question, permits: Permissions.NONE })
	getMap.set('questiontopic', { method: get_entity_questiontopic, permits: Permissions.NONE })
	getMap.set('usertype', { method: get_usertype, permits: Permissions.NONE })
	getMap.set('category_questions', { method: get_category_questions, permits: Permissions.NONE })
	getMap.set('form', { method: get_entity_form, permits: Permissions.NONE })
	getMap.set('user_answer', { method: get_entity_user_answer, permits: Permissions.NONE })
	getMap.set('status', { method: get_status, permits: Permissions.NONE })
	getMap.set('evaluation_request', { method: get_entity_evaluation_request, permits: Permissions.NONE })
	getMap.set('request_status', { method: get_request_status, permits: Permissions.NONE })
	getMap.set('chats', { method: get_chats, permits: Permissions.NONE })
	/**
	 * @api {post} api/question/question Create question information
	 * @apiName Postquestion
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Number} level 
	 * @apiParam {Text} text 
	 * @apiParam {Text} criteria 
	 * @apiParam {Text} evidence 
	 * @apiParam {Text} legal_support 
	 * @apiParam {Text} help 
 	 * 
	 */
	var create_entity_question = function (user, body) {
		return model_entity_question.create(body)
	}
	/**
	 * @api {post} api/question/questiontopic Create questiontopic information
	 * @apiName Postquestiontopic
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Number} id_usertype 
	 * @apiParam {Number} id_category 
 	 * 
	 */
	var create_entity_questiontopic = function (user, body) {
		return model_entity_questiontopic.create(body)
	}
	/**
	 * @api {post} api/question/usertype Create usertype information
	 * @apiName Postusertype
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
 	 * 
	 */
	var create_usertype = function (user, body) {
		return model_usertype.create(body)
	}
	/**
	 * @api {post} api/question/category_questions Create category_questions information
	 * @apiName Postcategory_questions
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_category 
	 * @apiParam {Text} text 
 	 * 
	 */
	var create_category_questions = function (user, body) {
		return model_category_questions.create(body)
	}
	/**
	 * @api {post} api/question/form Create form information
	 * @apiName Postform
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Number} id_category 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var create_entity_form = function (user, body) {
		return model_entity_form.create(body)
	}
	/**
	 * @api {post} api/question/user_answer Create user_answer information
	 * @apiName Postuser_answer
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_order 
	 * @apiParam {Number} id_user 
	 * @apiParam {Number} id_service 
	 * @apiParam {Number} id_question 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Number} id_status 
	 * @apiParam {Number} id_media 
	 * @apiParam {Text} comment 
	 * @apiParam {Date} datetime 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Text} requisite 
	 * @apiParam {Text} support_legal 
	 * @apiParam {Text} justification 
	 * @apiParam {Text} evidence 
	 * @apiParam {Text} help 
	 * @apiParam {Boolean} alert 
 	 * 
	 */
	var create_entity_user_answer = function (user, body, files) {
		body.id_user = user.id
		body.id_status = 1
		if(files.file){
			return utiles.uploadFileToGCS(user.id, files.file, user.id, files.file.type)
			.then((url) => {
				return model_media.create({
					url: url,
					type: files.file.type
				})
			}).then((media)=>{
				body.id_media= media.insertId
				return model_entity_user_answer.create(body)
			})
		}else{
			return model_entity_user_answer.create(body)
		}
	}
	/**
	 * @api {post} api/question/status Create status information
	 * @apiName Poststatus
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Number} duration 
	 * @apiParam {Number} pre_end 
	 * @apiParam {Boolean} alert 
 	 * 
	 */
	var create_status = function (user, body) {
		return model_status.create(body)
	}
	/**
	 * @api {post} api/question/evaluation_request Create evaluation_request information
	 * @apiName Postevaluation_request
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_user 
	 * @apiParam {Number} id_question 
	 * @apiParam {Number} id_service 
	 * @apiParam {Number} id_request_status 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Boolean} result 
	 * @apiParam {Number} branch 
	 * @apiParam {Text} justify_reject 
	 * @apiParam {Date} alert_time 
	 * @apiParam {Date} end_time 
 	 * 
	 */
	var create_entity_evaluation_request = function (user, body) {
		if(user.permissions.indexOf(Permissions.ADMIN_EVALUATION_REQUEST)==-1){
			body.id_user = user.id
			let atime = new Date()
			atime.setDate(atime.getDate()+20)
			let ftime = new Date()
			ftime.setDate(ftime.getDate()+30)
			body.alert_time = atime
			body.end_time = ftime
			body.id_request_status=2
		}
		return model_entity_evaluation_request.create(body)
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
	/**
	 * @api {post} api/question/chats Create chats information
	 * @apiName Postchats
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_evaluation_request 
	 * @apiParam {Number} id_sender 
	 * @apiParam {Text} text 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var create_chats = function (user, body) {
		body.id_sender= user.id
		return model_chats.create(body)
	}
	postMap.set('question', { method: create_entity_question, permits: Permissions.ADMIN_QUESTIONS })
	postMap.set('questiontopic', { method: create_entity_questiontopic, permits: Permissions.ADMIN_QUESTIONS })
	postMap.set('usertype', { method: create_usertype, permits: Permissions.ADMIN_QUESTIONS })
	postMap.set('category_questions', { method: create_category_questions, permits: Permissions.ADMIN_QUESTIONS })
	postMap.set('form', { method: create_entity_form, permits: Permissions.ADMIN_QUESTIONS })
	postMap.set('user_answer', { method: create_entity_user_answer, permits: Permissions.POSTULATE_SERVICE })
	postMap.set('status', { method: create_status, permits: Permissions.ADMIN_STATUS })
	postMap.set('evaluation_request', { method: create_entity_evaluation_request, permits: Permissions.CREATE_EVALUATION_REQUEST })
	postMap.set('request_status', { method: create_request_status, permits: Permissions.ADMIN_STATUS })
	postMap.set('chats', { method: create_chats, permits: Permissions.CREATE_CHAT })
	/**
	 * @api {put} api/question/question Update question information
	 * @apiName Putquestion
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Number} level 
	 * @apiParam {Text} text 
	 * @apiParam {Text} criteria 
	 * @apiParam {Text} evidence 
	 * @apiParam {Text} legal_support 
	 * @apiParam {Text} help 
 	 * 
	 */
	var update_entity_question = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_question.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/question/questiontopic Update questiontopic information
	 * @apiName Putquestiontopic
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Number} id_usertype 
	 * @apiParam {Number} id_category 
 	 * 
	 */
	var update_entity_questiontopic = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_questiontopic.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/question/usertype Update usertype information
	 * @apiName Putusertype
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
 	 * 
	 */
	var update_usertype = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_usertype.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/question/category_questions Update category_questions information
	 * @apiName Putcategory_questions
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_category 
	 * @apiParam {Text} text 
 	 * 
	 */
	var update_category_questions = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_category_questions.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/question/form Update form information
	 * @apiName Putform
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Number} id_category 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var update_entity_form = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_form.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/question/user_answer Update user_answer information
	 * @apiName Putuser_answer
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_order 
	 * @apiParam {Number} id_user 
	 * @apiParam {Number} id_service 
	 * @apiParam {Number} id_question 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Number} id_status 
	 * @apiParam {Number} id_media 
	 * @apiParam {Text} comment 
	 * @apiParam {Date} datetime 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Text} requisite 
	 * @apiParam {Text} support_legal 
	 * @apiParam {Text} justification 
	 * @apiParam {Text} evidence 
	 * @apiParam {Text} help 
	 * @apiParam {Boolean} alert 
 	 * 
	 */
	var update_entity_user_answer = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_user_answer.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/question/status Update status information
	 * @apiName Putstatus
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Number} duration 
	 * @apiParam {Number} pre_end 
	 * @apiParam {Boolean} alert 
 	 * 
	 */
	var update_status = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_status.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/question/evaluation_request Update evaluation_request information
	 * @apiName Putevaluation_request
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_user 
	 * @apiParam {Number} id_question 
	 * @apiParam {Number} id_service 
	 * @apiParam {Number} id_request_status 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Boolean} result 
	 * @apiParam {Number} branch 
	 * @apiParam {Text} justify_reject 
	 * @apiParam {Date} alert_time 
	 * @apiParam {Date} end_time 
 	 * 
	 */
	var update_entity_evaluation_request = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		model_entity_evaluation_request.getByUid(""+body.id).then((result)=>{
			let data = result.data[0]
			if(user.permissions.indexOf(Permissions.ADMIN_EVALUATION_REQUEST)== -1){
				if(data.id_user != user.id){
					throw utiles.informError(401)
				}
			}
			
			if(body.id_request_status == 6){//add points
				model_entity_user_answer.update({id:data.id_answer,id_status:6})
			}
			let points = require('../models/points.js')
			let model_points = new points()
			model_points.create({
				prev_points:0,
				value:10,
				result:10,
				justification:'Calificación de Requisito',
				id_user:user.id,
				id_motives:1
			})
			return model_entity_evaluation_request.update(body,{id:body.id})
		})
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
	/**
	 * @api {put} api/question/chats Update chats information
	 * @apiName Putchats
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_evaluation_request 
	 * @apiParam {Number} id_sender 
	 * @apiParam {Text} text 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var update_chats = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_chats.update(body,{id:body.id})
	}
	putMap.set('question', { method: update_entity_question, permits: Permissions.ADMIN_QUESTIONS })
	putMap.set('questiontopic', { method: update_entity_questiontopic, permits: Permissions.ADMIN_QUESTIONS })
	putMap.set('usertype', { method: update_usertype, permits: Permissions.ADMIN_QUESTIONS })
	putMap.set('category_questions', { method: update_category_questions, permits: Permissions.ADMIN_QUESTIONS })
	putMap.set('form', { method: update_entity_form, permits: Permissions.ADMIN_QUESTIONS })
	putMap.set('user_answer', { method: update_entity_user_answer, permits: Permissions.POSTULATE_SERVICE })
	putMap.set('status', { method: update_status, permits: Permissions.ADMIN_STATUS })
	putMap.set('evaluation_request', { method: update_entity_evaluation_request, permits: Permissions.CREATE_EVALUATION_REQUEST })
	putMap.set('request_status', { method: update_request_status, permits: Permissions.ADMIN_STATUS })
	putMap.set('chats', { method: update_chats, permits: Permissions.ADMIN_ANSWERS })
	/**
	 * @api {delete} api/question/question Delete question information
	 * @apiName Deletequestion
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Number} level 
	 * @apiParam {Text} text 
	 * @apiParam {Text} criteria 
	 * @apiParam {Text} evidence 
	 * @apiParam {Text} legal_support 
	 * @apiParam {Text} help 
 	 * 
	 */
	var delete_entity_question = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_question.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/question/questiontopic Delete questiontopic information
	 * @apiName Deletequestiontopic
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Number} id_usertype 
	 * @apiParam {Number} id_category 
 	 * 
	 */
	var delete_entity_questiontopic = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_questiontopic.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/question/usertype Delete usertype information
	 * @apiName Deleteusertype
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
 	 * 
	 */
	var delete_usertype = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_usertype.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/question/category_questions Delete category_questions information
	 * @apiName Deletecategory_questions
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_category 
	 * @apiParam {Text} text 
 	 * 
	 */
	var delete_category_questions = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_category_questions.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/question/form Delete form information
	 * @apiName Deleteform
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Number} id_category 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var delete_entity_form = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_form.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/question/user_answer Delete user_answer information
	 * @apiName Deleteuser_answer
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_order 
	 * @apiParam {Number} id_user 
	 * @apiParam {Number} id_service 
	 * @apiParam {Number} id_question 
	 * @apiParam {Number} id_topic 
	 * @apiParam {Number} id_status 
	 * @apiParam {Number} id_media 
	 * @apiParam {Text} comment 
	 * @apiParam {Date} datetime 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Text} requisite 
	 * @apiParam {Text} support_legal 
	 * @apiParam {Text} justification 
	 * @apiParam {Text} evidence 
	 * @apiParam {Text} help 
	 * @apiParam {Boolean} alert 
 	 * 
	 */
	var delete_entity_user_answer = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_user_answer.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/question/status Delete status information
	 * @apiName Deletestatus
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Number} duration 
	 * @apiParam {Number} pre_end 
	 * @apiParam {Boolean} alert 
 	 * 
	 */
	var delete_status = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_status.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/question/evaluation_request Delete evaluation_request information
	 * @apiName Deleteevaluation_request
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_user 
	 * @apiParam {Number} id_question 
	 * @apiParam {Number} id_service 
	 * @apiParam {Number} id_request_status 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Boolean} result 
	 * @apiParam {Number} branch 
	 * @apiParam {Text} justify_reject 
	 * @apiParam {Date} alert_time 
	 * @apiParam {Date} end_time 
 	 * 
	 */
	var delete_entity_evaluation_request = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_evaluation_request.delete(body,{id:body.id})
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
	/**
	 * @api {delete} api/question/chats Delete chats information
	 * @apiName Deletechats
	 * @apiGroup question
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_evaluation_request 
	 * @apiParam {Number} id_sender 
	 * @apiParam {Text} text 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var delete_chats = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_chats.delete(body,{id:body.id})
	}
	deleteMap.set('question', { method: delete_entity_question, permits: Permissions.ADMIN_QUESTIONS })
	deleteMap.set('questiontopic', { method: delete_entity_questiontopic, permits: Permissions.ADMIN_QUESTIONS })
	deleteMap.set('usertype', { method: delete_usertype, permits: Permissions.ADMIN_QUESTIONS })
	deleteMap.set('category_questions', { method: delete_category_questions, permits: Permissions.ADMIN_QUESTIONS })
	deleteMap.set('form', { method: delete_entity_form, permits: Permissions.ADMIN_QUESTIONS })
	deleteMap.set('user_answer', { method: delete_entity_user_answer, permits: Permissions.ADMIN_ANSWERS })
	deleteMap.set('status', { method: delete_status, permits: Permissions.ADMIN_STATUS })
	deleteMap.set('evaluation_request', { method: delete_entity_evaluation_request, permits: Permissions.ADMIN_EVALUATION_REQUEST })
	deleteMap.set('request_status', { method: delete_request_status, permits: Permissions.ADMIN_STATUS })
	deleteMap.set('chats', { method: delete_chats, permits: Permissions.ADMIN_ANSWERS })
	var params = [getMap, postMap, putMap, deleteMap]
	BaseController.apply(this, params)
	//---------------------------------------------------------------
	return this;
}
util.inherits(question_controller, BaseController)
module.exports = question_controller