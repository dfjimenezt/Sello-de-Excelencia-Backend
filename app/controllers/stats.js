var BaseController = require('../utils/controller.js')
var util = require('util')
var utiles = require('../utils/utiles.js')
var Permissions = require('../utils/permissions.js')

var User = require('../models/user.js')
var Session = require('../models/session.js')
var User_role_model = require('../models/user_role.js')
var emiter = require('../events/emiter.js').instance
/* generador de password random*/
var pass_generator = require('generate-password')

var Auth = function () {
	var getMap = new Map(),
	postMap = new Map(),
	putMap = new Map(),
	deleteMap = new Map()


	let model_entity_user_answer = new(require('../models/entity_user_answer'))()
	let model_entity_service_status = new(require('../models/entity_service_status'))()
	let model_entity_institution = new(require('../models/entity_institution'))()
	let CONSTANTS = require('../events/constants')

	var serviceReport = function(user,params){
		return model_entity_user_answer.getStatsByService(params.service)
	}

	var performanceReport = function(user,params){
		return model_entity_institution.getPerformance(params.institution)
	}

	var actualReport = function(user,params){
		model_entity_user_answer.getByParams({'service.id_category':params.category}).then((results)=>{
			
		})
	}

	getMap.set('service',{method:serviceReport,permits:Permissions.NONE})
	getMap.set('performance',{method:performanceReport,permits:Permissions.NONE})

	var params = [getMap, postMap, putMap, null]
	BaseController.apply(this, params)
	return this
}

util.inherits(Auth, BaseController)

module.exports = Auth
