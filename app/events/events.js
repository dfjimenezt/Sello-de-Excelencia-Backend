let emiter = require('./emiter.js').instance
var utiles = require('../utils/utiles.js')
var config = require('../../config.json')
let HOST = config.hosts[config.enviroment];
let CONSTANTS = require('./constants.js')

var Events = function () {
	let model_user = new (require('../models/user.js'))()
	let model_entity_user_answer = new (require('../models/entity_user_answer.js'))()
	let entity_model_points = new (require('../models/entity_points.js'))()
	let model_request_status = new (require('../models/request_status.js'))()
	let model_entity_evaluation_request = new (require('../models/entity_evaluation_request.js'))()
	let model_entity_questiontopic = new (require('../models/entity_questiontopic.js'))()
	let model_entity_service = new (require('../models/entity_service.js'))()
	let model_entity_institution = new (require('../models/entity_institution.js'))()
	let model_entity_service_status = new (require('../models/entity_service_status.js'))()
	let model_entity_motives = new (require('../models/entity_motives.js'))()
	let model_status = new (require('../models/status.js'))()
	let model_category = new (require('../models/category.js'))()
	let model_entity_question = new (require('../models/entity_question.js'))()

	emiter.on('video.view', (user, id_hangout) => {
		return model_entity_motives.getAll({ limit: 5000 }).then((results) => {
			if (results.data.length) {
				let motive = null
				results.data.forEach((_motive) => {
					if (_motive.name.name === CONSTANTS.MOTIVES.ENTITY.VER_VIDEO) {
						motive = _motive
						return
					}
				})

				if (user.institutions.length > 0) {
					return entity_model_points.addInstitutionPoints(user.institutions[0].id, motive.id, '', id_hangout)
				} else {
					return entity_model_points.addUserPoints(user.id, motive.id, '', id_hangout)
				}
			}
		})
	})
	emiter.on('user_answer.updated', (old, _new) => {
		if (old.id_status == _new.id_status) {
			return
		}
		if (!_new.id_status) {
			return
		}
		let _admin = null
		let _user = old.user
		let _service = old.service
		let _question = old.question
		let _topic = old.topic
		let _category = null
		let _institution = null
		return model_category.getByUid(_service.id_category)
			.then((result) => {
				_category = result[0]
				return model_entity_institution.getByUid(_service.id_institution)
			}).then((result) => {
				_institution = result.data[0]
				return model_user.getAdmin()
			})
			.then((result) => {
				_admin = result[0]
				_user = old.user
				if (_new.id_status == CONSTANTS.SERVICE.INCOMPLETO) { // rejected by admin
					model_entity_service.update({ id: old.id_service, current_status: CONSTANTS.SERVICE.INCOMPLETO }, { id: old.id_service })
					utiles.sendEmail(_user.email, null, null,
						'Postulación no aceptada - Sello de Excelencia Gobierno Digital Colombia',
						`<div style="text-align:center;margin: 10px auto;">
					<img width="100" src="${HOST}/assets/img/sell_gel.png"/>
					</div>
					<p>Hola ${_user ? _user.name : ''}</p>
					<p>No ha sido aceptado el siguiente requisito:</p>
					<p>Categoría: ${_category ? _category.name : ''}</p>
					<p>Nivel: ${_question ? _question.level : ''}</p>
					<p>Temática: ${_topic ? _topic.name : ''}</p>
					<p>Requisito: ${_question ? _question.text : ''}</p>
					<p>Entidad: ${_institution ? _institution.name : ''}</p>
					<p>Nombre del Producto o Servicio: ${_service ? _service.name : ''}</p>
					<p>Por favor valide que el requisito cumpla con las especificaciones de la evidencia.</p>
					<p>Para Subsanar por favor ingrese a la plataforma del Sello de Excelencia Gobierno Digital Colombia,
					ingrese a <b>Postular</b> y Seleccione el Producto o Servicio en la sección <b>Continuar con una postulación anterior</b></p>
					<p>Nuestros mejores deseos,<\p>
					<p>El equipo del Sello de Excelencia Gobierno Digital Colombia<\p>`)
				} else if (_new.id_status == CONSTANTS.SERVICE.ASIGNACION) {
					model_entity_user_answer.getByParams({ id_service: _service.id })
						.then((results) => {
							let ready = true
							results.data.forEach((answer) => {
								if (answer.id_status == CONSTANTS.SERVICE.INCOMPLETO
									|| answer.id_status == CONSTANTS.SERVICE.VERIFICACION) {
									ready = false
								}
							})

							if (ready) {
								return model_entity_service.update({ id: _service.id, current_status: CONSTANTS.SERVICE.EVALUACION }, { id: _service.id })
							}
							return
						})
				} else if (_new.id_status == CONSTANTS.SERVICE.CUMPLE) {
					model_entity_user_answer.getByParams({ id_service: _service.id })
						.then((results) => {
							let ready = true
							results.data.forEach((answer) => {
								if (answer.id_status !== CONSTANTS.SERVICE.CUMPLE) {
									ready = false
								}
							})
							if (ready) {
								return model_entity_service.update({ id: _service.id, current_status: CONSTANTS.SERVICE.CUMPLE }, { id: old.id_service })
							}
							return
						})
				} else if (_new.id_status == CONSTANTS.SERVICE.NO_CUMPLE) {
					return model_entity_service.update({ id: _service.id, current_status: CONSTANTS.SERVICE.NO_CUMPLE }, { id: old.id_service })
				}
			})
	})
	emiter.on('evaluation_request.created', (_new) => {
		let user = null
		if (_new.id_request_status === CONSTANTS.EVALUATION_REQUEST.SOLICITADO) {
			model_user.getByUid('' + _new.id_user).then((result) => {
				user = result[0]
				model_entity_motives.getAll({ limit: 5000 }).then((results) => {
					if (results.data.length) {
						let motive = null
						results.data.forEach((_motive) => {
							if (_motive.name.name === CONSTANTS.MOTIVES.EVALUATOR.CALIFICAR_REQUISITO) {
								//'id_category': _service.id_category
								motive = _motive
								return
							}
						})
						entity_model_points.addUserPoints(user.id, motive.id, '')
					}
				})
			})
		}
	})
	emiter.on('evaluation_request.updated', (old, _new) => {
		if (old.id_request_status != _new.id_request_status || _new.id_request_status === CONSTANTS.EVALUATION_REQUEST.RECHAZADO) {
			let _status = null
			let _evaluator = null
			let _answer = null
			let _entity = null
			let _admin = null
			let _service = null
			let _topic = null
			let _institution = null
			model_request_status.getByUid('' + _new.id_request_status)
				.then((result) => {
					_status = result[0]
					return model_user.getAdmin()
				}).then((result) => {
					_admin = result[0]
					return model_entity_user_answer.getByUid(old.id_answer)
				}).then((result) => {
					_answer = result.data[0]
					return model_entity_service.getByUid('' + _answer.id_service)
				}).then((result) => {
					_service = result.data[0]
					return model_user.getByUid('' + old.id_user)
				}).then((result) => {
					_evaluator = result[0]
					return model_user.getByUid('' + _answer.id_user)
				}).then((result) => {
					_entity = result[0]
					return model_entity_questiontopic.getByUid(_new.question.id_topic)
				}).then((result) => {
					_topic = result.data[0]
					let duration = _status.duration
					let alarm = duration - _status.pre_end
					let atime = new Date()
					atime.setDate(atime.getDate() + alarm)
					let ftime = new Date()
					ftime.setDate(ftime.getDate() + duration)
					_new.alert_time = atime
					_new.end_time = ftime
					if (_new.id_request_status == CONSTANTS.EVALUATION_REQUEST.ACEPTADO) {
						model_entity_motives.getAll({ limit: 5000 }).then((results) => {
							if (results.data.length) {
								let motive = null
								results.data.forEach((_motive) => {
									if (_motive.name.name === CONSTANTS.MOTIVES.EVALUATOR.ACEPTAR_REQUISITO) {
										//'id_category': _service.id_category
										motive = _motive
										return
									}
								})
								entity_model_points.addUserPoints(_evaluator.id, motive.id, '')
							}
						})
					}
					//5 Rechazado
					if (_new.id_request_status == CONSTANTS.EVALUATION_REQUEST.RECHAZADO) {
						if (_new.branch >= 3) {
							utiles.sendEmail(_admin.email, null, null,
								'Tercer Rechazo Requisito - Sello de Excelencia Gobierno Digital Colombia',
								`<p>Se ha rechazado el siguiente requisito 3 veces.</p>
								<p>Categoría: ${_service.category.name}</p>
								<p>Nivel: ${_new.question.level}</p>
								<p>Temática: ${_topic.name}</p>
								<p>Requisito: ${_new.question.text}</p>
								<p>Entidad: ${_service.institution.name}</p>
								<p>Nombre del Producto o Servicio: ${_service.name}</p>
								<p>Ha sido asignado al administrador del sistema</p>`)
							model_entity_evaluation_request.update({ id: _new.id, id_user: _admin.id, id_request_status:3 }, { id: _new.id })
						} else {
							// add rejection without trigger update event
							model_entity_evaluation_request.addRejection(_new.id)
							model_entity_service.reasignate(_new)
						}
						model_entity_motives.getAll({ limit: 5000 }).then((results) => {
							if (results.data.length) {
								let motive = null
								results.data.forEach((_motive) => {
									if (_motive.name.name === CONSTANTS.MOTIVES.EVALUATOR.RECHAZAR_REQUISITO) {
										//'id_category': _service.id_category
										motive = _motive
										return
									}
								})
								entity_model_points.addUserPoints(_evaluator.id, motive.id, '')
							}
						})
					}
					//6 Retroalimentación
					if (_new.id_request_status == CONSTANTS.EVALUATION_REQUEST.RETROALIMENTACION) {
						model_entity_user_answer.update({ id: _answer.id, id_status: CONSTANTS.SERVICE.RETROALIMENTACION })
					}
					//7 Cumple
					if (_new.id_request_status == CONSTANTS.EVALUATION_REQUEST.CUMPLE) {//add points
						model_entity_motives.getAll({ limit: 5000 }).then((results) => {
							if (results.data.length) {
								let motive = null
								results.data.forEach((_motive) => {
									if (_motive.name.name === CONSTANTS.MOTIVES.EVALUATOR.CALIFICAR_REQUISITO) {
										//'id_category': _service.id_category
										motive = _motive
										return
									}
								})
								entity_model_points.addUserPoints(_evaluator.id, motive.id, '')
							}
						})
						model_entity_evaluation_request.getByParams({ id_answer: _answer.id }).then((results) => {
							let approved = 0
							let rejected = 0
							let total = results.data.length
							results.data.forEach((request) => {
								if (request.id_request_status == CONSTANTS.EVALUATION_REQUEST.CUMPLE) {
									approved += 1
								}
								if (request.id_request_status == CONSTANTS.EVALUATION_REQUEST.NO_CUMPLE) {
									rejected += 1
								}
							})
							if (approved + rejected === total) {
								if (approved >= Math.ceil(total / 2)) {
									model_entity_user_answer.update({ id: _answer.id, id_status: CONSTANTS.SERVICE.CUMPLE }, { id: _answer.id })
								} else if (rejected >= Math.ceil(total / 2)) {
									model_entity_user_answer.update({ id: _answer.id, id_status: CONSTANTS.SERVICE.NO_CUMPLE }, { id: _answer.id })
								}
							}
						})
					}
					//8 No Cumple
					if (_new.id_request_status == CONSTANTS.EVALUATION_REQUEST.NO_CUMPLE) {//add points
						model_entity_motives.getAll({ limit: 5000 }).then((results) => {
							if (results.data.length) {
								let motive = null
								results.data.forEach((_motive) => {
									if (_motive.name.name === CONSTANTS.MOTIVES.EVALUATOR.CALIFICAR_REQUISITO) {
										//'id_category': _service.id_category
										motive = _motive
										return
									}
								})
								entity_model_points.addUserPoints(_evaluator.id, motive.id, '')
							}
						})
						model_entity_evaluation_request.getByParams({ id_answer: _answer.id }).then((results) => {
							let approved = 0
							let rejected = 0
							let total = results.data.length
							results.data.forEach((request) => {
								if (request.id_request_status == CONSTANTS.EVALUATION_REQUEST.CUMPLE) {
									approved += 1
								}
								if (request.id_request_status == CONSTANTS.EVALUATION_REQUEST.NO_CUMPLE) {
									rejected += 1
								}
							})
							if (approved + rejected === total) {
								if (approved >= Math.ceil(total / 2)) {
									model_entity_user_answer.update({ id: _answer.id, id_status: CONSTANTS.SERVICE.CUMPLE }, { id: _answer.id })
								} else if (rejected >= Math.ceil(total / 2)) {
									model_entity_user_answer.update({ id: _answer.id, id_status: CONSTANTS.SERVICE.NO_CUMPLE }, { id: _answer.id })
								}
							}

						})
					}
				})
		}
	})
	emiter.on('user.registered', (user, pass_user) => {
		if (!pass_user) {
			return
		}
		// send an email to the user
		let token = utiles.sign(user.email)
		let template = `
		<div style="text-align:center;margin: 10px auto;">
		<img width="100" src="${HOST}/assets/img/sell_gel.png"/>
		</div>
		<div>
		<p> Hola ${user.name} </p>
		<p>Te has registrado en la plataforma del Sello de Excelencia Gobierno Digital Colombia.</p>
		<p>${user.role == 1 ? 'Como Ciudadano' : 'Tu nueva contraseña para acceder es:' + pass_user}</p>
		<p><a href='${HOST}/activar-cuenta?token=${token}&email=${user.email}&active=1'>
			Haz click aquí para activar tu cuenta </a>
		</p>
		<p>Nuestros mejores deseos,</p>
		<p>El equipo del Sello de Excelencia Gobierno Digital Colombia</p>`
		let cc = null
		if (user.institution) {
			//cc = user.institution.email
		}
		utiles.sendEmail(user.email, cc, null, "Registro Sello de Excelencia", template)
	})
	emiter.on('user.updatepassword', (user, password) => {
		let template = `
		<div style="text-align:center;margin: 10px auto;">
		<img width="100" src="${HOST}/assets/img/sell_gel.png"/>
		</div>
		<div>
		<p>Hola ${user.name} <\p>
		<p>Se ha asignado una nueva contraseña en la plataforma del Sello de Excelencia  Gobierno Digital Colombia.<\p>
		<p>Tu nueva contraseña para acceder es: ${password} <\p>
		<p>Nuestros mejores deseos,<\p>
		<p>El equipo del Sello de Excelencia Gobierno Digital Colombia<\p>`
		utiles.sendEmail(user.email, null, null, "Cambio de Contraseña", template)
	})
	emiter.on('chat.created', (user, request) => {
		let _service = null
		let _topic = null
		model_entity_service.getByUid(request.id_service).then((result) => {
			_service = result.data[0]
			return model_entity_questiontopic.getByUid(request.question.id_topic)
		}).then((result) => {
			_topic = result.data[0]
			utiles.sendEmail(user.email, null, null,
				'Nuevo mensaje - Sello de Excelencia Gobierno Digital Colombia',
				`<div style="text-align:center;margin: 10px auto;">
				<img witdh="100" src="${HOST}/assets/img/sell_gel.png"/>
				</div>
				<div>
				<p>Hola ${user.name} </p>
				<p>Has recibido un nuevo mensaje en la plataforma del Sello de Excelencia Gobierno Digital Colombia</p>
				<p>Para el siguiente requisito:</p>
				<p>Categoría: ${_service.category.name}</p>
				<p>Nivel: ${request.question.level}</p>
				<p>Temática: ${_topic.name}</p>
				<p>Requisito: ${request.question.text}</p>
				<p>Entidad: ${_service.institution.name}</p>
				<p>Nombre del Producto o Servicio: ${_service.name}</p>
				<p>Nuestros mejores deseos,</p>
				<p>El equipo del Sello de Excelencia Gobierno Digital Colombia</p>`)
		})

	})
	emiter.on('service.rated', (id_service, avg) => {
		if (avg <= 3.5) {
			let _service = null
			model_entity_service.getByUid('' + id_service).then((result) => {
				_service = result.data[0]
				return model_user.getAdmin()
			})
				.then((result) => {
					_admin = result[0]
					utiles.sendEmail(_admin.email, null, null, 'Servicio con puntaje bajo', `
				<div style="text-align:center;margin: 10px auto;">
				<img width="100" src="${HOST}/assets/img/sell_gel.png"/>
				</div>
				<div>
				<p>El servicio ${_service.name} tiene una calificación muy baja.</p>
				<p>Da click <a href="${HOST}/detalle/${_service.id}">aquí </a> para ingresar al servicio</p>
				<p>La calificación del servicio es ${avg}</p>
				<p>Nuestros mejores deseos,<\p>
				<p>El equipo del Sello de Excelencia Gobierno Digital Colombia<\p>`
					)
				})
		}
	})
	emiter.on('service.updated', (old, _new, body) => {
		if (!_new.current_status) {
			return
		}
		if (old.current_status === _new.current_status) {
			return
		}
		var _admin = null
		var _status = null
		var _laststatus = null
		model_user.getAdmin()
			.then((result) => {
				_admin = result[0]
				return model_status.getByUid(_new.current_status || old.current_status)
			}).then((result) => {
				_status = result[0]
				return model_entity_service_status.getFiltered({
					filter_fields: ['id_service'],
					filter_values: ['' + _new.id],
					page: 1,
					limit: 1,
					order: 'timestamp desc'
				})
			}).then((result) => {
				let _laststatus = result.data[0]
				if (old.current_status != _new.current_status) {
					let duration = _status.duration
					let alarm = duration - _status.pre_end
					let atime = new Date()
					atime.setDate(atime.getDate() + alarm)
					let ftime = new Date()
					ftime.setDate(ftime.getDate() + duration)
					_new.alert_time = atime
					_new.end_time = ftime
					let data = {
						id_service: _new.id,
						id_status: _new.current_status,
						valid_to: ftime,
						alarm: atime,
						level: _laststatus.level || 1
					}
					if (body.level) {
						data.level = body.level
					}
					if (_new.current_status == CONSTANTS.SERVICE.VERIFICACION) { // verification
						utiles.sendEmail(_admin.email, null, null,
							'Nueva postulación Sello de Excelencia Gobierno Digital Colombia', `
						<div style="text-align:center;margin: 10px auto;">
						<img width="100" src="${HOST}/assets/img/sell_gel.png"/>
						</div>
						<p>Hola Administrador:</p>
						<p>Se ha registrado la siguiente postulación en la plataforma de Sello de Excelencia Gobieno Digital Colombia:</p>
						<p>${old.id} - ${old.name}</p>
						<p>Ahora se encuentra disponible para verificación</p>
						<p>Nuestros mejores deseos,<\p>
						<p>El equipo del Sello de Excelencia Gobierno Digital Colombia<\p>`)
						model_entity_institution.getUser(old.id_institution).then((result) => {
							let user = result[0]
							utiles.sendEmail(user.email, null, null,
								'Nueva postulación Sello de Excelencia Gobierno Digital Colombia',
								`<div style="text-align:center;margin: 10px auto;">
							<img width="100" src="${HOST}/assets/img/sell_gel.png"/>
							</div>
							<p>Hola ${user.name}:</p>
							<p>Hemos recibido tu postulación para el Sello de Excelencia Gobierno Digital Colombia.</p>
							<p>Próximamente te notificaremos si ha sido aceptada.</p>
							<p>Nuestros mejores deseos,<\p>
							<p>El equipo del Sello de Excelencia Gobierno Digital Colombia<\p>`)
						})
						model_entity_motives.getAll({ limit: 5000 }).then((results) => {
							if (results.data.length) {
								let motive = null
								results.data.forEach((_motive) => {
									if (_motive.name.name === CONSTANTS.MOTIVES.ENTITY.POSTULAR_SERVICIO
									&& _motive.id_category === _new.id_category
									&& _motive.level === data.level) {
										motive = _motive
										return
									}
								})
								entity_model_points.addInstitutionPoints(old.id_institution, motive.id, '')
							}
						})
					}
					if (_new.current_status == CONSTANTS.SERVICE.EVALUACION) {
						model_entity_service.asignate(_new).then((evaluations) => {
							if (evaluations.length == 0) {
								return
							}
							let data = {
								col_names: [],
								data: evaluations
							}
							for (let i in evaluations[0]) {
								data.col_names.push(i)
							}
							model_entity_evaluation_request.createMultiple(
								data
							)
						})
						model_entity_user_answer.update({ id_status: CONSTANTS.SERVICE.EVALUACION }, { id_service: _new.id })
						model_entity_institution.getUser(old.id_institution).then((result) => {
							let user = result[0]
							utiles.sendEmail(user.email, null, null,
								'Aceptación Postulación Sello de Excelencia',
								`<div style="text-align:center;margin: 10px auto;">
							<img width="100" src="${HOST}/assets/img/sell_gel.png"/>
							</div>
							<p>Hola ${user.name}</p>
							<p>Hemos aceptado tu postulación para el Sello de Excelencia Gobierno Digital Colombia.</p>
							<p>Ahora iniciará el proceso de evaluación de los requisitos.</p>
							<p>Nuestros mejores deseos,<\p>
							<p>El equipo del Sello de Excelencia Gobierno Digital Colombia<\p>`)
						})
					}
					if (_new.current_status == CONSTANTS.SERVICE.CUMPLE) {
						model_entity_motives.getAll({ limit: 5000 }).then((results) => {
							if (results.data.length) {
								let motive = null
								results.data.forEach((_motive) => {
									if (_motive.name.name === CONSTANTS.MOTIVES.ENTITY.CUMPLE
										&& _motive.id_category === _new.id_category
										&& _motive.level === data.level) {
										//'id_category': _service.id_category
										motive = _motive
										return
									}
								})
								entity_model_points.addInstitutionPoints(old.id_institution, motive.id, '')
							}
						})

						model_entity_institution.getUser(old.id_institution).then((result) => {
							let user = result[0]
							utiles.sendEmail(user.email, null, null,
								'Felicitaciones has recibido el Sello de Excelencia',
								`<div style="text-align:center;margin: 10px auto;">
							<img width="100" src="${HOST}/assets/img/sell_gel.png"/>
							</div>
							<p>Hola ${user.name}</p>
							<p>Hemos otorgado el Sello de Excelencia Gobierno Digital Colombia.</p>
							<p>Te invitamos a descargar el diploma en la plataforma del Sello de Excelencia Gobierno Digital Colombia en el siguiente 
							<a href="${HOST}/sign-in">enlace.</a></p>
							<p>Así mismo, te invitamos a insertar el siguiente código en tu página web o servicio digital para mostrarle a los ciudadanos tu certificación.</p>
							<code>
								<pre>
									<embed width="400" height="800" src="${HOST}/embeded/${_new.id}"></embed>
								</pre>
							</code>
							<p>Nuestros mejores deseos,<\p>
							<p>El equipo del Sello de Excelencia Gobierno Digital Colombia<\p>`)
						})
					}
					if (_new.current_status == CONSTANTS.SERVICE.NO_CUMPLE) {
						model_entity_motives.getAll({ limit: 5000 }).then((results) => {
							if (results.data.length) {
								let motive = null
								results.data.forEach((_motive) => {
									if (_motive.name.name === CONSTANTS.MOTIVES.ENTITY.NO_CUMPLE
										&& _motive.id_category === _new.id_category
										&& _motive.level === data.level) {
										//'id_category': _service.id_category
										motive = _motive
										return
									}
								})
								entity_model_points.addInstitutionPoints(old.id_institution, motive.id, '')
							}
						})

						model_entity_institution.getUser(old.id_institution).then((result) => {
							let user = result[0]

							utiles.sendEmail(user.email, null, null,
								'No Cumplimiento Sello de Excelencia Gobierno Digital Colombia',
								`<div style="text-align:center;margin: 10px auto;">
							<img width="100" src="${HOST}/assets/img/sell_gel.png"/>
							</div>
							<p>Hola ${user.name}</p>
							<p>Te informamos que tu postulación no cumple con los requisitos exigidos por el Sello de Excelencia Gobierno Digital Colombia.</p>
							<p>Te invitamos a postular nuevamente en la plataforma del Sello de Excelencia Gobierno Digital Colombia.</p>
							<p>Nuestros mejores deseos,<\p>
							<p>El equipo del Sello de Excelencia Gobierno Digital Colombia<\p>`)
						})
					}
					if (old.current_status == CONSTANTS.SERVICE.VERIFICACION && _new.current_status === CONSTANTS.SERVICE.INCOMPLETO) {
						model_entity_motives.getAll({ limit: 5000 }).then((results) => {
							if (results.data.length) {
								let motive = null
								results.data.forEach((_motive) => {
									if (_motive.name.name === CONSTANTS.MOTIVES.ENTITY.POSTULACION_RECHAZADA
										&& _motive.id_category === _new.id_category
										&& _motive.level === data.level) {
										//'id_category': _service.id_category
										motive = _motive
										return
									}
								})
								if(motive){
									entity_model_points.addInstitutionPoints(old.id_institution, motive.id, '')
								}
							}
						})
						return
					}
					return model_entity_service_status.create(data)
				}
				if(_new.active === 0 && old.active===1){
					model_entity_institution.getUser(old.id_institution).then((result) => {
						let user = result[0]
						let tpl = `
						<div style="text-align:center;margin: 10px auto;">
						<img width="100" src="${HOST}/assets/img/sell_gel.png"/>
						</div>
						<p>Hola ${user.name}</p>
						<p>Hemos desactivado tu servicio por favor ponte en contacto con nosotros.</p>
						<p>Nuestros mejores deseos,<\p>
						<p>El equipo del Sello de Excelencia Gobierno Digital Colombia<\p>`
						utiles.sendEmail(user.email, null, null, 'Asignación de Requisito', tpl)
					})
				}
				if(_new.active === 1 && old.active===0){
					model_entity_institution.getUser(old.id_institution).then((result) => {
						let user = result[0]
						let tpl = `
						<div style="text-align:center;margin: 10px auto;">
						<img width="100" src="${HOST}/assets/img/sell_gel.png"/>
						</div>
						<p>Hola ${user.name}</p>
						<p>Hemos re-activado tu servicio.</p>
						<p>Nuestros mejores deseos,<\p>
						<p>El equipo del Sello de Excelencia Gobierno Digital Colombia<\p>`
						utiles.sendEmail(user.email, null, null, 'Asignación de Requisito', tpl)
					})
				}
			})
	})
	emiter.on('evaluation_request.asignation', (_new) => {
		let tout = Math.floor(Math.random() * 10000) + 10
		model_user.getByUid(_new.id_user).then((result) => {
			let user = result[0]
			setTimeout(() => {
				let tpl = `
				<div style="text-align:center;margin: 10px auto;">
				<img width="100" src="${HOST}/assets/img/sell_gel.png"/>
				</div>
				<p>Hola ${user.name} ${user.lastname}</p>
				<p>Se ha asignado un nuevo requisito para tu evaluación en la plataforma del Sello de Excelencia Gobierno Digital Colombia.</p>
				<p>Para mayor información por favor consultar el siguiente  <a href="${HOST}">enlace</a>
				<p>Nuestros mejores deseos,<\p>
				<p>El equipo del Sello de Excelencia Gobierno Digital Colombia<\p>`
				utiles.sendEmail(user.email, null, null, 'Asignación de Requisito', tpl)
			}, tout)
		})
	})
	emiter.on('institution.updated',(old,_new)=>{
		if(old.active === 0 && _new.active === 1){ //activar
			model_entity_service.update({is_active:1},{id_institution:_new.id})
		}
		if(old.active === 1 && _new.active === 0){ //desactivar
			model_entity_service.update({is_active:0},{id_institution:_new.id})
		}
	})
	emiter.on('about', (_new) => {
		///RENOVACIÓN
		//
		let tout = Math.floor(Math.random() * 1000) + 100
		model_user.getByUid(_new.id_user).then((result) => { // VENCIMIENTO SELLOS
			let user = result[0]
			setTimeout(() => {
				var valid_to = _service.status.valid_to.toLocaleString()
				utiles.sendEmail(email, null, null, 'Vencimiento Sello de Excelencia Gobierno Digital Colombia', `
				<div style="text-align:center;margin: 10px auto;">
				<img width="100" src="${HOST}/assets/img/sell_gel.png"/>
				</div>
				<p>Hola ${user.name}</p>
				<p>La Certificación:</p>
				<p>Categoría: ${service.category.name}</p>
				<p>Nivel: ${question.level}</p>
				<p>Entidad: ${institution.name}</p>
				<p>Nombre del Producto o Servicio: ${service.name}</p>
				<p>Se vence el <b>${valid_to}</b></p>
				<p>Por favor ingresa a la plataforma para Renovar el Sello de Excelencia Gobierno Digital Colombia en la Pestaña 
				<b>Actividad</b> -> <b>Sellos Otorgados</b> da click en Renovar el Sello.</p>
				<p>Luego debes ir a la pestaña <b>Postular</b> y Seleccionar el Servicio en la sección <b>Continuar con una postulación anterior</b>
				<p>Ten en cuenta que si la renovación no se efectúa antes de la fecha de vencimiento tendrás que hacer todo el proceso de postulación nuevamente</p>
				<p>Nuestros mejores deseos,<\p>
				<p>El equipo del Sello de Excelencia Gobierno Digital Colombia<\p>`)
			}, tout)
		})

		setTimeout(() => {
			var valid_to = _service.status.valid_to.toLocaleString()
			utiles.sendEmail(_evaluator.email, _admin.email, null, 'Vencimiento de Evaluación - Sello de Excelencia Gobierno Digital Colombia', `
			<div style="text-align:center;margin: 10px auto;">
			<img width="100" src="${HOST}/assets/img/sell_gel.png"/>
			</div>
			<p>Hola ${user.name}</p>
			<p>El plazo de evaluación del siguiente requisito:</p>
			<p>Categoría: ${service.category.name}</p>
			<p>Nivel: ${question.level}</p>
			<p>Temática: ${question.topic.name}</p>
			<p>Requisito: ${question.text}</p>
			<p>Entidad: ${institution.name}</p>
			<p>Nombre del Producto o Servicio: ${service.name}</p>
			<p>Está próximo a vencerse <b>${valid_to}</b></p>
			<p>Por favor ingresa a la plataforma para Evaluar el Requisito.</p>
			<p>Nuestros mejores deseos,<\p>
			<p>El equipo del Sello de Excelencia Gobierno Digital Colombia<\p>`)
		}, tout)
	})

}
module.exports = Events