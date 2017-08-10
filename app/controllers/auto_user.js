var BaseController = require('../utils/controller.js')
var util = require('util')
var utiles = require('../utils/utiles.js')
var Permissions = require('../utils/permissions.js')

var User = require('../models/user.js')
//var Session = require('../models/session.js')
var User_role_model = require('../models/user_role.js')

//var Auth = function () {
  var userModel = new User()
  //var sessionModel = new Session()
  var user_role = new User_role_model()

  // ---------------------------------------------------------------

  var getMap = new Map()
  /**
   * @api {get} /auth/activate
   * @apiVersion 0.0.1
   * @apiName activate
   * @apiGroup Auth
   * @apiPermission none
   * activates an user email
   */
  var activate = function (token, params) {
    if(!params.email){ throw utiles.informError(400) }
    return userModel.getUser(params.email).then((user) => {
      if (!user) throw utiles.informError(202) // user doesnt exists      
      return userModel.update({active:1,verified:1}, { id: user.id })
    })
  }

  var postMap = new Map()
  /**
   * @api {post} /auth/login_fb
   * @apiVersion 0.0.1
   * @apiGroup Auth
   * @apiPermission none
   * Login FB
   */
  var login_fb = function (token, body) {
    return userModel.getUser(body.email).then((user) => {
      if (!user) {
        var password = Math.random().toString(36).substring(2, 8)
        var pass = utiles.createHmac('sha256')
        pass.update(password)
        pass = pass.digest('hex')
        return userModel.create({
          name: body.name,
          lastname: body.lastname,
          email: body.email,
          phone: body.phone || "",
          active: true,
          verified: true,
          password: pass,
          tmp_pwd: true,
          terms: body.terms === "true",
          newsletter: body.newsletter === "true"
        }).then((user) => {
          user_role.create({
            id_user: user.insertId,
            id_role: 1
          }).then(()=>{
            return userModel.getUser(body.email).then((user)=>{
              delete user.password
              // encode
              var now = new Date()
              now.setDate(now.getDate() + 15) // the token expires in 15 days
              var session = {
                token: utiles.sign(user),
                id_user: user.id,
                expires: now
              }
              sessionModel.create(session)
              var answer = utiles.informError(0)
              answer.token = session.token
              return answer
            })
          })
        })
      } else {
        delete user.password
        // encode
        var now = new Date()
        now.setDate(now.getDate() + 15) // the token expires in 15 days
        var session = {
          token: utiles.sign(user),
          id_user: user.id,
          expires: now
        }
        sessionModel.create(session)
        var answer = utiles.informError(0)
        answer.token = session.token
        return answer
      }
    })
  }


  /**
  * @api {post} /auth/login Login as a user
  * @apiVersion 0.0.1
  * @apiName loginUser
  * @apiGroup Auth
  * @apiPermission none
  *
  * @apiDescription In this case "apiErrorStructure" is defined and used.
  * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
  *
  * @apiParam {String} name Name of the User.
  * @apiParam {String} password Password of the User.
  *
  * @apiSuccessExample Success-Response:
	*      HTTP/1.1 200 OK
	*     {
  *       token:"123456789abcdef"
  *     }
  *
  */
  // TODO: deben validarse que llegan todos los parametros
  var login = function (token, body) {
    return userModel.getUser(body.email).then((user) => {
      if (!user) throw utiles.informError(202) // user doesnt exists
      else {
        var pass = utiles.createHmac('sha256')
        pass.update(body.password)
        pass = pass.digest('hex')
        if (user.password === pass) {
          if (user.active === 0) {
            throw utiles.informError(203) //user inactive
          }
          delete user.password
          // encode
          var now = new Date()
          now.setDate(now.getDate() + 15) // the token expires in 15 days
          var session = {
            token: utiles.sign(user),
            id_user: user.id,
            expires: now
          }
          sessionModel.create(session)
          var answer = utiles.informError(0)
          answer.token = session.token
          return answer
        } else {
          throw utiles.informError(200)
        }
      }
    })
  }

  /**
  * @api {post} /auth/register Register a new User
  * @apiVersion 0.0.1
  * @apiName registerUser
  * @apiGroup Auth
  * @apiPermission none
  *
  * @apiDescription In this case "apiErrorStructure" is defined and used.
  * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
  *
  * @apiParam {String} name Name of the User.
  *
  * @apiSuccess {Number} id The new Users-ID.
  *
  * @apiUse CreateUserError
  */
  // TODO: deben validarse que llegan todos los parametros
  var register = function (token, body) {
    return userModel.getUser(body.email).then((user) => {
      if (user) throw utiles.informError(201) // user already exists
      else {
        if(body.password === undefined || body.email === undefined){
          throw utiles.informError(400)
        }
        var pass = utiles.createHmac('sha256')
        pass.update(body.password)
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
          tmp_pwd: false,
          terms: body.terms === "true",
          newsletter: body.newsletter === "true"
        }).then(function (user) {
          // if the user was created sucessfully
          if (user) {
            let role = ""
            if (!body.role) {
              body.role = '1'
            }
            //create the role assignment
            user_role.create({
              id_user: user.insertId,
              id_role: parseInt(body.role)
            })
            // add the role manually reduce time
            user.role = body.role

            switch(body.role){
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
            // send an email to the user
            let token = utiles.sign(body.email)
            let template = `
            <p>Hola </p>
            <p>Te has registrado con exito como ${role} en la plataforma del Sello de Excelencia </p>
            <p>Tu contraseña para acceder es: ${body.password} </p>
            <p><a href='http://www.sellodeexcelencia.gov.co/#!/activar-cuenta?token=${token}&email=${body.email}'>Haz click aquí para activar tu cuenta</a> </p>
            <p>Nuestros mejores deseos. </p>
            
            El equipo del Sello de Excelencia
            ` 
            return utiles.sendEmail(body.email, null, null, "Registro Sello de Excelencia", template).then(()=>{
              return { message: "Registro Exitoso." }
            })
          } else {
            //if there was an error on creating the user
            throw utiles.informError(300)
          }
        })
      }
    })
  }

  /**
  * @api {post} /auth/recover Recover a user password
  * @apiVersion 0.0.1
  * @apiName recoverPasswordUser
  * @apiGroup Auth
  * @apiPermission none
  *
  * @apiDescription In this case "apiErrorStructure" is defined and used.
  * Define blocks with params that will be used in several functions, so you dont have to rewrite them.
  *
  * @apiParam {String} name Name of the User.
  *
  * @apiSuccess {Number} id The new Users-ID.
  *
  * @apiUse CreateUserError
  */
  // TODO: deben validarse que llegan todos los parametros
  var recover = function (token, body) {
    return userModel.getByParams({ email: body.email }).then((user) => {
      if (user.length === 0) { // if the user doesnt exists then send error
        return utiles.informError(202)
      } else { // send email and confirm
        var password = Math.random().toString(36).substring(2, 8)
        var pass = utiles.createHmac('sha256')
        pass.update(password)
        pass = pass.digest('hex')
        user.password = pass
        return userModel.update(user, { id: user.id }).then(() => {
          let template = "Hola " + user.name + "<p>Se ha asignado una nueva contraseña en la plataforma del Sello de Excelencia</p>"
            + "<p>Tu nueva contraseña para acceder es: " + password + "</p>" +
            "</p>Nuestros mejores deseos,<p>El equipo del Sello de Excelencia"

          utiles.sendEmail(user.email, null, null, "Recuperación de Contraseña", template)
          return utiles.informError(0)
        })
      }
    })
  }



  postMap.set('login', { method: login, permits: Permissions.NONE })
  postMap.set('login_fb', { method: login, permits: Permissions.NONE })
  postMap.set('register', { method: register, permits: Permissions.NONE })
  postMap.set('recover', { method: recover, permits: Permissions.NONE })

  var params = [getMap, postMap, null, null]
  BaseController.apply(this, params)
  // ---------------------------------------------------------------

  return this
}

