/**  * CONTROLLER AUTO_GENERATED BY DMT-GENERATOR
 * place
 * DMT 2017
 * GENERATED: 24 / 8 / 2017 - 18:2:54
 **/
var BaseController = require('../utils/controller.js')
var util = require('util');
var utiles = require('../utils/utiles.js')
var Errors = require('../utils/errors.js')
var Permissions = require('../utils/permissions.js')
var Auth_ctrl = require('./auth.js')
var entity_institution = require('../models/entity_institution.js')
var entity_city = require('../models/entity_city.js')
var region = require('../models/region.js')
var country = require('../models/country.js')
var User = require("../models/user.js")
var Institution_user_model = require("../models/institution_user.js")
var Model_institution = require("../models/institution.js")
var User_role_model = require('../models/user_role.js')
var pass_generator = require('generate-password')
var MYSQL = require('../utils/model-mysql.js')
var place_controller = function () {
	var model_entity_institution = new entity_institution()
	var model_entity_city = new entity_city()
	var model_region = new region()
	var model_institution = new Model_institution()
	var model_country = new country()
	var my_sql = new MYSQL()
	var userModel = new User()
	var institution_user = new Institution_user_model()
	var user_role = new User_role_model()
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
	 * @api {get} api/place/institution Request institution information
	 * @apiName Getinstitution
	 * @apiGroup place
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id institution unique ID.
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
	 *		"name": "This is an example text",
	 *		"nit": "This is an example text",
	 *		"address": "This is an example text",
	 *		"website": "This is an example text",
	 *		"email": "This is an example text",
	 *		"second_email": "This is an example text",
	 *		"phone": "This is an example text",
	 *		"extension_phone": "This is an example text",
	 *		"head_sector": 1,
	 *		"timestamp": "1969-05-20",
	 *		"designation_act": "This is an example text",
	 *		"legalrep_name": "This is an example text",
	 *		"legalrep_secondname": "This is an example text",
	 *		"legalrep_lastname": "This is an example text",
	 *		"legalrep_secondlastname": "This is an example text",
	 *		"legalrep_document": "This is an example text",
	 *		"legalrep_typedoc": 57,
	 *		"legalrep_email": "This is an example text",
	 *		"legalrep_phone": "This is an example text",
	 *		"legalrep_mobile": "This is an example text",
	 *		"id_country": 56,
	 *		"city": {
	 *			"id": 83,
	 *			"name": "This is an example text",
	 *			"code": "This is an example text",
	 *			"latitude": 68,
	 *			"longitude": 14,
	 *			"region": {
	 *				"id": 78,
	 *				"name": "This is an example text",
	 *				"id_capital": 13,
	 *				"id_country": 16,
	 *				"code": "This is an example text"
	 *			}
	 *		},
	 *		"region": {
	 *			"id": 40,
	 *			"name": "This is an example text",
	 *			"id_capital": 73,
	 *			"id_country": 39,
	 *			"code": "This is an example text"
	 *		},
	 *		"creator": {
	 *			"id": 36,
	 *			"name": "This is an example text"
	 *		},
	 *		"users": [
	 *			{
	 *				"id": 84,
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
	 *				"points": 45,
	 *				"active": 1,
	 *				"verified": 1,
	 *				"alert": 1,
	 *				"terms": 1,
	 *				"newsletter": 0,
	 *				"timestamp": "1969-05-20",
	 *				"id_region": 82,
	 *				"id_country": 58,
	 *				"document": "This is an example text",
	 *				"availability": {
	 *					"id": 30,
	 *					"name": "This is an example text"
	 *				},
	 *				"city": {
	 *					"id": 72,
	 *					"name": "This is an example text",
	 *					"code": "This is an example text",
	 *					"latitude": 35,
	 *					"longitude": 92,
	 *					"region": {
	 *						"id": 86,
	 *						"name": "This is an example text",
	 *						"id_capital": 51,
	 *						"id_country": 20,
	 *						"code": "This is an example text"
	 *					}
	 *				},
	 *				"type_document": {
	 *					"id": 67,
	 *					"name": "This is an example text"
	 *				}
	 *			}
	 *		]
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_entity_institution = function (user, params) {
		return _get(model_entity_institution,user,params)
	}
	/**
	 * @api {get} api/place/city Request city information
	 * @apiName Getcity
	 * @apiGroup place
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id city unique ID.
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
	 *		"id": 3,
	 *		"name": "This is an example text",
	 *		"code": "This is an example text",
	 *		"latitude": 62,
	 *		"longitude": 60,
	 *		"region": {
	 *			"id": 94,
	 *			"name": "This is an example text",
	 *			"id_capital": 54,
	 *			"id_country": 18,
	 *			"code": "This is an example text"
	 *		}
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_entity_city = function (user, params) {
		return _get(model_entity_city,user,params)
	}
	/**
	 * @api {get} api/place/region Request region information
	 * @apiName Getregion
	 * @apiGroup place
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id region unique ID.
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
	 *		"id": 42,
	 *		"name": "This is an example text",
	 *		"id_capital": 63,
	 *		"id_country": 42,
	 *		"code": "This is an example text"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_region = function (user, params) {
		return _get(model_region,user,params)
	}
	
	var get_entity_institution_hall = function (user, params) {
		return _get(model_entity_institution, user, { filter_field: "flag_hall", filter_value: "1" })
	}

	var get_country = function (user, params) {
		return _get(model_country,user,params)
	}

	getMap.set('institution', { method: get_entity_institution, permits: Permissions.NONE })
	getMap.set('city', { method: get_entity_city, permits: Permissions.NONE })
	getMap.set('region', { method: get_region, permits: Permissions.NONE })
	getMap.set('institution_hall', { method: get_entity_institution_hall, permits: Permissions.NONE })
	getMap.set('country', { method: get_country, permits: Permissions.NONE })

	/**
	 * @api {post} api/place/institution Create institution information
	 * @apiName Postinstitution
	 * @apiGroup place
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {String} nit 
	 * @apiParam {String} address 
	 * @apiParam {String} website 
	 * @apiParam {String} email 
	 * @apiParam {String} second_email 
	 * @apiParam {String} phone 
	 * @apiParam {String} extension_phone 
	 * @apiParam {Boolean} head_sector 
	 * @apiParam {Date} timestamp 
	 * @apiParam {String} designation_act 
	 * @apiParam {String} legalrep_name 
	 * @apiParam {String} legalrep_secondname 
	 * @apiParam {String} legalrep_lastname 
	 * @apiParam {String} legalrep_secondlastname 
	 * @apiParam {String} legalrep_document 
	 * @apiParam {Number} legalrep_typedoc 
	 * @apiParam {String} legalrep_email 
	 * @apiParam {String} legalrep_phone 
	 * @apiParam {String} legalrep_mobile 
	 * @apiParam {Number} id_city 
	 * @apiParam {Number} id_region 
	 * @apiParam {Number} id_country 
	 * @apiParam {Number} id_user_creator 
	 * @apiParam {Number} id_institution_type 
	 * @apiParam {Object} city 
	 * @apiParam {Object} region 
	 * @apiParam {Object} creator 
	 * @apiParam {Array} users 
 	 * 
	 */
	var create_entity_institution = function (user, body) {
		return model_entity_institution.create(body)
	}
	/**
	 * @api {post} api/place/city Create city information
	 * @apiName Postcity
	 * @apiGroup place
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {String} code 
	 * @apiParam {Number} latitude 
	 * @apiParam {Number} longitude 
	 * @apiParam {Number} id_region 
	 * @apiParam {Object} region 
 	 * 
	 */
	var create_entity_city = function (user, body) {
		return model_entity_city.create(body)
	}
	/**
	 * @api {post} api/place/region Create region information
	 * @apiName Postregion
	 * @apiGroup place
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Number} id_capital 
	 * @apiParam {Number} id_country 
	 * @apiParam {String} code 
 	 * 
	 */
	var create_region = function (user, body) {
		return model_region.create(body)
	}
	
		/*
		 * POST api/place/register_institution
		 */
		var register_institution = function (toke, body) {
			let userId = "";
			let pass_user = "";
			let email = "";
			let role = "";
			return userModel.getUser(body.email).then((user) => {
				if (user) {
					throw utiles.informError(201) // user already exists
				}
				if (body.nit === undefined || body.email === undefined) {
					throw utiles.informError(400)
				}
				email = body.email
				//Generar password temporal para entidad a registrar y activar por e-mail
				pass_user = pass_generator.generate({
						length: 8,
						numbers: true
				})
				console.log(pass_user)
				var pass = utiles.createHmac('sha256')
				pass.update(pass_user)
				pass = pass.digest('hex')
				return userModel.create({
					name: body.name || "",
					//secondname: body.secondname || "",
					//lastname: body.lastname || "",
					//secondlastname: body.secondlastname || "",
					email: body.email,
					//phone: body.phone || "",
					//extension: body.extension || "",
					//mobile: body.mobile || "",
					active: false,
					verified: false,
					password: pass,
					tmp_pwd: true,
					terms: body.terms === "true",
					newsletter: body.newsletter === "true"
				})
			}).then((user) => {
				// if the user was created sucessfully
				if (user) {
					if (!body.role) {
						body.role = '4'
					}
					//create the role assignment
					user_role.create({
						id_user: user.insertId,
						id_role: parseInt(body.role)
					})
					userId = user.insertId
					// add the role manually reduce time
					user.role = body.role
	
					switch (body.role) {
						case 1:
							role = "ciudadano"
							break
						case 2:
							role = "evaluador"
							break
						case 3:
							role = "administrador"
							break
						case 4:
							role = "etidad"
							break
					}
					return create_entity_institution(user, body)
				} else {
					//if there was an error on creating the user
					throw utiles.informError(300)
				}
			}).then((institution) => {
				// insertar en tabla relacional
				institution_user.create({
					id_institution: institution.data.id,
					id_user: userId
				})
				// send an email to the user
				let token = utiles.sign(email)
				let template = `
				<p>Hola </p>
				<p>Te has registrado con exito como ${role} en la plataforma del Sello de Excelencia </p>
				<p>Tu contraseña para acceder es: ${pass_user} </p>
				<p><a href='http://www.sellodeexcelencia.gov.co/#!/activar-cuenta?token=${token}&email=${body.email}'>Haz click aqui para activar tu cuenta</a> </p>
				<p><a href='http://localhost:3000/api/auth/activate?token=${token}&email=${body.email}'>Haz click aqui para activar tu cuenta (localhost only dbg) </a> </p>
				<p>Nuestros mejores deseos. </p>
	
				El equipo del Sello de Excelencia
				`
				return utiles.sendEmail(email, null, null, "Registro Sello de Excelencia", template).then(() => {
					return { message: "Registro Exitoso." }
				})
			})
		}
	
		postMap.set('institution', { method: create_entity_institution, permits: Permissions.ADMIN })
		postMap.set('city', { method: create_entity_city, permits: Permissions.ADMIN })
		postMap.set('region', { method: create_region, permits: Permissions.ADMIN })
		postMap.set('register_institution', { method: register_institution, permits: Permissions.NONE })
	
	/**
	 * @api {put} api/place/institution Update institution information
	 * @apiName Putinstitution
	 * @apiGroup place
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {String} nit 
	 * @apiParam {String} address 
	 * @apiParam {String} website 
	 * @apiParam {String} email 
	 * @apiParam {String} second_email 
	 * @apiParam {String} phone 
	 * @apiParam {String} extension_phone 
	 * @apiParam {Boolean} head_sector 
	 * @apiParam {Date} timestamp 
	 * @apiParam {String} designation_act 
	 * @apiParam {String} legalrep_name 
	 * @apiParam {String} legalrep_secondname 
	 * @apiParam {String} legalrep_lastname 
	 * @apiParam {String} legalrep_secondlastname 
	 * @apiParam {String} legalrep_document 
	 * @apiParam {Number} legalrep_typedoc 
	 * @apiParam {String} legalrep_email 
	 * @apiParam {String} legalrep_phone 
	 * @apiParam {String} legalrep_mobile 
	 * @apiParam {Number} id_city 
	 * @apiParam {Number} id_region 
	 * @apiParam {Number} id_country 
	 * @apiParam {Number} id_user_creator 
	 * @apiParam {Number} id_institution_type 
	 * @apiParam {Object} city 
	 * @apiParam {Object} region 
	 * @apiParam {Object} creator 
	 * @apiParam {Array} users 
 	 * 
	 */
	var update_entity_institution = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_institution.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/place/city Update city information
	 * @apiName Putcity
	 * @apiGroup place
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {String} code 
	 * @apiParam {Number} latitude 
	 * @apiParam {Number} longitude 
	 * @apiParam {Number} id_region 
	 * @apiParam {Object} region 
 	 * 
	 */
	var update_entity_city = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_city.update(body,{id:body.id})
	}
	/**
	 * @api {put} api/place/region Update region information
	 * @apiName Putregion
	 * @apiGroup place
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Number} id_capital 
	 * @apiParam {Number} id_country 
	 * @apiParam {String} code 
 	 * 
	 */
	var update_region = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_region.update(body,{id:body.id})
	}
	
	/* 
	 * Actualizar institución 
	 * Ya habiéndo hecho login tiene el token "usuario"
	 * */
	var update_institution = function(token, body){
		return institution_user.getByParams({id_user : token.id}).then((institution_user_relation) => {
			return get_entity_institution(token, {id: institution_user_relation[0].id_institution}).then((institution) => {
				if(institution.data[0] != undefined){
					institution = institution.data[0]
					var institution_up = []
					institution_up.id = institution.id
					institution_up.id_user_creator = token.id
					institution_up.name = (body.name)? body.name : institution.name
					institution_up.nit = (body.nit)? body.nit : institution.nit
					institution_up.legalrep_name = (body.legalrep_name)? body.legalrep_name : institution.legalrep_name
					institution_up.legalrep_secondname = (body.legalrep_secondname)? body.legalrep_secondname : institution.legalrep_secondname
					// No existe en el UML
					institution.legalrep_phone = (body.legalrep_phone)? body.legalrep_phone : information.legalrep_phone
					institution_up.legalrep_lastname = (body.legalrep_lastname)? body.legalrep_lastname : institution.legalrep_lastname
					institution_up.legalrep_secondlastname = (body.legalrep_secondlastname)? body.legalrep_secondlastname : institution.legalrep_secondlastname
					institution.legalrep_mobile = (body.legalrep_mobile)? body.legalrep_mobile : institution.legalrep_mobile
					institution_up.legalrep_typedoc = (body.legalrep_typedoc)? parseInt(body.legalrep_typedoc) : institution.legalrep_typedoc
					//Corregir error de ortografía en el UML
					institution_up.legalrep_document = (body.legalrep_document)? body.legalrep_document : institution.legalrep_document
					institution_up.legalrep_email = (body.legalrep_email)? body.legalrep_email : institution.legalrep_email
					institution_up.phone = (body.institution_phone)? body.institution_phone : institution.phone
					institution.extension = (body.extension_phone)? body.extension_phone : institution.extension
					institution_up.email = (body.institution_email)? body.institution_email : institution.email
					// Es una relación
					institution_up.id_region = (body.id_region)? parseInt(body.id_region) : null
					institution_up.id_city = (body.id_city)? parseInt(body.id_city) : null
					//return update_entity_institution(token, institution_up).then(() => {
					return model_institution.update(institution_up,{ id: institution.id}).then(() => {
						return { message : "Update institution ok" } 
					})
				}	
			})
		})
	}

	putMap.set('institution', { method: update_entity_institution, permits: Permissions.ADMIN })
	putMap.set('city', { method: update_entity_city, permits: Permissions.ADMIN })
	putMap.set('region', { method: update_region, permits: Permissions.ADMIN })
	putMap.set('institution', { method: update_institution, permits: Permissions.PLATFORM })

	/**
	 * @api {delete} api/place/institution Delete institution information
	 * @apiName Deleteinstitution
	 * @apiGroup place
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {String} nit 
	 * @apiParam {String} address 
	 * @apiParam {String} website 
	 * @apiParam {String} email 
	 * @apiParam {String} second_email 
	 * @apiParam {String} phone 
	 * @apiParam {String} extension_phone 
	 * @apiParam {Boolean} head_sector 
	 * @apiParam {Date} timestamp 
	 * @apiParam {String} designation_act 
	 * @apiParam {String} legalrep_name 
	 * @apiParam {String} legalrep_secondname 
	 * @apiParam {String} legalrep_lastname 
	 * @apiParam {String} legalrep_secondlastname 
	 * @apiParam {String} legalrep_document 
	 * @apiParam {Number} legalrep_typedoc 
	 * @apiParam {String} legalrep_email 
	 * @apiParam {String} legalrep_phone 
	 * @apiParam {String} legalrep_mobile 
	 * @apiParam {Number} id_city 
	 * @apiParam {Number} id_region 
	 * @apiParam {Number} id_country 
	 * @apiParam {Number} id_user_creator 
	 * @apiParam {Number} id_institution_type 
	 * @apiParam {Object} city 
	 * @apiParam {Object} region 
	 * @apiParam {Object} creator 
	 * @apiParam {Array} users 
 	 * 
	 */
	var delete_entity_institution = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_institution.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/place/city Delete city information
	 * @apiName Deletecity
	 * @apiGroup place
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {String} code 
	 * @apiParam {Number} latitude 
	 * @apiParam {Number} longitude 
	 * @apiParam {Number} id_region 
	 * @apiParam {Object} region 
 	 * 
	 */
	var delete_entity_city = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_entity_city.delete(body,{id:body.id})
	}
	/**
	 * @api {delete} api/place/region Delete region information
	 * @apiName Deleteregion
	 * @apiGroup place
	 * @apiVersion 1.0.1
	 * 
	 * @apiParam {Number} id 
	 * @apiParam {String} name 
	 * @apiParam {Number} id_capital 
	 * @apiParam {Number} id_country 
	 * @apiParam {String} code 
 	 * 
	 */
	var delete_region = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_region.delete(body,{id:body.id})
	}
	deleteMap.set('institution', { method: delete_entity_institution, permits: Permissions.ADMIN })
	deleteMap.set('city', { method: delete_entity_city, permits: Permissions.ADMIN })
	deleteMap.set('region', { method: delete_region, permits: Permissions.ADMIN })
	var params = [getMap, postMap, putMap, deleteMap]
	BaseController.apply(this, params)
	//---------------------------------------------------------------
	return this;
}
util.inherits(place_controller, BaseController)
module.exports = place_controller