let emiter = require('./emiter.js').instance
var utiles = require('../utils/utiles.js')
var Events = function () {
	emiter.on('video.view', (user, motive, description, id_hangout) => {

	})
	emiter.on('requisitie.calification', (user, requisite, status) => {

	})
	emiter.on('service.calification', (user, requisite, status) => {

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
				<div style="background-color:#a42a5b;height:50px;width:100%">
				</div>
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

					utiles.sendEmail(_evaluator.email, null, null, 'Actualización de Evaluación - Sello de Excelencia', template)

					template = `
					<div style="background-color:#a42a5b;height:50px;width:100%">
					</div>
					<div style="text-align:center;margin: 10px auto;">
					<img src="http://sellodeexcelencia.gov.co/assets/img/sell_gel.png"/>
					</div>
					<div>
					<p>Hola ${_entity.name} </p>
					<p>Hay una actualización de un requisito en la plataforma de Sello de Excelencia</p>
					${entity_template}
					<p><a href='http://www.sellodeexcelencia.gov.co'>Haz click aquí para activar tu cuenta</a></p>
					<p>Nuestros mejores deseos,</p>

					<p>El equipo del Sello de Excelencia</p>`

					utiles.sendEmail(_entity.email, null, null, 'Actualización de Evaluación - Sello de Excelencia',
						template)
				})
		}
	})
	emiter.on('user.created', (user,pass_user) => {
		switch (user.role) {
			case "1":
				role = "Ciudadano"
				break
			case "2":
				role = "Evaluador"
				break
			case "3":
				role = "Administrador"
				break
			case "4":
				role = "Entidad"
				break
		}
		if (user.role == 4) {
			var institution_user_model = require("../models/institution_user.js")
			var institution_user = new institution_user_model()
			institution_user.create({
				id_institution: user.institution.id,
				id_user: user.id
			})
			var institution_model = require("../models/entity_institution.js")
			var institution = new institution_model()
			institution.update(user.institution, { id: user.institution.id })
		}
		if (user.role == 2) {
			let user_category = require('../models/user_category.js')
			let model_user_category = new user_category()
			user.categories.forEach((value) => {
				let data = { id_user: user.id, id_category: value.id }
				model_user_category.create(data)
			}, this)
			let user_questiontopic = require('../models/user_questiontopic.js')
			let model_user_questiontopic = new user_questiontopic()
			user.topics.forEach((value) => {
				let data = { id_user: user.id, id_topic: value.id }
				model_user_questiontopic.create(data)
			}, this)
		}
		// send an email to the user
		let token = utiles.sign(user.email)
		let template = `
	<div style="background-color:#a42a5b;height:50px;width:100%">
	</div>
	<div style="text-align:center;margin: 10px auto;">
	<img src="http://sellodeexcelencia.gov.co/assets/img/sell_gel.png"/>
	</div>
	<div>
	<p> Hola ${user.name} </p>
	<p>Se ha asignado una nueva contraseña en la plataforma del Sello de Excelencia </p>
	<p>Tu nueva contraseña para acceder es: ${pass_user} </p>
	<p><a href='https://prueba-dot-domoti-sellodeexcelencia.appspot.com/activar-cuenta?token=${token}&email=${user.email}&active=1'>Haz click aquí para activar tu cuenta </a></p>
	<p>Nuestros mejores deseos,</p>

	<p>El equipo del Sello de Excelencia</p>`
		let cc = null
		if (user.institution) {
			cc = user.institution.email
		}
		utiles.sendEmail(user.email, cc, null, "Registro Sello de Excelencia", template)
	})
}
module.exports = Events