util.inherits(Auth, BaseController)

module.exports = Auth





/**  * CONTROLLER AUTO_GENERATED BY DMT-GENERATOR
 * place
 * DMT 2017
 * GENERATED: 13 / 7 / 2017 - 13:42:17
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
var place_controller = function () {
	var model_entity_institution = new entity_institution()
	var model_entity_city = new entity_city()
	var model_region = new region()
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
	 *		"id": 95,
	 *		"name": "This is an example text",
	 *		"nit": "This is an example text",
	 *		"address": "This is an example text",
	 *		"website": "This is an example text",
	 *		"email": "This is an example text",
	 *		"second_email": "This is an example text",
	 *		"phone": "This is an example text",
	 *		"head_sector": 1,
	 *		"timestamp": "1969-05-20",
	 *		"designation_act": "This is an example text",
	 *		"legalrep_name": "This is an example text",
	 *		"legalrep_secondname": "This is an example text",
	 *		"legalrep_lastname": "This is an example text",
	 *		"legalrep_secondlastname": "This is an example text",
	 *		"leaglrep_document": "This is an example text",
	 *		"legalrep_typedoc": 27,
	 *		"legalrep_email": "This is an example text",
	 *		"flag_hall": 0,
	 *		"ranking_hall": 35,
	 *		"city": {
	 *			"id": 62,
	 *			"name": "This is an example text",
	 *			"code": "This is an example text",
	 *			"latitude": 26,
	 *			"longitude": 71,
	 *			"region": {
	 *				"id": 16,
	 *				"name": "This is an example text",
	 *				"id_capital": 33,
	 *				"code": "This is an example text"
	 *			}
	 *		},
	 *		"region": {
	 *			"id": 59,
	 *			"name": "This is an example text",
	 *			"id_capital": 60,
	 *			"code": "This is an example text"
	 *		},
	 *		"creator": {
	 *			"id": 32,
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
	 *			"tmp_pwd": 0,
	 *			"flag_hall": 1,
	 *			"ranking_hall": 83,
	 *			"terms": 1,
	 *			"newsletter": 0,
	 *			"timestamp": "1969-05-20",
	 *			"id_type_document": 59,
	 *			"availability": {
	 *				"id": 60,
	 *				"name": "This is an example text"
	 *			},
	 *			"level": {
	 *				"id": 59,
	 *				"name": "This is an example text"
	 *			},
	 *			"city": {
	 *				"id": 41,
	 *				"name": "This is an example text",
	 *				"code": "This is an example text",
	 *				"latitude": 62,
	 *				"longitude": 35,
	 *				"region": {
	 *					"id": 33,
	 *					"name": "This is an example text",
	 *					"id_capital": 5,
	 *					"code": "This is an example text"
	 *				}
	 *			}
	 *		},
	 *		"users": [
	 *			{
	 *				"id": 43,
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
	 *				"tmp_pwd": 1,
	 *				"flag_hall": 0,
	 *				"ranking_hall": 52,
	 *				"terms": 0,
	 *				"newsletter": 0,
	 *				"timestamp": "1969-05-20",
	 *				"id_type_document": 96,
	 *				"availability": {
	 *					"id": 67,
	 *					"name": "This is an example text"
	 *				},
	 *				"level": {
	 *					"id": 73,
	 *					"name": "This is an example text"
	 *				},
	 *				"city": {
	 *					"id": 82,
	 *					"name": "This is an example text",
	 *					"code": "This is an example text",
	 *					"latitude": 84,
	 *					"longitude": 3,
	 *					"region": {
	 *						"id": 90,
	 *						"name": "This is an example text",
	 *						"id_capital": 38,
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
	 *		"id": 24,
	 *		"name": "This is an example text",
	 *		"code": "This is an example text",
	 *		"latitude": 76,
	 *		"longitude": 38,
	 *		"region": {
	 *			"id": 48,
	 *			"name": "This is an example text",
	 *			"id_capital": 90,
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
	 *		"id": 91,
	 *		"name": "This is an example text",
	 *		"id_capital": 41,
	 *		"code": "This is an example text"
	 *	},
	 * 	total_results:1
	 * }
	*/
	var get_region = function (user, params) {
		return _get(model_region,user,params)
	}
	getMap.set('institution', { method: get_entity_institution, permits: Permissions.NONE })
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
	 * @apiParam {String} code 
 	 * 
	 */
	var update_region = function (user, body) {
		if (!body.id) {
			throw utiles.informError(400)
		}
		return model_region.update(body,{id:body.id})
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
