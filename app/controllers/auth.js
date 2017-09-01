var BaseController = require('../utils/controller.js')
var util = require('util')
var utiles = require('../utils/utiles.js')
var Permissions = require('../utils/permissions.js')

var User = require('../models/user.js')
var Session = require('../models/session.js')
var User_role_model = require('../models/user_role.js')

/* generador de password random*/
var pass_generator = require('generate-password')

var Auth = function() {
    var userModel = new User()
    var sessionModel = new Session()
    var user_role = new User_role_model()

    var getMap = new Map(),
        postMap = new Map(),
        putMap = new Map(),
        deleteMap = new Map()

    // ---------------------------------------------------------------
    /**
     * @api {get} /auth/activate
     * @apiVersion 0.0.1
     * @apiName activate
     * @apiGroup Auth
     * @apiPermission none
     * activates an user email
     */
    var activate = function(token, params) {
			if (!params.email) { throw utiles.informError(400) }
			return userModel.getUser(params.email).then((user) => {
				if (!user) throw utiles.informError(202) // user doesnt exists
				if (params.active != undefined && parseInt(params.active) >= 0 && parseInt(params.active) <=1){
					return userModel.update({ active: parseInt(params.active), verified: 1 }, { id: user.id })
				}else{
					return { message : "debe tener un argumeto active[0,1][inactivo, activo]" }
				}
			})
    }

    getMap.set("activate", { method: activate, permits: Permissions.NONE })

    //-----------------------------------------------------------------------

    /**
     * @api {put} /auth/password Change the password
     * @apiVersion 0.0.1
     * @apiName updatePassword
     * @apiGroup Auth
     * @apiPermission none
     * 
     * @apiParam {String} email
     * @apiParam {String} password_old 
     * @apiParam {String} password_new 
     * 
     */
    var update_password = function(token, body) {
        return userModel.getUser(body.email).then((user) => {
            if (!user) throw utiles.informError(202) // user doesnt exists
            else {
                var pass = utiles.createHmac('sha256')
                pass.update(body.password_old)
                pass = pass.digest('hex')
                if (body.password_old === body.password_new) return { message: "La contraseña nueva es la misma que la anterior." }
                if (user.password === pass) {
                    if (user.active === 0) throw utiles.informError(203) //user inactive
                    delete user.password
                    pass = utiles.createHmac('sha256')
                    pass.update(body.password_new)
                    pass = pass.digest('hex')
                    if (user.password === pass) return { message: "La contraseña nueva no es diferente a la existente" }
                    else user.password = pass
                } else throw utiles.informError(200) //login failed
                return userModel.update({ password: user.password }, { id: user.id }).then(() => {
                    let template = `<p>Hola ${user.name} <\p>
                    <p>Se ha asignado una nueva contraseña en la plataforma del Sello de Excelencia <\p>
                    <p>Tu nueva contraseña para acceder es: ${body.password_new} <\p>
                    <p>Nuestros mejores deseos,<\p>
                    <p>El equipo del Sello de Excelencia<\p>`
                    utiles.sendEmail(user.email, null, null, "Cambio de Contraseña", template)
                    return utiles.informError(0)
                })
            }
        })
    }


    putMap.set("password", { method: update_password, permits: Permissions.NONE })
        //-----------------------------------------------------------------------

    /**
     * @api {post} /auth/login_fb
     * @apiVersion 0.0.1
     * @apiGroup Auth
     * @apiPermission none
     * Login FB
     */
    var login_fb = function(token, body) {
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
                    }).then(() => {
                        return userModel.getUser(body.email).then((user) => {
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
    var login = function(token, body) {
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
    var register = function(token, body, role_seguro) {
        var pass_user = ""
        var tmp_pwd_active = false
        switch (role_seguro) {
            case "1":
                tmp_pwd_active = false
                break
            case "2":
                tmp_pwd_active = true
        }
        return userModel.getUser(body.email).then((user) => {
            if (user) throw utiles.informError(201) // user already exists
            else {
                if (body.email === undefined) {
                    //if(body.password === undefined || body.email === undefined){
                    throw utiles.informError(400)
                }
                //Generar password temporal para evaluador a registrar y activar por e-mail
                if (body.password === undefined) {
                    pass_user = pass_generator.generate({
                        length: 8,
                        numbers: true
                    })
                } else {
                    pass_user = body.password
                }
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
                    organization: body.organization || null,
                    ocupation: body.ocupation || null,
                    education_level: body.education_level || null,
                    password: pass,
                    tmp_pwd: tmp_pwd_active,
                    points: "0",
                    active: false,
                    verified: false,
                    terms: body.terms === "true",
                    newsletter: body.newsletter === "true",
                    //flag_hall: body.flag_hall === "true",
                    //ranking_hall: (body.ranking_hall) ? parseInt(body.ranking_hall) : null,
                    id_availability: (body.id_availability) ? parseInt(body.id_availability) : null,
                    //id_level: (body.id_level) ? parseInt(body.id_level) : null,
                    id_city: (body.id_city) ? parseInt(body.id_city) : null,
                    id_region: (body.id_region) ? parseInt(body.id_region) : null,
                    id_country: (body.id_country) ? parseInt(body.id_country) : null,
                    document: body.document || null,
                    id_type_document: (body.id_type_document) ? parseInt(body.id_type_document) : null
                }).then(function(user) {
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

                        switch (body.role) {
                            case "1":
                                role = "ciudadano"
                                break
                            case "2":
                                role = "evaluador"
                                break
                            case "3":
                                role = "administrador"
                                break
                            case "4":
                                role = "entidad"
                                break
                        }
                        // send an email to the user
                        let token = utiles.sign(body.email)
                        let template = `
                        <p> Hola ${body.name} </p>
                        <p>Se ha asignado una nueva contraseña en la plataforma del Sello de Excelencia </p>
                        <p>Tu nueva contraseña para acceder es: ${pass_user} </p>
                        <p><a href='http://www.sellodeexcelencia.gov.co/#!/activar-cuenta?token=${token}&email=${body.email}&active=1'>Haz click aquí para activar tu cuenta </a></p>
                        <p><a href='http://localhost:3000/api/auth/activate?token=${token}&email=${body.email}&active=1'> Haz click aqui para activar tu cuenta(localhost only dbg) </a> </p>
                        <p>Nuestros mejores deseos,</p>

                        <p>El equipo del Sello de Excelencia</p>
												`
                        return utiles.sendEmail(body.email, null, null, "Registro Sello de Excelencia", template).then(() => {
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
    var recover = function(token, body) {
        return userModel.getUser(body.email).then((user) => {
            if (!user) throw utiles.informError(202) // user doesnt exists
            else {
                var pass_user = pass_generator.generate({
                    length: 8,
                    numbers: true
                })
                var pass = utiles.createHmac('sha256')
                pass.update(pass_user)
                pass = pass.digest('hex')
                user.password = pass
                return userModel.update({ password: user.password }, { id: user.id }).then(() => {
                    let template = `<p> Hola ${user.name} <\p>
                    <p>Se ha asignado una nueva contraseña en la plataforma del Sello de Excelencia <\p>
                    <p>Tu nueva contraseña para acceder es: ${pass_user} <\p>
                    <p>Nuestros mejores deseos,<\p>
                    <p>El equipo del Sello de Excelencia <\p>`
                    utiles.sendEmail(user.email, null, null, "Cambio de Contraseña", template)
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
    var register_user = function(token, body) {
        return register(token, body, '1')
    }

    /**
     * @api {post} /auth/register_evaluator Register a new Evaluator
     * @apiVersion 0.0.1
     * @apiName registerEvaluator
     * @apiGroup Auth
     * @apiPermission none
     */
    var register_evaluator = function(token, body) {
        return register(token, body, '2')
    }

    /**
     * @api {post} /auth/register_administrator Register a new Administrator
     * @apiVersion 0.0.1
     * @apiName registerAdministrator
     * @apiGroup Auth
     * @apiPermission none
     */
    var register_administrator = function(token, body) {
        return register(token, body, '3')
    }

    //-------------------------------------------------------------------------

    postMap.set('login', { method: login, permits: Permissions.NONE })
    postMap.set('login_fb', { method: login, permits: Permissions.NONE })
    postMap.set('recover', { method: recover, permits: Permissions.NONE })
    postMap.set('register_user', { method: register_user, permits: Permissions.NONE })
    postMap.set('register_evaluator', { method: register_evaluator, permits: Permissions.NONE })
    postMap.set('register_administrator', { method: register_administrator, permits: Permissions.NONE })

    var params = [getMap, postMap, putMap, null]
    BaseController.apply(this, params)

    return this
}

util.inherits(Auth, BaseController)

module.exports = Auth
