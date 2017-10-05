module.exports = {
	MOTIVES: {
		'EVALUATOR': {
			'ACEPTAR_REQUISITO': {
				id:1,
				points:1
			},
			'CALIFICAR_REQUISITO': {
				id:2,
				points:1
			},
			'VER_VIDEO': {
				id:3,
				points:1
			},
			'POSTULARSE_EVALUAR': {
				id:4,
				points:1
			},
			'EVENTOS': {
				id:5,
				points:1
			},
			'NO_EVALUAR': {
				id:6,
				points:1
			},
			'RECHAZAR': {
				id:7,
				points:1
			}
		},
		'ENTITY': {
			'PASAR_REQUISITO': {
				id:1,
				points:{
					levels:{
						1:1,
						2:2,
						3:3
					}
				}
			},
			'VER_VIDEO': {
				id:1,
				points:1
			},
			'EVENTOS': {
				id:1,
				points:1
			},
			'PERDER_REQUISITO': {
				id:1,
				points:1
			},
			'PERDER_SERVICIO': {
				id:1,
				points:1
			}
		}
	},
	SERVICE: {
		'VERIFICACION': 1,
		'ASIGNACION': 2,
		'ACEPTACION': 3,
		'RETIRADO': 4,
		'EVALUACION': 5,
		'RETROALIMENTACION': 6,
		'CIERRE': 7,
		'CUMPLE': 8,
		'NO_CUMPLE': 9,
		'INCOMPLETO': 10,
		'RECHAZADO': 11
	},
	EVALUATION_REQUEST: {
		'PENDIENTE': 1,
		'SOLICITADO': 2,
		'ASIGNADO': 3,
		'ACEPTADO': 4,
		'RECHAZADO': 5,
		'RETROALIMENTACION': 6,
		'CUMPLE': 7,
		'NO_CUMPLE': 8
	}
}