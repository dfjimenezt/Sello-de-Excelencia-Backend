/**  * CONTROLLER AUTO_GENERATED BY DMT-GENERATOR
 * service
 * DMT 2017
 * GENERATED: 5 / 9 / 2017 - 7:39:27
 **/
var BaseController = require('../utils/controller.js')
var util = require('util');
var utiles = require('../utils/utiles.js')
var Errors = require('../utils/errors.js')
var Permissions = require('../utils/permissions.js')
var Auth_ctrl = require('./auth.js')
var entity_service = require('../models/entity_service.js')
var category = require('../models/category.js')
var status = require('../models/status.js')
var entity_service_status = require('../models/entity_service_status.js')
var entity_service_comment = require('../models/entity_service_comment.js')
var emiter = require('../events/emiter.js').instance
var service_controller = function () {
	var model_entity_service = new entity_service()
	var model_category = new category()
	var model_status = new status()
	var model_entity_service_status = new entity_service_status()
	var model_entity_service_comment = new entity_service_comment()
	//---------------------------------------------------------------
	var getMap = new Map(), postMap = new Map(), putMap = new Map(), deleteMap = new Map()
	var _get = function (model, user, params) {
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
			simple: params.simple,
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
	 *		"id": 23,
	 *		"name": "This is an example text",
	 *		"url": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"id_category": 61,
	 *		"id_institution": 95,
	 *		"id_user": 27,
	 *		"hash": "This is an example text",
	 *		"rate": 27,
	 *		"test_user": "This is an example text",
	 *		"test_password": "This is an example text",
	 *		"is_active": 1,
	 *		"is_product": 0,
	 *		"is_service": 0,
	 *		"timestamp": "1969-05-20",
	 *		"current_status": 12,
	 *		"datetime": "1969-05-20"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_entity_service = function (user, params, req, res) {
		if (params.certificate) {
			let CONSTANTS = require('../events/constants.js')
			let _service = null
			return model_entity_service.getByUid(params.id).
				then((result)=>{
					_service = result.data[0]
					return model_entity_service_status.getByParams({
						id_service:_service.id,
						id_status:CONSTANTS.SERVICE.CUMPLE
					})
				}).
				then((results) => {
					let _status = null
					let now = new Date()
					results.data.forEach((status)=>{
						if(status.valid_to > now){
							if(_status == null){
								_status = status
							}else{
								if(status.valid_to > _status.valid_to){
									_status = status
								}
							}
						}
					})
					res.writeHead(200, { 'Content-Type': 'application/pdf' });
					var hummus = require('hummus');
					var pdfWriter = hummus.createWriter(new hummus.PDFStreamForResponse(res));
					let page = pdfWriter.createPage(0, 0, 842, 595)
					var cxt = pdfWriter.startPageContentContext(page)
					let font = pdfWriter.getFontForFile('./app/assets/UniversCondensed.ttf')
					cxt.drawImage(0, 0, './app/assets/diploma.png')
					let _y = 480
					let size = font.calculateTextDimensions('CERTIFICADO',60);
					let center = 424 - size.width / 2
					cxt.writeText('CERTIFICADO', center,_y,
						{
							font: font,
							size: 60,
							colorspace: 'rgb',
							color: 0x694a8b
						}
					)
					_y -= 25
					size = font.calculateTextDimensions('DE RECONOCIMIENTO',30);
					center = 424 - size.width / 2
					cxt.writeText('DE RECONOCIMIENTO', center, _y,
						{
							font: font,
							size: 30,
							colorspace: 'rgb',
							color: 0x694a8b
						}
					)
					_y -= 50
					size = font.calculateTextDimensions('EL MINISTERIO DE TECNOLOGÍAS DE LA INFORMACIÓN Y LAS',16);
					center = 424 - size.width / 2
					cxt.writeText('EL MINISTERIO DE TECNOLOGÍAS DE LA INFORMACIÓN Y LAS', center, _y,
						{
							font: font,
							size: 16,
							colorspace: 'rgb',
							color: 0X5f676a
						}
					)
					_y -= 20
					size = font.calculateTextDimensions('COMUNICACIONES A TRAVÉS DE LA DIRECCIÓN DE GOBIERNO DIGITAL',16);
					center = 424 - size.width / 2
					cxt.writeText('COMUNICACIONES A TRAVÉS DE LA DIRECCIÓN DE GOBIERNO DIGITAL', center, _y,
						{
							font: font,
							size: 16,
							colorspace: 'rgb',
							color: 0X5f676a
						}
					)
					_y -= 20
					size = font.calculateTextDimensions('CERTIFICA QUE',13);
					center = 424 - size.width / 2
					cxt.writeText('CERTIFICA QUE', center, _y,
						{
							font: font,
							size: 13,
							colorspace: 'rgb',
							color: 0X5f676a
						}
					)
					_y -= 30
					size = font.calculateTextDimensions(_service.institution.name,24);
					center = 424 - size.width / 2
					cxt.writeText(_service.institution.name.toUpperCase(), center, _y,
						{
							font: font,
							size: 24,
							colorspace: 'rgb',
							color: 0X5f676a
						}
					)
					_y -= 20
					size = font.calculateTextDimensions('SE POSTULÓ Y CUMPLIÓ CON LOS REQUISITOS DE CALIDAD EXIGIDOS POR',13);
					center = 424 - size.width / 2
					cxt.writeText('SE POSTULÓ Y CUMPLIÓ CON LOS REQUISITOS DE CALIDAD EXIGIDOS POR', center, _y,
						{
							font: font,
							size: 13,
							colorspace: 'rgb',
							color: 0X5f676a
						}
					)
					_y -= 20
					size = font.calculateTextDimensions('EL MINISTERIO TIC, PARA EL NIVEL ___ Y LE OTORGA EL SELLO DE EXCELENCIA',13);
					center = 424 - size.width / 2
					cxt.writeText('EL MINISTERIO TIC, PARA EL NIVEL ', center, _y,
						{
							font: font,
							size: 13,
							colorspace: 'rgb',
							color: 0X5f676a
						}
					)
					size = font.calculateTextDimensions('EL MINISTERIO TIC, PARA EL NIVEL_',13);
					center += size.width
					cxt.writeText(''+_status.level, center, _y,
						{
							font: font,
							size: 16,
							colorspace: 'rgb',
							color: 0X5f676a
						}
					)
					size = font.calculateTextDimensions(' '+_status.level+' ',16);
					center += size.width
					cxt.writeText(' Y LE OTORGA EL SELLO DE EXCELENCIA', center, _y,
						{
							font: font,
							size: 13,
							colorspace: 'rgb',
							color: 0X5f676a
						}
					)
					_y -= 20
					size = font.calculateTextDimensions('GOBIERNO DIGITAL AL PRODUCTO ',15);
					center = 424 - size.width / 2
					cxt.writeText('GOBIERNO DIGITAL AL PRODUCTO', center, _y,
						{
							font: font,
							size: 13,
							colorspace: 'rgb',
							color: 0X5f676a
						}
					)
					size = font.calculateTextDimensions(_service.name,16);
					let lines = 1
					let _names = []
					if(size.width > 400){
						lines = Math.ceil(size.width / 400)
						let names = _service.name.split(" ")
						let glue = names.length / lines
						let count = 0
						let current = []
						while(names.length){
							if(count < glue){
								current.push(names.splice(0,1))
								count++;
							}
							if(count == glue){
								let n = current.join(' ')
								_names.push(n)
								current = []						
								count = 0		
							}
						}
					}else{
						_names.push(_service.name)
					}
					
					while (_names.length){
						_y -= 22
						_t = _names.splice(0,1)[0]
						size = font.calculateTextDimensions(_t,16);
						center = 424 - size.width / 2
						cxt.writeText(_t.toUpperCase(), center, _y,
							{
								font: font,
								size: 16,
								colorspace: 'rgb',
								color: 0X5f676a
							}
						)
					}
					cxt.writeText('DIRECTORA DE GOBIERNO DIGITAL', 338, 595-488,
						{
							font: font,
							size: 16,
							colorspace: 'rgb',
							color: 0x694a8b
						}
					)
					let date = _status.timestamp.toISOString().substr(0,10);
					size = font.calculateTextDimensions(date,15);
					center = 424 - size.width / 2
					cxt.writeText(date, center, 595-525,
						{
							font: font,
							size: 11,
							colorspace: 'rgb',
							color: 0X5f676a
						}
					)
					pdfWriter.writePage(page)
					pdfWriter.end()
				})
		} else {
			if(params.certified){
				return model_entity_service.getByPostulateCertificationDate(params)
			}
			params.order = 'id desc'
			return _get(model_entity_service, user, params)
		}
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
	 *		"id": 28,
	 *		"name": "This is an example text"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_category = function (user, params) {
		return _get(model_category, user, params)
	}
	/**
	 * @api {get} api/service/status Request status information
	 * @apiName Getstatus
	 * @apiGroup service
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
	 *		"id": 85,
	 *		"name": "This is an example text",
	 *		"duration": 93,
	 *		"pre_end": 39,
	 *		"alert": 1
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_status = function (user, params) {
		return _get(model_status, user, params)
	}
	/**
	 * @api {get} api/service/service_status Request service_status information
	 * @apiName Getservice_status
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
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
	 *		"id_service": 1,
	 *		"id_status": 18,
	 *		"level": 0,
	 *		"valid_to": "1969-05-20",
	 *		"timestamp": "1969-05-20"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_entity_service_status = function (user, params) {
		return _get(model_entity_service_status, user, params)
	}
	/**
	 * @api {get} api/service/service_comment Request service_comment information
	 * @apiName Getservice_comment
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id service_comment unique ID.
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
	 *		"id_service": 48,
	 *		"id_user": 43,
	 *		"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet tortor quis turpis cursus tristique.",
	 *		"rate": 18,
	 *		"timestamp": "1969-05-20"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_entity_service_comment = function (user, params) {
		return _get(model_entity_service_comment, user, params)
	}
	getMap.set('service', { method: get_entity_service, permits: Permissions.NONE })
	getMap.set('category', { method: get_category, permits: Permissions.NONE })
	getMap.set('status', { method: get_status, permits: Permissions.NONE })
	getMap.set('service_status', { method: get_entity_service_status, permits: Permissions.NONE })
	getMap.set('service_comment', { method: get_entity_service_comment, permits: Permissions.NONE })
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
	 * @apiParam {Number} id_institution 
	 * @apiParam {Number} id_user 
	 * @apiParam {String} hash 
	 * @apiParam {Number} rate 
	 * @apiParam {String} test_user 
	 * @apiParam {String} test_password 
	 * @apiParam {Boolean} is_active 
	 * @apiParam {Boolean} is_product 
	 * @apiParam {Boolean} is_service 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Number} current_status 
	 * @apiParam {Date} datetime 
 	 * 
	 */
	var create_entity_service = function (user, body) {
		body.current_status = 10
		body.id_user = user.id
		return model_entity_service.create(body)
			.then((result) => {
				let valid = new Date();
				valid.setFullYear(valid.getUTCFullYear() + 1)
				return model_entity_service_status.create({
					id_service: body.id,
					id_status: 10,
					level: body.level,
					valid_to: valid
				})
			}).then(() => {
				return body
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
	 * @api {post} api/service/status Create status information
	 * @apiName Poststatus
	 * @apiGroup service
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
	 * @api {post} api/service/service_status Create service_status information
	 * @apiName Postservice_status
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id_service 
	 * @apiParam {Number} id_status 
	 * @apiParam {Boolean} level 
	 * @apiParam {Date} valid_to 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var create_entity_service_status = function (user, body) {
		return model_entity_service_status.create(body)
	}
	/**
	 * @api {post} api/service/service_comment Create service_comment information
	 * @apiName Postservice_comment
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_service 
	 * @apiParam {Number} id_user 
	 * @apiParam {Text} text 
	 * @apiParam {Number} rate 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var create_entity_service_comment = function (user, body) {
		body.id_user = user.id
		let _users = []
		return model_entity_service_comment.getByParams({ id_user: user.id, id_service: body.id_service })
			.then((results) => {
				if (results.length > 0) {
					throw utiles.informError(400)
				}
				return model_entity_service_comment.create(body)
			}).then((avg) => {
				emiter.emit('service.rated', body.id_service, avg);
			})
	}
	postMap.set('service', { method: create_entity_service, permits: Permissions.POSTULATE_SERVICE })
	postMap.set('category', { method: create_category, permits: Permissions.ADMIN_SERVICES })
	postMap.set('status', { method: create_status, permits: Permissions.ADMIN_SERVICES })
	postMap.set('service_status', { method: create_entity_service_status, permits: Permissions.ADMIN_SERVICES })
	postMap.set('service_comment', { method: create_entity_service_comment, permits: Permissions.NONE })
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
	 * @apiParam {Number} id_institution 
	 * @apiParam {Number} id_user 
	 * @apiParam {String} hash 
	 * @apiParam {Number} rate 
	 * @apiParam {String} test_user 
	 * @apiParam {String} test_password 
	 * @apiParam {Boolean} is_active 
	 * @apiParam {Boolean} is_product 
	 * @apiParam {Boolean} is_service 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Number} current_status 
	 * @apiParam {Date} datetime 
 	 * 
	 */
	var update_entity_service = function (user, body) {
		ctrl = this
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_service.update(body, { id: body.id })
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
		return model_category.update(body, { id: body.id })
	}
	/**
	 * @api {put} api/service/status Update status information
	 * @apiName Putstatus
	 * @apiGroup service
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
		return model_status.update(body, { id: body.id })
	}
	/**
	 * @api {put} api/service/service_status Update service_status information
	 * @apiName Putservice_status
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id_service 
	 * @apiParam {Number} id_status 
	 * @apiParam {Boolean} level 
	 * @apiParam {Date} valid_to 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var update_entity_service_status = function (user, body) {
		if (!body.id_service) {
			throw utiles.informError(400)
		}
		return model_entity_service_status.update(body, { id_service: body.id_service })
	}
	/**
	 * @api {put} api/service/service_comment Update service_comment information
	 * @apiName Putservice_comment
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_service 
	 * @apiParam {Number} id_user 
	 * @apiParam {Text} text 
	 * @apiParam {Number} rate 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var update_entity_service_comment = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_service_comment.update(body, { id: body.id })
	}
	putMap.set('service', { method: update_entity_service, permits: Permissions.POSTULATE_SERVICE })
	putMap.set('category', { method: update_category, permits: Permissions.ADMIN_SERVICES })
	putMap.set('status', { method: update_status, permits: Permissions.ADMIN_SERVICES })
	putMap.set('service_status', { method: update_entity_service_status, permits: Permissions.ADMIN_SERVICES })
	putMap.set('service_comment', { method: update_entity_service_comment, permits: Permissions.ADMIN_SERVICES })
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
	 * @apiParam {Number} id_institution 
	 * @apiParam {Number} id_user 
	 * @apiParam {String} hash 
	 * @apiParam {Number} rate 
	 * @apiParam {String} test_user 
	 * @apiParam {String} test_password 
	 * @apiParam {Boolean} is_active 
	 * @apiParam {Boolean} is_product 
	 * @apiParam {Boolean} is_service 
	 * @apiParam {Date} timestamp 
	 * @apiParam {Number} current_status 
	 * @apiParam {Date} datetime 
 	 * 
	 */
	var delete_entity_service = function (user, body) {
		if (!user.id) {
			throw utiles.informError(400)
		}
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_service.getByUid('' + body.id).then((results) => {
			let service = results.data[0]
			let found = false
			user.institutions.forEach((institution) => {
				if (institution.id == service.id_institution) {
					found = true
				}
			})
			if (!found) {
				throw utiles.informError(100)
			}
			return model_entity_service.delete(body.id)
		})
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
		return model_category.delete(body, { id: body.id })
	}
	/**
	 * @api {delete} api/service/status Delete status information
	 * @apiName Deletestatus
	 * @apiGroup service
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
		return model_status.delete(body, { id: body.id })
	}
	/**
	 * @api {delete} api/service/service_status Delete service_status information
	 * @apiName Deleteservice_status
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id_service 
	 * @apiParam {Number} id_status 
	 * @apiParam {Boolean} level 
	 * @apiParam {Date} valid_to 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var delete_entity_service_status = function (user, body) {
		if (!body.id_service) {
			throw utiles.informError(400)
		}
		return model_entity_service_status.delete(body, { id_service: body.id_service })
	}
	/**
	 * @api {delete} api/service/service_comment Delete service_comment information
	 * @apiName Deleteservice_comment
	 * @apiGroup service
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {Number} id_service 
	 * @apiParam {Number} id_user 
	 * @apiParam {Text} text 
	 * @apiParam {Number} rate 
	 * @apiParam {Date} timestamp 
 	 * 
	 */
	var delete_entity_service_comment = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_service_comment.delete(body, { id: body.id })
	}
	deleteMap.set('service', { method: delete_entity_service, permits: Permissions.NONE })
	deleteMap.set('category', { method: delete_category, permits: Permissions.ADMIN_SERVICES })
	deleteMap.set('status', { method: delete_status, permits: Permissions.ADMIN_SERVICES })
	deleteMap.set('service_status', { method: delete_entity_service_status, permits: Permissions.ADMIN_SERVICES })
	deleteMap.set('service_comment', { method: delete_entity_service_comment, permits: Permissions.ADMIN_SERVICES })
	var params = [getMap, postMap, putMap, deleteMap]
	BaseController.apply(this, params)
	//---------------------------------------------------------------
	return this;
}
util.inherits(service_controller, BaseController)
module.exports = service_controller