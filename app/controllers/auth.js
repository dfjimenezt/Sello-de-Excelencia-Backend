var BaseController = require('../utils/controller.js')
var util = require('util')
var utiles = require('../utils/utiles.js')
var Permissions = require('../utils/permissions.js')

var User = require('../models/user.js')
var Session = require('../models/session.js')
var User_role_model = require('../models/user_role.js')

var Auth = function () {
  var userModel = new User()
  var sessionModel = new Session()
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

  getMap.set("activate", { method: activate, permits: Permissions.NONE })



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
		//console.log(body.email)
    return userModel.getUser(body.email).then((user) => {
      if (!user) throw utiles.informError(202) // user doesnt exists
      else {
				console.log("user???")
				console.log(user)
				console.log("name")
				console.log(user.name)
        var pass = utiles.createHmac('sha256')
        pass.update(body.password)
        pass = pass.digest('hex')
				console.log("pass")
				console.log(pass)
				console.log("pass server")
				console.log(user.password)
        if (user.password === pass) {
					console.log("iguales pass")
          if (user.active === 0) {
						console.log("inactivo")
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
  var register = function (token, body, role_seguro) {
    return userModel.getUser(body.email).then((user) => {
      if (user) throw utiles.informError(201) // user already exists
      else {
        console.log(body.email)
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
              body.role = role_seguro
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

//-------------------------------------------------------------------------
  /**
  * @api {post} /auth/register_user Register a new User
  * @apiVersion 0.0.1
  * @apiName registerUser
  * @apiGroup Auth
  * @apiPermission none
  */
  var register_user = function (token, body) {
    return register(token, body, '1')
  }

  /**
  * @api {post} /auth/register_evaluator Register a new Evaluator
  * @apiVersion 0.0.1
  * @apiName registerEvaluator
  * @apiGroup Auth
  * @apiPermission none
  */
  var register_evaluator = function (token, body) {
    return register(token, body, '2')
  }

//-------------------------------------------------------------------------

  postMap.set('login', { method: login, permits: Permissions.NONE })
  postMap.set('login_fb', { method: login, permits: Permissions.NONE })
  postMap.set('recover', { method: recover, permits: Permissions.NONE })
  postMap.set('register_user', { method: register_user, permits: Permissions.NONE })
  postMap.set('register_evaluator', { method: register_evaluator, permits: Permissions.NONE })

  var params = [getMap, postMap, null, null]
  BaseController.apply(this, params)

  return this
}

util.inherits(Auth, BaseController)

module.exports = Auth
