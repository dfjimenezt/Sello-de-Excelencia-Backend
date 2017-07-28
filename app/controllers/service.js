var BaseController = require('../utils/controller.js')
var util = require('util')
var Errors = require('../utils/errors.js')
var utiles = require('../utils/utiles.js')
var Permissions = require('../utils/permissions.js')
var auth_ctrl = require("./auth.js")
var service_model = require("../models/service.js")
var service_status_model = require("../models/service_status.js")
var category_model = require("../models/category.js")
var institution_model = require("../models/institution.js")
var questiontopic_model = require('../models/questiontopic.js')
var user_model = require("../models/user.js")
var form = require('../models/form.js')
var type = require('../models/type.js')
var question = require('../models/question.js')
var Service = function() {
    var auth = new auth_ctrl()

    var service = new service_model()
    var service_status = new service_status_model()
    var category = new category_model()
    var institution = new institution_model()
    var user = new user_model()
    var questiontopic = new questiontopic_model()
    var model_form = new form()
    var model_type = new type()
    var model_question = new question()
        //---------------------------------------------------------------
    var getMap = new Map(),
        postMap = new Map(),
        putMap = new Map(),
        deleteMap = new Map()


    /**
     * @
     * Brings the entities with ordered by certified services
     * Hall of fame, approved services sorted by rates
     */
    var hall_fame = function() {
        return institution.getTop({
            limit: params.limit,
            page: params.page,
        })
    }

    var _get = function(model, user, params) {
            if (params.id) {
                return model.getByUid(params.id)
            } else {
                return model.getAll({
                    filter: params.filter,
                    limit: params.limit,
                    page: params.page,
                    order: params.order,
                    filter_fields: params.filter_field,
                    filter_values: params.filter_value,
                    fields: params.field
                })
            }
        }
        /**
         * service
         */
    var get_service = function(user, params) {
            return _get(service, user, params)
        }
        /**
         * category
         */
    var get_category = function(user, params) {
            return _get(category, user, params)
        }
        /**
         * questiontopic
         */
    var get_questiontopic = function(user, params) {
            return _get(questiontopic, user, params)
        }
        /**
         * form
         */
    var get_form = function(user, params) {
            return _get(model_form, user, params)
        }
        /**
         * type
         */
    var get_type = function(user, params) {
            return _get(model_type, user, params)
        }
        /**
         * question
         */
    var get_question = function(user, params) {
        return _get(model_question, user, params)
    }
    getMap.set('service', { method: get_service, permits: Permissions.NONE })
    getMap.set('category', { method: get_category, permits: Permissions.NONE })
    getMap.set("hall_fame", { method: hall_fame, permits: Permissions.NONE })
    getMap.set('questiontopic', { method: get_questiontopic, permits: Permissions.ADMIN })
    getMap.set('form', { method: get_form, permits: Permissions.ADMIN })
    getMap.set('type', { method: get_type, permits: Permissions.ADMIN })
    getMap.set('question', { method: get_question, permits: Permissions.ADMIN })

    /**
     * service
     */
    var create_service = function(user, body) {
        return model_service.create(body)
    }

    /**
     * Postulate a service
     * Creates an entry into the serice table
     * Then creates a new status for the service
     * Creates the right answers for the questions
     * Selects the right evaluators and send emails inviting them to evaluate
     */
    var postulate = function(user, body) {
        return service.create({
            name: body.name,
            url: body.url,
            id_institution: parseInt(body.id_institution),
            id_user: parseInt(user.id),
            hash: utiles.createUid(),
            rate: 0,
            id_category: parseInt(body.id_category),
            test_user: body.test_user,
            test_password: body.test_password,
            is_product: body.is_product || body.is_product === "true",
            is_service: body.is_service || body.is_service === "true",
        }).then(function(s) {
            if (!s.insertId) { //if there is any problem creating the service
                throw utiles.informError(400)
            } // created problem
            var valid = new Date()
            valid.setFullYear(now.getFullYear() + 1)
                //create the status for the problem, will be valid for 1 year
            service_status.create({
                id_service: s.insertId,
                id_status: 1,
                valid_to: valid
            })
            s.status = {
                    id_service: s.insertId,
                    id_status: 1,
                    valid_to: valid
                }
                //search right evaluators
            return user.getRandomsEvaluators(s)
        }).then((evaluators) => {
            let promises = []
            evaluators.forEach((user) => {
                let promise = user_form()
                promise.then(() => {
                    utiles.sendEmail(user.email, null, null, 'Has sido invitado a Evaluar', '')
                })
                promises.push(promise)
            })
            return Promise.all(promises)
        })
    }

    var create_category = function(token, body) {
            return category.create(body)
        }
        /**
         * questiontopic
         */
    var create_questiontopic = function(user, body) {
        return model_questiontopic.create(body)
    };
    /**
     * form
     */
    var create_form = function(user, body) {
            return model_form.create(body)
        }
        /**
         * type
         */
    var create_type = function(user, body) {
            return model_type.create(body)
        }
        /**
         * question
         */
    var create_question = function(user, body) {
        return model_question.create(body)
    }
    postMap.set("category", { method: create_category, permits: Permissions.ADMIN })
    postMap.set("service", { method: create_service, permits: Permissions.ADMIN })
    postMap.set("postulate", { method: postulate, permits: Permissions.PLATFORM })
    postMap.set('questiontopic', { method: create_questiontopic, permits: Permissions.ADMIN })
    postMap.set('form', { method: create_form, permits: Permissions.ADMIN })
    postMap.set('type', { method: create_type, permits: Permissions.ADMIN })
    postMap.set('question', { method: create_question, permits: Permissions.ADMIN })
        /**
         * Updates a category
         */
    var update_category = function(token, body) {
        if (!body.id) {
            throw utiles.informError(400)
        }
        category.update(body, { id: body.id })
    }

    /**
     * Updates a Service
     */
    var update_service = function(token, body) {
            if (!body.id) {
                throw utiles.informError(400)
            }
            service.update(body, { id: body.id })
        }
        /**
         * questiontopic
         */
    var update_questiontopic = function(user, body) {
            if (!body.id) {
                throw utiles.informError(400);
            }
            return model_questiontopic.update(body, { id: body.id })
        }
        /**
         * form
         */
    var update_form = function(user, body) {
            if (!body.id) {
                throw utiles.informError(400)
            }
            return model_form.update(body, { id: body.id })
        }
        /**
         * type
         */
    var update_type = function(user, body) {
            if (!body.id) {
                throw utiles.informError(400)
            }
            return model_type.update(body, { id: body.id })
        }
        /**
         * question
         */
    var update_question = function(user, body) {
        if (!body.id) {
            throw utiles.informError(400)
        }
        return model_question.update(body, { id: body.id })
    }
    putMap.set("category", { method: update_category, permits: Permissions.NONE })
    putMap.set("service", { method: update_service, permits: Permissions.NONE })
    putMap.set('questiontopic', { method: update_questiontopic, permits: Permissions.ADMIN })
    putMap.set('form', { method: update_form, permits: Permissions.ADMIN })
    putMap.set('type', { method: update_type, permits: Permissions.ADMIN })
    putMap.set('question', { method: update_question, permits: Permissions.ADMIN })

    /**
     * service
     */
    var delete_service = function(user, body) {
            if (!body.id) {
                throw utiles.informError(400)
            }
            return service.delete(body, { id: body.id })
        }
        /**
         * category
         */
    var delete_category = function(user, body) {
            if (!body.id) {
                throw utiles.informError(400)
            }
            return category.delete(body, { id: body.id })
        }
        /**
         * questiontopic
         */
    var delete_questiontopic = function(user, body) {
            if (!body.id) {
                throw utiles.informError(400)
            }
            return model_questiontopic.delete(body, { id: body.id })
        }
        /**
         * form
         */
    var delete_form = function(user, body) {
            if (!body.id) {
                throw utiles.informError(400)
            }
            return model_form.delete(body, { id: body.id })
        }
        /**
         * type
         */
    var delete_type = function(user, body) {
            if (!body.id) {
                throw utiles.informError(400)
            }
            return model_type.delete(body, { id: body.id })
        }
        /**
         * question
         */
    var delete_question = function(user, body) {
        if (!body.id) {
            throw utiles.informError(400)
        }
        return model_question.delete(body, { id: body.id })
    }
    deleteMap.set('service', { method: delete_service, permits: Permissions.ADMIN })
    deleteMap.set('category', { method: delete_category, permits: Permissions.ADMIN })
    deleteMap.set('questiontopic', { method: delete_questiontopic, permits: Permissions.ADMIN })
    deleteMap.set('form', { method: delete_form, permits: Permissions.ADMIN })
    deleteMap.set('type', { method: delete_type, permits: Permissions.ADMIN })
    deleteMap.set('question', { method: delete_question, permits: Permissions.ADMIN })
    var params = [getMap, postMap, putMap, deleteMap]
    BaseController.apply(this, params)
        //---------------------------------------------------------------

    return this
}

util.inherits(Service, BaseController)

module.exports = Service