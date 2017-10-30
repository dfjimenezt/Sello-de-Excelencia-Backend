let CONSTANTS = require('../events/constants.js')
var Jobs = function () {
	let model_entity_evalution_request = require('../models/entity_evaluation_request.js')
	model_entity_evalution_request = new model_entity_evalution_request()
	let model_entity_service = require('../models/entity_service.js')
	model_entity_service = new model_entity_service()
	let model_status = require('../models/status.js')
	model_status = new model_status()
	/**
	 * execute
	 */
	this.execute = function(){
		return new Promise((resolve,reject)=>{
			let a_time = '< '+ new Date().toISOString().substring(0,10)
			let ev_request = []
			let services = []
			model_entity_evalution_request.getFiltered({
				filter_fields:['alert_time','id_request_status'],
				filter_values:[a_time,'7'],
			}).then((results)=>{
				ev_request = results
				return model_status.getByParams({id:CONSTANTS.SERVICE.CUMPLE})
			}).then((results)=>{
				let _status = results[0]
				a_time = new Date()
				a_time.setDate(a_time.getDate() - _status.pre_end)
				a_time = a_time.toISOString().substring(0,10)
				return model_entity_service.getByCurrentStatus(a_time,[CONSTANTS.SERVICE.CUMPLE])
			}).then((results)=>{
				let services = results
				resolve({
					'requests':ev_request,
					'service':services
				})
			}).catch((err)=>{
				reject(err)
			})

		})
	}
}
module.exports = Jobs