/**  * CONTROLLER AUTO_GENERATED BY DMT-GENERATOR
 * platform
 * DMT 2017
 * GENERATED: 5 / 9 / 2017 - 7:40:7
 **/
var BaseController = require('../utils/controller.js')
var util = require('util');
var utiles = require('../utils/utiles.js')
var Errors = require('../utils/errors.js')
var Permissions = require('../utils/permissions.js')
var Auth_ctrl = require('./auth.js')
var contact = require('../models/contact.js')
var faq = require('../models/faq.js')
var social = require('../models/social.js')
var footer = require('../models/footer.js')
var entity_banner = require('../models/entity_banner.js')
var type_banner = require('../models/type_banner.js')
var config = require('../models/config.js')
var emiter = require('../events/emiter.js').instance
var platform_controller = function () {
	var model_contact = new contact()
	var model_faq = new faq()
	var model_social = new social()
	var model_footer = new footer()
	var model_entity_banner = new entity_banner()
	var model_type_banner = new type_banner()
	var model_config = new config()
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
	 * @api {get} api/platform/contact Request contact information
	 * @apiName Getcontact
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id contact unique ID.
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
	 *		"id": 95,
	 *		"name": "This is an example text",
	 *		"lastname": "This is an example text",
	 *		"topic": "This is an example text",
	 *		"message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"timestamp": "1969-05-20"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_contact = function (user, params) {
		return _get(model_contact,user,params)
	}
	/**
	 * @api {get} api/platform/faq Request faq information
	 * @apiName Getfaq
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id faq unique ID.
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
	 *		"question": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"active": 0,
	 *		"timestamp": "1969-05-20"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_faq = function (user, params) {
		return _get(model_faq,user,params)
	}
	/**
	 * @api {get} api/platform/social Request social information
	 * @apiName Getsocial
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id social unique ID.
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
	 *		"name": "This is an example text",
	 *		"icon": "This is an example text",
	 *		"link": "This is an example text"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_social = function (user, params) {
		return _get(model_social,user,params)
	}
	/**
	 * @api {get} api/platform/footer Request footer information
	 * @apiName Getfooter
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id footer unique ID.
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
	 *		"title": "This is an example text",
	 *		"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique."
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_footer = function (user, params) {
		return _get(model_footer,user,params)
	}
	/**
	 * @api {get} api/platform/banner Request banner information
	 * @apiName Getbanner
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id banner unique ID.
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
	 *		"id": 61,
	 *		"name": "This is an example text",
	 *		"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"directory": "This is an example text",
	 *		"id_type_banner": 32,
	 *		"position": 57
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_entity_banner = function (user, params) {
		return _get(model_entity_banner,user,params)
	}
	/**
	 * @api {get} api/platform/type_banner Request type_banner information
	 * @apiName Gettype_banner
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id type_banner unique ID.
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
	 *		"name": "This is an example text"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_type_banner = function (user, params) {
		return _get(model_type_banner,user,params)
	}
	/**
	 * @api {get} api/platform/config Request config information
	 * @apiName Getconfig
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id config unique ID.
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
	 *		"id": 23,
	 *		"header": "This is an example text",
	 *		"address": "This is an example text",
	 *		"postal_code": "This is an example text",
	 *		"phone": "This is an example text",
	 *		"free_phone": "This is an example text",
	 *		"anticorruption_phone": "This is an example text",
	 *		"email_PQRS": "This is an example text",
	 *		"schedulle": "This is an example text"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_config = function (user, params) {
		return _get(model_config,user,params)
	}

	
	/**
	 * Exports the data to Excel Files
	 * 
	 * @param {*} user 
	 * @param {*} queryParams 
	 */
	var get_export = function (user, queryParams) {
		let translate = {
			"es": {
				"name": "Nombre",
				"url": "Url",
				"category": "Categoría",
				"institution": "Entidad",
				"rate":"Calificación",
				"level":"Nivel",
				"valid_to":"Vigente Hasta",
				"timestamp":"Fecha de Certificación"
			}
		}
		let tables = [queryParams.table]
		let BaseModel = require('../utils/model.js')
		let promises = []
		tables.forEach(function (t) {
			let model = {}
			var params = [{
				table: t,
				model: 'mysql'
			}]
			BaseModel.apply(model, params)
			let q = `SELECT s.id,s.name,s.url,c.name category,i.name institution,s.rate,ss.level,ss.valid_to,ss.timestamp FROM service s 
			JOIN category c on c.id = s.id_category 
			JOIN institution i on i.id = s.id_institution
			JOIN service_status ss on ss.id_service = s.id
			WHERE s.current_status = '8' AND ss.id_status = '8' AND ss.valid_to > NOW()`
			let p = model_config.customQuery(q)
			promises.push(p)
		})
		return Promise.all(promises).then((results) => {
			let sheets = {}
			let XLSX = require("xlsx")
			let wopts = { bookType: 'xlsx', bookSST: false, type: 'binary' }
			for (let i = 0; i < tables.length; i++) {
				let data = []
				let result = results[i]
				result.forEach(function (item) {
					let row = []
					let titles = []
					for (let i in item) {
						if (i == 'password') {
							continue;
						}
						titles.push(translate['es'][i] || i)
						if(item[i]===null){
							row.push('')
						}else{
							row.push(item[i])
						}
					}
					if (data.length == 0) {
						data.push(titles)
					}
					data.push(row)
				})
				let sname = translate['es'][tables[i]] || tables[i]
				sname = sname.split(" ").join("").split("/").join("")
				console.log(data)
				sheets[sname] = XLSX.utils.aoa_to_sheet(data)
			}
			let trans = []
			tables.forEach((table)=>{
				let sname = translate['es'][table] || table
				sname = sname.split(" ").join("").split("/").join("")
				trans.push(sname)
			})
			let workbook = {
				SheetNames: trans,
				Sheets: sheets
			}
			return XLSX.write(workbook, wopts)
		})
	}
	getMap.set('contact', { method: get_contact, permits: Permissions.NONE })
	getMap.set('faq', { method: get_faq, permits: Permissions.NONE })
	getMap.set('social', { method: get_social, permits: Permissions.NONE })
	getMap.set('footer', { method: get_footer, permits: Permissions.NONE })
	getMap.set('banner', { method: get_entity_banner, permits: Permissions.NONE })
	getMap.set('type_banner', { method: get_type_banner, permits: Permissions.NONE })
	getMap.set('config', { method: get_config, permits: Permissions.NONE })
	getMap.set('export', { method: get_export, permits: Permissions.NONE })
	/**
	 * @api {post} api/platform/contact Create contact information
	 * @apiName Postcontact
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {String} lastname 
	 * @apiParam {String} topic 
	 * @apiParam {Text} message 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var create_contact = function (user, body) {
		return model_contact.create(body)
	}
	/**
	 * @api {post} api/platform/faq Create faq information
	 * @apiName Postfaq
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Text} question 
	 * @apiParam {Text} answer 
	 * @apiParam {Boolean} active 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var create_faq = function (user, body) {
		return model_faq.create(body)
	}
	/**
	 * @api {post} api/platform/social Create social information
	 * @apiName Postsocial
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {String} icon 
	 * @apiParam {String} link 
 	 * 
	 */
	var create_social = function (user, body) {
		return model_social.create(body)
	}
	/**
	 * @api {post} api/platform/footer Create footer information
	 * @apiName Postfooter
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} title 
	 * @apiParam {Text} text 
 	 * 
	 */
	var create_footer = function (user, body) {
		return model_footer.create(body)
	}
	/**
	 * @api {post} api/platform/banner Create banner information
	 * @apiName Postbanner
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Text} text 
	 * @apiParam {String} directory 
	 * @apiParam {Number} id_type_banner 
	 * @apiParam {Number} position 
 	 * 
	 */
	var create_entity_banner = function (user, body,files) {
		let promises = []
		let order =[]
		for(var i in files){
			order.push(i)
			promises.push(utiles.uploadFileToGCS(user.id, files[i], user.id, files[i].type))
		}
		if(promises.length){
			return Promise.all(promises).then((urls)=>{
				for(var i in urls){
					body[order[i]] = urls[i]
				}
				return model_entity_banner.create(body)
			})
		}
		return model_entity_banner.create(body)
	}
	/**
	 * @api {post} api/platform/type_banner Create type_banner information
	 * @apiName Posttype_banner
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
 	 * 
	 */
	var create_type_banner = function (user, body) {
		return model_type_banner.create(body)
	}
	/**
	 * @api {post} api/platform/config Create config information
	 * @apiName Postconfig
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} header 
	 * @apiParam {String} address 
	 * @apiParam {String} postal_code 
	 * @apiParam {String} phone 
	 * @apiParam {String} free_phone 
	 * @apiParam {String} anticorruption_phone 
	 * @apiParam {String} email_PQRS 
	 * @apiParam {String} schedulle 
 	 * 
	 */
	var create_config = function (user, body, files) {
		for(var i in files){
			order.push(i)
			promises.push(utiles.uploadFileToGCS(user.id, files[i], user.id, files[i].type))
		}
		if(promises.length){
			return Promise.all(promises).then((urls)=>{
				for(var i in urls){
					body[order[i]] = urls[i]
				}
				return model_config.create(body)
			})
		}else{
			return model_config.create(body)
		}
	}
	postMap.set('contact', { method: create_contact, permits: Permissions.ADMIN_PLATFORM })
	postMap.set('faq', { method: create_faq, permits: Permissions.ADMIN_PLATFORM })
	postMap.set('social', { method: create_social, permits: Permissions.ADMIN_PLATFORM })
	postMap.set('footer', { method: create_footer, permits: Permissions.ADMIN_PLATFORM })
	postMap.set('banner', { method: create_entity_banner, permits: Permissions.ADMIN_PLATFORM })
	postMap.set('type_banner', { method: create_type_banner, permits: Permissions.ADMIN_PLATFORM })
	postMap.set('config', { method: create_config, permits: Permissions.ADMIN_PLATFORM })
	/**
	 * @api {put} api/platform/contact Update contact information
	 * @apiName Putcontact
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {String} lastname 
	 * @apiParam {String} topic 
	 * @apiParam {Text} message 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var update_contact = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_contact.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/platform/faq Update faq information
	 * @apiName Putfaq
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Text} question 
	 * @apiParam {Text} answer 
	 * @apiParam {Boolean} active 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var update_faq = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_faq.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/platform/social Update social information
	 * @apiName Putsocial
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {String} icon 
	 * @apiParam {String} link 
 	 * 
	 */
	var update_social = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_social.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/platform/footer Update footer information
	 * @apiName Putfooter
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} title 
	 * @apiParam {Text} text 
 	 * 
	 */
	var update_footer = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_footer.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/platform/banner Update banner information
	 * @apiName Putbanner
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Text} text 
	 * @apiParam {String} directory 
	 * @apiParam {Number} id_type_banner 
	 * @apiParam {Number} position 
 	 * 
	 */
	var update_entity_banner = function (user, body,files) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		let promises = []
		let order =[]
		for(var i in files){
			order.push(i)
			promises.push(utiles.uploadFileToGCS(user.id, files[i], user.id, files[i].type))
		}
		if(promises.length){
			return Promise.all(promises).then((urls)=>{
				for(var i in urls){
					body[order[i]] = urls[i]
				}
				return model_entity_banner.update(body,{id:body.id})
			})
		}
		return model_entity_banner.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/platform/type_banner Update type_banner information
	 * @apiName Puttype_banner
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
 	 * 
	 */
	var update_type_banner = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_type_banner.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/platform/config Update config information
	 * @apiName Putconfig
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} header 
	 * @apiParam {String} address 
	 * @apiParam {String} postal_code 
	 * @apiParam {String} phone 
	 * @apiParam {String} free_phone 
	 * @apiParam {String} anticorruption_phone 
	 * @apiParam {String} email_PQRS 
	 * @apiParam {String} schedulle 
 	 * 
	 */
	var update_config = function (user, body, files) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		let promises = []
		let order =[]
		for(var i in files){
			order.push(i)
			promises.push(utiles.uploadFileToGCS(user.id, files[i], user.id, files[i].type))
		}
		if(promises.length){
			return Promise.all(promises).then((urls)=>{
				for(var i in urls){
					body[order[i]] = urls[i]
				}
				return model_config.update(body,{id:body.id})
			})
		}
		return model_config.update(body,{id:body.id})
	}
	putMap.set('contact', { method: update_contact, permits: Permissions.ADMIN_PLATFORM })
	putMap.set('faq', { method: update_faq, permits: Permissions.ADMIN_PLATFORM })
	putMap.set('social', { method: update_social, permits: Permissions.ADMIN_PLATFORM })
	putMap.set('footer', { method: update_footer, permits: Permissions.ADMIN_PLATFORM })
	putMap.set('banner', { method: update_entity_banner, permits: Permissions.ADMIN_PLATFORM })
	putMap.set('type_banner', { method: update_type_banner, permits: Permissions.ADMIN_PLATFORM })
	putMap.set('config', { method: update_config, permits: Permissions.ADMIN_PLATFORM })
	/**
	 * @api {delete} api/platform/contact Delete contact information
	 * @apiName Deletecontact
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {String} lastname 
	 * @apiParam {String} topic 
	 * @apiParam {Text} message 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var delete_contact = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_contact.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/platform/faq Delete faq information
	 * @apiName Deletefaq
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Text} question 
	 * @apiParam {Text} answer 
	 * @apiParam {Boolean} active 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var delete_faq = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_faq.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/platform/social Delete social information
	 * @apiName Deletesocial
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {String} icon 
	 * @apiParam {String} link 
 	 * 
	 */
	var delete_social = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_social.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/platform/footer Delete footer information
	 * @apiName Deletefooter
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} title 
	 * @apiParam {Text} text 
 	 * 
	 */
	var delete_footer = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_footer.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/platform/banner Delete banner information
	 * @apiName Deletebanner
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Text} text 
	 * @apiParam {String} directory 
	 * @apiParam {Number} id_type_banner 
	 * @apiParam {Number} position 
 	 * 
	 */
	var delete_entity_banner = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_banner.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/platform/type_banner Delete type_banner information
	 * @apiName Deletetype_banner
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
 	 * 
	 */
	var delete_type_banner = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_type_banner.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/platform/config Delete config information
	 * @apiName Deleteconfig
	 * @apiGroup platform
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} header 
	 * @apiParam {String} address 
	 * @apiParam {String} postal_code 
	 * @apiParam {String} phone 
	 * @apiParam {String} free_phone 
	 * @apiParam {String} anticorruption_phone 
	 * @apiParam {String} email_PQRS 
	 * @apiParam {String} schedulle 
 	 * 
	 */
	var delete_config = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_config.delete(body,{id:body.id})
	}
	deleteMap.set('contact', { method: delete_contact, permits: Permissions.ADMIN_PLATFORM })
	deleteMap.set('faq', { method: delete_faq, permits: Permissions.ADMIN_PLATFORM })
	deleteMap.set('social', { method: delete_social, permits: Permissions.ADMIN_PLATFORM })
	deleteMap.set('footer', { method: delete_footer, permits: Permissions.ADMIN_PLATFORM })
	deleteMap.set('banner', { method: delete_entity_banner, permits: Permissions.ADMIN_PLATFORM })
	deleteMap.set('type_banner', { method: delete_type_banner, permits: Permissions.ADMIN_PLATFORM })
	deleteMap.set('config', { method: delete_config, permits: Permissions.ADMIN_PLATFORM })
	var params = [getMap, postMap, putMap, deleteMap]
	BaseController.apply(this, params)
	//---------------------------------------------------------------
	return this;
}
util.inherits(platform_controller, BaseController)
module.exports = platform_controller