/**  * CONTROLLER AUTO_GENERATED BY DMT-GENERATOR
 * place
 * DMT 2017
 * GENERATED: 13 / 7 / 2017 - 13:17:41
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
var User = require("../models/user.js")
var Institution_user_model = require("../models/institution_user.js")
var User_role_model = require('../models/user_role.js')
/* generador de password random*/
var pass_generator = require('generate-password')

//----------------------------------------------------
// AGREGADO SANTIAGO
//----------------------------------------------------
var MYSQL = require('../utils/model-mysql.js')
//----------------------------------------------------
var place_controller = function () {
	var model_entity_institution = new entity_institution()
	var model_entity_city = new entity_city()
	var model_region = new region()
	//----------------------------------------------------
	// AGREGADO RECIENTEMENTE
	//----------------------------------------------------
	var my_sql = new MYSQL()
	var userModel = new User()
	var institution_user = new Institution_user_model()
	var user_role = new User_role_model()
	//----------------------------------------------------

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
	 *		"id": 68,
	 *		"name": "This is an example text",
	 *		"nit": "This is an example text",
	 *		"address": "This is an example text",
	 *		"website": "This is an example text",
	 *		"email": "This is an example text",
	 *		"second_email": "This is an example text",
	 *		"phone": "This is an example text",
	 *		"head_sector": 0,
	 *		"timestamp": "1969-05-20",
	 *		"designation_act": "This is an example text",
	 *		"legalrep_name": "This is an example text",
	 *		"legalrep_secondname": "This is an example text",
	 *		"legalrep_lastname": "This is an example text",
	 *		"legalrep_secondlastname": "This is an example text",
	 *		"leaglrep_document": "This is an example text",
	 *		"legalrep_typedoc": 100,
	 *		"legalrep_email": "This is an example text",
	 *		"flag_hall": 0,
	 *		"ranking_hall": 98,
	 *		"city": {
	 *			"id": 10,
	 *			"name": "This is an example text",
	 *			"code": "This is an example text",
	 *			"latitude": 73,
	 *			"longitude": 72,
	 *			"region": {
	 *				"id": 70,
	 *				"name": "This is an example text",
	 *				"id_capital": 63,
	 *				"code": "This is an example text"
	 *			}
	 *		},
	 *		"region": {
	 *			"id": 51,
	 *			"name": "This is an example text",
	 *			"id_capital": 19,
	 *			"code": "This is an example text"
	 *		},
	 *		"creator": {
	 *			"id": 44,
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
	 *			"tmp_pwd": 1,
	 *			"flag_hall": 0,
	 *			"ranking_hall": 37,
	 *			"terms": 1,
	 *			"newsletter": 0,
	 *			"timestamp": "1969-05-20",
	 *			"id_type_document": 19,
	 *			"availability": {
	 *				"id": 73,
	 *				"name": "This is an example text"
	 *			},
	 *			"level": {
	 *				"id": 65,
	 *				"name": "This is an example text"
	 *			},
	 *			"city": {
	 *				"id": 73,
	 *				"name": "This is an example text",
	 *				"code": "This is an example text",
	 *				"latitude": 43,
	 *				"longitude": 21,
	 *				"region": {
	 *					"id": 4,
	 *					"name": "This is an example text",
	 *					"id_capital": 27,
	 *					"code": "This is an example text"
	 *				}
	 *			}
	 *		},
	 *		"users": [
	 *			{
	 *				"id": 97,
	 *				"picture": "This is an example text",
	 *				"name": "This is an example text",
	 *				"secondname": "This is an example text",
	 *				"lastname": "This is an example text",
	 *				"secondlastname": "This is an example text",
	 *				"email": "This is an example text",
	 *				"phone": "This is an example text",
	 *				"extension": "This is an example text",
	 *				"mobile": "This is an example text",
	 *				"active": 1,
	 *				"verified": 1,
	 *				"tmp_pwd": 0,
	 *				"flag_hall": 0,
	 *				"ranking_hall": 20,
	 *				"terms": 0,
	 *				"newsletter": 1,
	 *				"timestamp": "1969-05-20",
	 *				"id_type_document": 11,
	 *				"availability": {
	 *					"id": 45,
	 *					"name": "This is an example text"
	 *				},
	 *				"level": {
	 *					"id": 71,
	 *					"name": "This is an example text"
	 *				},
	 *				"city": {
	 *					"id": 38,
	 *					"name": "This is an example text",
	 *					"code": "This is an example text",
	 *					"latitude": 53,
	 *					"longitude": 94,
	 *					"region": {
	 *						"id": 10,
	 *						"name": "This is an example text",
	 *						"id_capital": 91,
	 *						"code": "This is an example text"
	 *					}
	 *				}
	 *			}
	 *		]
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_entity_institution = function (user, params) {
		return _get(model_entity_institution, user, params)
	}




	var get_entity_institution_hall = function (user, params) {
		return _get(model_entity_institution, user, { filter_field: "flag_hall", filter_value: "1" })
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
	 *		"id": 80,
	 *		"name": "This is an example text",
	 *		"code": "This is an example text",
	 *		"latitude": 89,
	 *		"longitude": 23,
	 *		"region": {
	 *			"id": 78,
	 *			"name": "This is an example text",
	 *			"id_capital": 36,
	 *			"code": "This is an example text"
	 *		}
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_entity_city = function (user, params) {
		return _get(model_entity_city, user, params)
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
	 *		"id": 71,
	 *		"name": "This is an example text",
	 *		"id_capital": 34,
	 *		"code": "This is an example text"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_region = function (user, params) {
		return _get(model_region, user, params)
	}
	getMap.set('institution', { method: get_entity_institution, permits: Permissions.NONE })
	getMap.set('institution_hall', { method: get_entity_institution_hall, permits: Permissions.NONE })
	getMap.set('city', { method: get_entity_city, permits: Permissions.NONE })
	getMap.set('region', { method: get_region, permits: Permissions.NONE })
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
	 * @apiParam {Boolean} head_sector 
	 * @apiParam {Date} timestamp 
	 * @apiParam {String} designation_act 
	 * @apiParam {String} legalrep_name 
	 * @apiParam {String} legalrep_secondname 
	 * @apiParam {String} legalrep_lastname 
	 * @apiParam {String} legalrep_secondlastname 
	 * @apiParam {String} leaglrep_document 
	 * @apiParam {Number} legalrep_typedoc 
	 * @apiParam {String} legalrep_email 
	 * @apiParam {Boolean} flag_hall 
	 * @apiParam {Number} ranking_hall 
	 * @apiParam {Number} id_city 
	 * @apiParam {Number} id_region 
	 * @apiParam {Number} id_user_creator 
	 * @apiParam {Object} city 
	 * @apiParam {Object} region 
	 * @apiParam {Object} creator 
	 * @apiParam {Array} users 
 	 * 
	 */
	var create_entity_institution = function (user, body) {
		return model_entity_institution.create(body)
		//return [user, ]
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
			//Generar pasword temporal para entidad a registrar y activar por e-mail
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
				secondname: body.secondname || "",
				lastname: body.lastname || "",
				secondlastname: body.secondlastname || "",
				email: body.email,
				phone: body.phone || "",
				extension: body.extension || "",
				mobile: body.mobile || "",
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
						role = "Ciudadano"
						break
					case 2:
						role = "Evaluador"
						break
					case 3:
						role = "Administrador"
						break
					case 4:
						role = "Entidad"
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
			<p><a href='http://www.sellodeexcelencia.gov.co/#!/activar-cuenta?token=${token}&email=${email}'>Haz click aqui para activar tu cuenta</a> </p>
			<p>Nuestros mejores deseos. </p>

			El equipo del Sello de Excelencia
			`
			return utiles.sendEmail(email, null, null, "Registro Sello de Excelencia", template).then(() => {
				return { message: "Registro Exitoso." }
			})
		})
	}


	postMap.set('register_institution', { method: register_institution, permits: Permissions.NONE })
	postMap.set('institution', { method: create_entity_institution, permits: Permissions.ADMIN })
	postMap.set('city', { method: create_entity_city, permits: Permissions.ADMIN })
	postMap.set('region', { method: create_region, permits: Permissions.ADMIN })
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
	 * @apiParam {Boolean} head_sector 
	 * @apiParam {Date} timestamp 
	 * @apiParam {String} designation_act 
	 * @apiParam {String} legalrep_name 
	 * @apiParam {String} legalrep_secondname 
	 * @apiParam {String} legalrep_lastname 
	 * @apiParam {String} legalrep_secondlastname 
	 * @apiParam {String} leaglrep_document 
	 * @apiParam {Number} legalrep_typedoc 
	 * @apiParam {String} legalrep_email 
	 * @apiParam {Boolean} flag_hall 
	 * @apiParam {Number} ranking_hall 
	 * @apiParam {Number} id_city 
	 * @apiParam {Number} id_region 
	 * @apiParam {Number} id_user_creator 
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
		return model_entity_institution.update(body, { id: body.id })
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
		return model_entity_city.update(body, { id: body.id })
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
	 * @apiParam {String} code 
 	 * 
	 */
	var update_region = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_region.update(body, { id: body.id })
	}
	putMap.set('institution', { method: update_entity_institution, permits: Permissions.ADMIN })
	putMap.set('city', { method: update_entity_city, permits: Permissions.ADMIN })
	putMap.set('region', { method: update_region, permits: Permissions.ADMIN })
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
	 * @apiParam {Boolean} head_sector 
	 * @apiParam {Date} timestamp 
	 * @apiParam {String} designation_act 
	 * @apiParam {String} legalrep_name 
	 * @apiParam {String} legalrep_secondname 
	 * @apiParam {String} legalrep_lastname 
	 * @apiParam {String} legalrep_secondlastname 
	 * @apiParam {String} leaglrep_document 
	 * @apiParam {Number} legalrep_typedoc 
	 * @apiParam {String} legalrep_email 
	 * @apiParam {Boolean} flag_hall 
	 * @apiParam {Number} ranking_hall 
	 * @apiParam {Number} id_city 
	 * @apiParam {Number} id_region 
	 * @apiParam {Number} id_user_creator 
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
		return model_entity_institution.delete(body, { id: body.id })
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
		return model_entity_city.delete(body, { id: body.id })
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
	 * @apiParam {String} code 
 	 * 
	 */
	var delete_region = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_region.delete(body, { id: body.id })
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
