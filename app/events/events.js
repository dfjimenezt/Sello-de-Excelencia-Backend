let emiter = require('./emiter.js').instance
var utiles = require('../utils/utiles.js')
let CONSTANTS = require('./constants.js')
var Events = function () {
	emiter.on('video.view', (user,id_hangout) => {
		let model_points = require('../models/points.js')()
		if(user.institutions.length>0){
			return model_points.addInstitutionPoints(user.institutions[0].id,
				CONSTANTS.MOTIVES.ENTITY.VER_VIDEO.id,'',body.id)
		}else{
			return model_points.addUserPoints(user.id,
				CONSTANTS.MOTIVES.EVALUATOR.VER_VIDEO.id,'',body.id)
		}
	})
	emiter.on('requisitie.calification', (user, requisite, status) => {

	})
	emiter.on('user_answer.updated', (user, old, body) => {
		if (old.id_status == body.id_status) {
			return
		}
		let _admin = null
		let _user = null
		let model_user = require('../models/user.js')()
		let user_answer = require('../models/entity_user_answer.js')()
		model_user.getAdmin().then((result) => {
			_admin = result[0]
			return model_user.getByUid('' + old.id_user)
		}).then((result) => {
			_user = results[0]
			if (body.id_status == 10) { // rejected by admin
				utiles.sendEmail(_user.email, null, null, 'Han rechazado un requisito en Sello de Excelencia', 'Hola se ha rechazado un requisito en la plataforma Sello de Excelencia')
				return service.update({ current_status: 10 }, { id: _old.id_service })
			}
		})
	})
	emiter.on('evaluation_request.updated', (user, old, body) => {
		if (old.id_request_status != body.id_request_status) {
			let request_status = require('../models/request_status.js')()
			let model_user = require('../models/user.js')()
			let model_entity_user_answer = require('../models/entity_user_answer.js')()
			let _status = null
			let _evaluator = null
			let _answer = null
			let _entity = null
			request_status.getByUid('' + body.id_request_status)
				.then((result) => {
					_status = result[0]
					return model_entity_user_answer.getByUid('' + old.id_answer)
				}).then((result) => {
					_answer = result[0]
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
					if (body.id_request_status == 5) {
						evaluator_template = '<p>Has solicitado más información a la entidad.</p><p>Gracias por evaluar</p>'
						entity_template = '<p>Han solicitado más información sobre tu requisito.</p><p>Gracias por participar</p>'
						entity_template = '<p>Se ha rechazado un requisito</p>'
						model_points.addPoints(user.id, 7, '', old.id_user)
					}
					//6 Retroalimentación
					if (body.id_request_status == 6) {
						evaluator_template = '<p>Has solicitado más información a la entidad.</p><p>Gracias por evaluar</p>'
						entity_template = '<p>Han solicitado más información sobre tu requisito.</p><p>Gracias por participar</p>'
						model_entity_user_answer.update({ id: _answer.id, id_status: 6 })
					}
					//7 Cumple
					if (body.id_request_status == 7) {//add points
						evaluator_template = '<p>Has calificado un requisito como CUMPLE.</p><p>Gracias por evaluar</p>'
						entity_template = '<p>Han aprobado tu requisito.</p><p>Gracias por participar</p>'
						model_points.addPoints(user.id, 1, 'Calificación de Requisito')
						model_points.addPoints(_entity.id, 7, 'Requisito Cumplido')
					}
					//8 No Cumple
					if (body.id_request_status == 8) {//add points
						evaluator_template = '<p>Has calificado un requisito como NO CUMPLE. Agradecemos tu retroalimentación a la entidad.<p></p>Gracias por tu evaluación</p>'
						entity_template = '<p>Han Rechazado un requisito de tu postulación</p><p>Gracias por participar en el Sello de Excelencia</p>'
						model_points.addPoints(user.id, 1, 'Calificación de Requisito')
						model_points.addPoints(_entity.id, 7, 'Requisito No Cumplido')
					}

					let template = `
				<div style="text-align:center;margin: 10px auto;">
				<img src="http://sellodeexcelencia.gov.co/assets/img/sell_gel.png"/>
				</div>
				<div>
				<p>Hola ${_evaluator.name} </p>
				<p>Hay una actualización de un requisito en la plataforma de Sello de Excelencia</p>
				${evaluator_template}
				<p><a href='http://www.sellodeexcelencia.gov.co'>Haz click aquí para activar tu cuenta</a></p>
				<p>Nuestros mejores deseos,</p>
				<p>El equipo del Sello de Excelencia</p>
				</div>`

					utiles.sendEmail(_evaluator.email, null, null, 'Actualización de Evaluación - Sello de Excelencia Gobierno Digital Colombia', template)

					template = `
					<div style="text-align:center;margin: 10px auto;">
					<img src="http://sellodeexcelencia.gov.co/assets/img/sell_gel.png"/>
					</div>
					<div>
					<p>Hola ${_entity.name} </p>
					<p>Hay una actualización de un requisito en la plataforma de Sello de Excelencia Gobierno Digital Colombia</p>
					${entity_template}
					<p><a href='http://www.sellodeexcelencia.gov.co'>Haz click aquí para activar tu cuenta</a></p>
					<p>Nuestros mejores deseos,</p>
					<p>El equipo del Sello de Excelencia Gobierno Digital Colombia</p>`

					utiles.sendEmail(_entity.email, null, null, 'Actualización de Evaluación - Sello de Excelencia Gobierno Digital Colombia',
						template)
				})
		}
	})
	emiter.on('user.created', (user,pass_user) => {
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
		<p><a href='https://prueba-dot-domoti-sellodeexcelencia.appspot.com/activar-cuenta?token=${token}&email=${user.email}&active=1'>
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
		let model_user = require('../models/user.js')()
		let model_entity_service_status = require('../models/entity_service_status.js')()
		let _admin = null
		model_user.getAdmin().then((result)=>{
			_admin = result[0]
			if (old != body.current_status) {
				let user_answer = require('../models/user_answer.js')
				let model_user_answer = new user_answer()
				let request_status = require('../models/request_status.js')
				let valid = new Date()
				let model_request_status = new request_status()
				valid.setFullYear(valid.getUTCFullYear() + 1)
				let data = {
					id_service: body.id,
					id_status: body.current_status,
					valid_to: valid,
					level: _old.data[0].level || 1
				}
				if (body.level) {
					data.level = body.level
				}
				if (body.current_status == 1) { // verification
					utiles.sendEmail(_admin.email,null,null,'Hay un nuevo servicio para verficar','Hola Hay un nuevo servicio para verificar en el administrador de Sello de Excelencia')
				}
				if (body.current_status == 5) {
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
					model_user_answer.update({ id_status: 2 }, { id_service: body.id })
				}
				return model_entity_service_status.create(data)
			}
		})
	})
	emiter.on('evaluation_request.asignation',(email)=>{
		utiles.sendEmail(email,null,null,'Asignación de Requisito',`
		<div style="text-align:center;margin: 10px auto;">
		<img src="http://sellodeexcelencia.gov.co/assets/img/sell_gel.png"/>
		</div>
		<div>
		<p>Se ha asignado un nuevo requisito en Sello de Excelencia</p>`)
	})
}
module.exports = Events