let emiter = require('./emiter.js').instance
var utiles = require('../utils/utiles.js')
let CONSTANTS = require('./constants.js')
var Events = function () {
	emiter.on('video.view', (user,id_hangout) => {
		let model_points = require('../models/entity_points.js')()
		if(user.institutions.length>0){
			return model_points.addInstitutionPoints(user.institutions[0].id,
				CONSTANTS.MOTIVES.ENTITY.VER_VIDEO,'',body.id)
		}else{
			return model_points.addUserPoints(user.id,
				CONSTANTS.MOTIVES.EVALUATOR.VER_VIDEO,'',body.id)
		}
	})
	emiter.on('user_answer.updated', (old, body) => {
		if (old.id_status == body.id_status) {
			return
		}
		let _admin = null
		let _user = null
		let model_user = require('../models/user.js')
		model_user = new model_user()
		let user_answer = require('../models/entity_user_answer.js')
		user_answer = new user_answer()
		model_user.getAdmin()
		.then((result) => {
			_admin = result[0]
			_user = old.user
			if (body.id_status == CONSTANTS.SERVICE.INCOMPLETO) { // rejected by admin
				admin_template = '<p>Se ha rechazado un requisito.</p><p>Hola se ha rechazado un requisito en la plataforma Sello de Excelencia</p>'
				utiles.sendEmail(_user.email, null, null, 
					'Han rechazado un requisito en Sello de Excelencia', 
					admin_template)
					let service = require('../models/service.js')
					service = new service()
				return service.update({ current_status: CONSTANTS.SERVICE.INCOMPLETO }, { id: old.id_service })
			}else if(body.id_status == CONSTANTS.SERVICE.ASIGNACION){
				user_answer.getByParams({id_service:body.id_service})
				.then((results)=>{
					let ready = true
					results.data.forEach((answer)=>{
						if(answer.id_status == CONSTANTS.SERVICE.INCOMPLETO || answer.id_status == CONSTANTS.SERVICE.VERIFICACION){
							ready = false
						}
					})
					
					if(ready){
						let service = require('../models/service.js')()
						return service.update({ current_status: CONSTANTS.SERVICE.EVALUACION }, { id: old.id_service })
					}
					return 
				})
			}else if(body.id_status == CONSTANTS.SERVICE.CUMPLE){
				user_answer.getByParams({id_service:body.id_service})
				.then((results)=>{
					let ready = true
					results.data.forEach((answer)=>{
						if(answer.id_status !== CONSTANTS.SERVICE.CUMPLE){
							ready = false
						}
					})
					if(ready){
						let service = require('../models/service.js')()
						return service.update({ current_status: CONSTANTS.SERVICE.CUMPLE }, 
							{ id: old.id_service })
					}
					return 
				})
			}else if(body.id_status == CONSTANTS.SERVICE.NO_CUMPLE){
				let service = require('../models/service.js')()
				return service.update({ current_status: CONSTANTS.SERVICE.NO_CUMPLE }, 
					{ id: old.id_service })
			}
		})
	})
	emiter.on('evaluation_request.updated', (old, body) => {
		if (old.id_request_status != body.id_request_status) {
			let request_status = require('../models/request_status.js')
			request_status = new request_status()
			let model_user = require('../models/user.js')
			model_user = new model_user()
			let model_entity_user_answer = require('../models/entity_user_answer.js')
			model_entity_user_answer = new model_entity_user_answer()
			let evalution_request = require('../models/evaluation_request.js')
			let model_evaluation_request = new evalution_request()
			let model_points = require('../models/entity_points.js')
			model_points = new model_points()
			let _status = null
			let _evaluator = null
			let _answer = null
			let _entity = null
			let _admin = null
			request_status.getByUid('' + body.id_request_status)
				.then((result) => {
					_status = result[0]
					return model_user.getAdmin()
				}).then((result) => {
					_admin = result[0]
					return model_entity_user_answer.getByUid(old.id_answer)
				}).then((result) => {
					_answer = result.data[0]
					return model_user.getByUid('' + old.id_user)
				}).then((result) => {
					_evaluator = result[0]
					return model_user.getByUid('' + _answer.id_user)
				}).then((result) => {
					_entity = result[0]
					return
				}).then(() => {
					let duration = _status.duration
					let alarm = duration - _status.pre_end
					let atime = new Date()
					atime.setDate(atime.getDate() + alarm)
					let ftime = new Date()
					ftime.setDate(ftime.getDate() + duration)
					body.alert_time = atime
					body.end_time = ftime
					let evaluator_template = ''
					let entity_template = ''
					let admin_template = ''
					//5 Rechazado
					if (body.id_request_status == CONSTANTS.EVALUATION_REQUEST.RECHAZADO) {
						evaluator_template = '<p>Has rechazado una evaluación.</p><p>Recuerda que te restaremos un punto por esto</p>'
						admin_template = '<p>Se ha rechazado un requisito.</p><p>Ha sido asignado al administrador del sistema</p>'
						model_points.addUserPoints(_evaluator.id, CONSTANTS.MOTIVES.EVALUATOR.RECHAZAR, '', old.id_user)
						model_evaluation_request.update({id:body.id,id_user:_admin.id},{id:body.id})
					}
					//6 Retroalimentación
					if (body.id_request_status == CONSTANTS.EVALUATION_REQUEST.RETROALIMENTACION) {
						evaluator_template = '<p>Has solicitado más información a la entidad.</p><p>Gracias por evaluar</p>'
						entity_template = '<p>Han solicitado más información sobre tu requisito.</p><p>Gracias por participar</p>'
						model_entity_user_answer.update({ id: _answer.id, id_status: CONSTANTS.SERVICE.RETROALIMENTACION })
					}
					//7 Cumple
					if (body.id_request_status == CONSTANTS.EVALUATION_REQUEST.CUMPLE) {//add points
						evaluator_template = '<p>Has calificado un requisito como CUMPLE.</p><p>Gracias por evaluar</p>'
						let motive = old.question.level == 1 ? CONSTANTS.MOTIVES.ENTITY.PASAR_REQUISITO_NIVEL_1:
						old.question.level == 2 ? CONSTANTS.MOTIVES.ENTITY.PASAR_REQUISITO_NIVEL_2:
						CONSTANTS.MOTIVES.ENTITY.PASAR_REQUISITO_NIVEL_3
						model_points.addUserPoints(_evaluator.id, CONSTANTS.MOTIVES.EVALUATOR.CALIFICAR_REQUISITO, 'Calificación de Requisito')
						model_evaluation_request.getByParams({id_answer:_answer.id}).then((results)=>{
							let approved = 0
							let rejected = 0
							let total = results.length
							results.forEach((request)=>{
								if(request.id_request_status == CONSTANTS.EVALUATION_REQUEST.CUMPLE){
									approved += 1
								}
								if(request.id_request_status == CONSTANTS.EVALUATION_REQUEST.NO_CUMPLE){
									rejected += 1
								}
							})
							if(approved >= Math.ceil(total/2)){
								model_entity_user_answer.update({id:_answer.id,id_status:CONSTANTS.SERVICE.CUMPLE},{id:_answer.id})
							}else if(rejected >= Math.ceil(total/2)){
								model_entity_user_answer.update({id:_answer.id,id_status:CONSTANTS.SERVICE.NO_CUMPLE},{id:_answer.id})
							}
						})
					}
					//8 No Cumple
					if (body.id_request_status == CONSTANTS.EVALUATION_REQUEST.NO_CUMPLE) {//add points
						evaluator_template = '<p>Has calificado un requisito como NO CUMPLE. Agradecemos tu retroalimentación a la entidad.<p></p>Gracias por tu evaluación</p>'
						model_points.addUserPoints(_evaluator.id, CONSTANTS.MOTIVES.EVALUATOR.CALIFICAR_REQUISITO, 'Calificación de Requisito')
						model_evaluation_request.getByParams({id_answer:_answer.id}).then((results)=>{
							let approved = 0
							let rejected = 0
							let total = results.length
							results.forEach((request)=>{
								if(request.id_request_status == CONSTANTS.EVALUATION_REQUEST.CUMPLE){
									approved += 1
								}
								if(request.id_request_status == CONSTANTS.EVALUATION_REQUEST.NO_CUMPLE){
									rejected += 1
								}
							})
							if(approved >= Math.ceil(total/2)){
								model_entity_user_answer.update({id:_answer.id,id_status:CONSTANTS.SERVICE.CUMPLE},{id:_answer.id})
							}else if(rejected >= Math.ceil(total/2)){
								model_entity_user_answer.update({id:_answer.id,id_status:CONSTANTS.SERVICE.NO_CUMPLE},{id:_answer.id})
							}
						})
					}

					if(evaluator_template.length>0){
						let template = `
						<div style="text-align:center;margin: 10px auto;">
						<img src="http://sellodeexcelencia.gov.co/assets/img/sell_gel.png"/>
						</div>
						<div>
						<p>Hola ${_evaluator.name} </p>
						<p>Hay una actualización de un requisito en la plataforma de Sello de Excelencia</p>
						${evaluator_template}
						<p>Nuestros mejores deseos,</p>
						<p>El equipo del Sello de Excelencia</p>
						</div>`
						utiles.sendEmail(_evaluator.email, null, null, 'Actualización de Evaluación - Sello de Excelencia Gobierno Digital Colombia', template)
					}
					if(entity_template.length>0){
						template = `
						<div style="text-align:center;margin: 10px auto;">
						<img src="http://sellodeexcelencia.gov.co/assets/img/sell_gel.png"/>
						</div>
						<div>
						<p>Hola ${_entity.name} </p>
						<p>Hay una actualización de un requisito en la plataforma de Sello de Excelencia Gobierno Digital Colombia</p>
						${entity_template}
						<p>Nuestros mejores deseos,</p>
						<p>El equipo del Sello de Excelencia Gobierno Digital Colombia</p>`
						utiles.sendEmail(_entity.email, null, null, 'Actualización de Evaluación - Sello de Excelencia Gobierno Digital Colombia',template)
					}
					if(admin_template.length>0){
						template = `
						<div style="text-align:center;margin: 10px auto;">
						<img src="http://sellodeexcelencia.gov.co/assets/img/sell_gel.png"/>
						</div>
						<div>
						<p>Hola ${_admin.name} </p>
						<p>Hay una actualización de un requisito en la plataforma de Sello de Excelencia Gobierno Digital Colombia</p>
						${admin_template}
						<p>Nuestros mejores deseos,</p>
						<p>El equipo del Sello de Excelencia Gobierno Digital Colombia</p>`
						utiles.sendEmail(_admin.email, null, null, 'Actualización de Evaluación - Sello de Excelencia Gobierno Digital Colombia',template)
					}
				})
		}
	})
	emiter.on('user.created', (user,pass_user) => {
		if(!pass_user){
			return
		}
		if(user.role == 1){
			return
		}
		// send an email to the user
		let token = utiles.sign(user.email)
		let template = `
		<div style="text-align:center;margin: 10px auto;">
		<img width="100" src="http://sellodeexcelencia.gov.co/assets/img/sell_gel.png"/>
		</div>
		<div>
		<p> Hola ${user.name} </p>
		<p>Se ha asignado una nueva contraseña en la plataforma del Sello de Excelencia Gobierno Digital Colombia.</p>
		<p>Tu nueva contraseña para acceder es: ${pass_user} </p>
		<p><a href='http://sellodeexcelencia.gov.co/activar-cuenta?token=${token}&email=${user.email}&active=1'>
			Haz click aquí para activar tu cuenta </a>
		</p>
		<p>Nuestros mejores deseos,</p>
		<p>El equipo del Sello de Excelencia Gobierno Digital Colombia</p>`
		let cc = null
		if (user.institution) {
			cc = user.institution.email
		}
		utiles.sendEmail(user.email, cc, null, "Registro Sello de Excelencia", template)
	})
	emiter.on('user.updatepassword',(user,password)=>{
		let template = `
		<div style="text-align:center;margin: 10px auto;">
		<img width="100" src="http://sellodeexcelencia.gov.co/assets/img/sell_gel.png"/>
		</div>
		<div>
		<p>Hola ${user.name} <\p>
		<p>Se ha asignado una nueva contraseña en la plataforma del Sello de Excelencia  Gobierno Digital Colombia.<\p>
		<p>Tu nueva contraseña para acceder es: ${password} <\p>
		<p>Nuestros mejores deseos,<\p>
		<p>El equipo del Sello de Excelencia Gobierno Digital Colombia<\p>`
		utiles.sendEmail(user.email, null, null, "Cambio de Contraseña", template)
	})
	emiter.on('chat.created',(user)=>{
		let template = `
		<div style="text-align:center;margin: 10px auto;">
		<img witdh="100" src="http://sellodeexcelencia.gov.co/assets/img/sell_gel.png"/>
		</div>
		<div>
		<p>Hola ${user.name} </p>
		<p>Hay una actualización de un requisito en la plataforma de Sello de Excelencia Gobierno Digital Colombia</p>
		<p>Has recibido un nuevo mensaje en Sello de Excelencia Gobierno Digital Colombia</p>
		<p><a href='http://www.sellodeexcelencia.gov.co'>Haz click aquí para activar tu cuenta</a></p>
		<p>Nuestros mejores deseos,</p>

		<p>El equipo del Sello de Excelencia Gobierno Digital Colombia</p>`

		utiles.sendEmail(user.email, null, null,
			'Nuevo mensaje - Sello de Excelencia Gobierno Digital Colombia',
			template)
	})
	emiter.on('service.rated',(id_service,avg)=>{
		if (avg <= 3.5) {
			let model_user = require('../models/user.js')()
			let service = require('../models/service.js')()
			let _service = null
			service.getByUid(''+id_service).then((result)=>{
				_service = result[0]
				return model_user.getAdmin()
			})
			.then((result) => {
				_admin = result[0]
				utiles.sendEmail(_admin.email, 'camila.lombana@domoti-sas.com', null, 'Entidad con puntaje bajo',`
				<div style="text-align:center;margin: 10px auto;">
				<img width="100" src="http://sellodeexcelencia.gov.co/assets/img/sell_gel.png"/>
				</div>
				<div>
				<p>El servicio ${_service.name} tiene una calificación muy baja</p>
				<p>La calificación del servicio es ${avg}</p>`
			)
		})	
		}
	})
	emiter.on('service.updated',(old,body)=>{
		var model_user = require('../models/user.js')
		model_user = new model_user()
		var model_status = require('../models/status.js')
		model_status = new model_status()
		var model_user_answer = require('../models/user_answer.js')
		model_user_answer = new model_user_answer()
		var model_request_status = require('../models/request_status.js')
		model_request_status = new model_request_status()
		var model_service_status = require('../models/service_status.js')
		model_service_status = new model_service_status()
		var model_entity_service = require('../models/entity_service.js')
		model_entity_service = new model_entity_service()
		var _admin = null
		var _status = null
		var _laststatus = null
		model_user.getAdmin()
		.then((result)=>{
			_admin = result[0]
			return model_status.getByUid(body.current_status || old.current_status)
		}).then((result)=>{
			_status = result[0]
			return model_service_status.getFiltered({
				filter_fields:['id_service'],
				filter_values:[''+body.id],
				page:1,
				limit:1,
				order:'timestamp desc'
			})
		}).then((result)=>{
			let _laststatus = result.data[0]
			if (old.current_status != body.current_status) {
				let duration = _status.duration
				let alarm = duration - _status.pre_end
				let atime = new Date()
				atime.setDate(atime.getDate() + alarm)
				let ftime = new Date()
				ftime.setDate(ftime.getDate() + duration)
				body.alert_time = atime
				body.end_time = ftime
				let data = {
					id_service: body.id,
					id_status: body.current_status,
					valid_to: ftime,
					alarm: atime,
					level: _laststatus.level || 1
				}
				if (body.level) {
					data.level = body.level
				}
				if (body.current_status == CONSTANTS.SERVICE.VERIFICACION) { // verification
					utiles.sendEmail(_admin.email,null,null,
						'Hay un servicio disponible para verficar',`
						<div style="text-align:center;margin: 10px auto;">
						<img width="100" src="http://sellodeexcelencia.gov.co/assets/img/sell_gel.png"/>
						</div>
						<p>Hola el servicio:</p>
						<p>${old.id} - ${old.name}</p>
						<p>Está disponible para verificación</p>`
					)					
				}
				if (body.current_status == CONSTANTS.SERVICE.EVALUACION) {
					model_entity_service.asignate(body).then((evaluations)=>{
						if(evaluations.length == 0){
							return
						}
						let evalution_request = require('../models/evaluation_request.js')
						let model_evaluation_request = new evalution_request()
						let data = {
							col_names:[],
							data:evaluations
						}
						for(let i in evaluations[0]){
							data.col_names.push(i)
						}
						model_evaluation_request.createMultiple(
							data
						)
					})
					model_user_answer.update({ id_status: CONSTANTS.SERVICE.EVALUACION }, { id_service: body.id })
				}
				if (body.current_status == CONSTANTS.SERVICE.CUMPLE){
					let entity = require('../models/institution.js')
					entity = new entity()
					entity.getByUid(old.id_institution).then((result)=>{
						let institution = result[0]
						entity_template = `
						<p>Felicitaciones has recibido el Sello de Excelencia.</p>
						<p>Hola hemos otorgado el sello de excelencia a tu servicio</p>
						<p>Te invitamos a que agregues este código en tu página web</p>
						<code>
							<pre>
								<embed width="400" height="800" src="https://prueba-dot-domoti-sellodeexcelencia.appspot.com/embeded/${body.id}"></embed>
							</pre>
						</code>`
						utiles.sendEmail(institution.email, null, null, 
							'Felicitaciones has recibido el Sello de Excelencia', 
							entity_template)
					})
					model_user.getByParams({'institution.id':old.id_institution}).then((result)=>{
						let user = result.data[0]
						entity_template = '<p>Felicitaciones has recibido el Sello de Excelencia.</p><p>Hola hemos otorgado el sello de excelencia a tu servicio</p>'
						utiles.sendEmail(user.email, null, null, 
							'Felicitaciones has recibido el Sello de Excelencia', 
							entity_template)
					})
				}
				if (body.current_status == CONSTANTS.SERVICE.NO_CUMPLE){
					let entity = require('../models/institution.js')
					entity = new entity()
					entity.getByUid(old.id_institution).then((result)=>{
						let institution = result[0]
						entity_template = '<p>Se ha negado el Sello de Excelencia.</p><p>El servicio no cumple con los requisitos para obtener el Sello de Excelencia</p>'
						utiles.sendEmail(institution.email, null, null, 
							'Se ha negado el Sello de Excelencia', 
							entity_template)
					})
					model_user.getByParams({'institution.id':old.id_institution}).then((result)=>{
						let user = result.data[0]
						entity_template = '<p>Se ha negado el Sello de Excelencia.</p><p>El servicio no cumple con los requisitos para obtener el Sello de Excelencia</p>'
						utiles.sendEmail(user.email, null, null, 
							'Se ha negado el Sello de Excelencia', 
							entity_template)
					})
				}
				if(old.current_status == CONSTANTS.SERVICE.VERIFICACION && body.current_status === CONSTANTS.SERVICE.INCOMPLETO){
					return
				}
				return model_service_status.create(data)
			}
		})
	})
	emiter.on('evaluation_request.asignation',(email)=>{
		let tout = Math.floor(Math.random() * 1000) + 100
		window.setTimeout(()=>{
			utiles.sendEmail(email,null,null,'Asignación de Requisito',`
			<div style="text-align:center;margin: 10px auto;">
			<img width="100" src="http://sellodeexcelencia.gov.co/assets/img/sell_gel.png"/>
			</div>
			<p>Se ha asignado un nuevo requisito en Sello de Excelencia</p>`)
		},tout)
	})
}
module.exports = Events