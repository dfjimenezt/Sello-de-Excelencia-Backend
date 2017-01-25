var BaseController = require('../utils/controller.js')
var util = require('util')
var utiles = require('../utils/utiles.js')
var permissions = require('../utils/permissions.js')

var User = require('../models/user.js')
var Session = require('../models/session.js')
var User_role_model = require('../models/user_role.js')

var Auth = function () {
  var userModel = new User()
  var sessionModel = new Session()
  var user_role = new User_role_model()

  // ---------------------------------------------------------------
  var postMap = new Map()

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
  *
  * @apiSuccess {Number} id The new Users-ID.
  *
  * @apiUse CreateUserError
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
        var pass = utiles.createHmac('sha256')
        pass.update(body.password)
        pass = pass.digest('hex')
        return userModel.create({
          name: body.name,
          lastname: body.lastname,
          document: body.document,
          office_address: body.office_address,
          email: body.email,
          phone: body.phone,
          played: 0,
          won: 0,
          active: true,
          verified: true,
          tmp_pwd: false,
          password: pass
        }).then(function (user) {
          // if the user was created sucessfully
          if (user) {
            if (!body.role) {
              body.role = '1'
            }
            //create the role assignment
            user_role.create({
              id_user: user.insertId,
              id_role: parseInt(body.role)
            });
            // add the role manually reduce time
            user.role = body.role;
            // return user
            return { error: Errors.NO_ERROR }
          } else {
            //if there was an error on creating the user
            throw { error: Errors.DATABASE_ERROR }
          }
        });
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
        // TODO: //send email and reset password
        return utiles.informError(0)
      }
    })
  }

  postMap.set('login', { method: login, permits: permissions.NONE })
  postMap.set('register', { method: register, permits: permissions.NONE })
  postMap.set('recover', { method: recover, permits: permissions.NONE })

  var params = [null, postMap, null, null]
  BaseController.apply(this, params)
  // ---------------------------------------------------------------

  return this
}

util.inherits(Auth, BaseController)

module.exports = Auth
