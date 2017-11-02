if (!dmt) {
	var dmt = {}
}
dmt.config = [
	{
		section: "General",
		path: "general",
		pages:[
			{
				name: "Config",
				path: "config",
				entity: "config",
				controller: "listItemExtendedController",
				templateUrl: "views/extended/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailBannerController",
						templateUrl: "views/banner/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailBannerController",
						templateUrl: "views/banner/detail.html"
					}
				]
			},{
				name: "Logos",
				path: "logos/1",
				entity: "config",
				controller: "detailItemSingleController",
				templateUrl: "views/single/detail.html",
			},
			{
				name: "Banner",
				path: "banner",
				entity: "banner",
				controller: "listItemExtendedController",
				templateUrl: "views/extended/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailBannerController",
						templateUrl: "views/banner/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailBannerController",
						templateUrl: "views/banner/detail.html"
					}
				]
			},
			{
				name: "Salón de la fama",
				path: "hall",
				entity: "hall_of_fame",
			},
			{
				name: "Pie de página",
				path: "pie_pagina/1",
				entity: "footer",
				controller: "detailItemSingleController",
				templateUrl: "views/footer/detail.html",
			},
		]
	},
	{
		section: "Usuarios",
		path: "usuarios",
		pages:[
			{
				name: "Entidades",
				path: "entidades",
				entity: "institution",
				controller: "listItemEntityController",
				templateUrl: "views/entity/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailItemEntityController",
						templateUrl: "views/entity/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemEntityController",
						templateUrl: "views/entity/detail.html"
					}
				]
			},
			{
				name: "Representantes",
				path: "representantes",
				entity: "user",
				controller: "listItemEvaluatorController",
				templateUrl: "views/user/list.html",
				filters:{
					'roles.id':[4]
				},
				pages: [
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemRepresentantController",
						templateUrl: "views/representant/detail.html"
					}
				]
			},
			{
				name: "Evaluadores",
				path: "evaluadores",
				entity: "user",
				controller: "listItemEvaluatorController",
				templateUrl: "views/user/list.html",
				filters:{
					'roles.id':[2]
				},
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailItemEvaluatorController",
						templateUrl: "views/evaluator/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemEvaluatorController",
						templateUrl: "views/evaluator/detail.html"
					}
				]
			},
			{
				name: "Administradores",
				path: "administradores",
				entity: "user",
				controller: "listItemUserController",
				templateUrl: "views/user/list.html",
				filters:{
					'roles.id':[3]
				},
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailItemUserController",
						templateUrl: "views/user/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemUserController",
						templateUrl: "views/user/detail.html"
					}
				]
			},
			{
				name: "Ciudadanos",
				path: "ciudadanos",
				entity: "user",
				controller: "listItemUserController",
				templateUrl: "views/user/list.html",
				filters:{
					'roles.id':[1]
				},
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailItemUserController",
						templateUrl: "views/user/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemUserController",
						templateUrl: "views/user/detail.html"
					}
				]
			}
		]
	},
	{
		section: "Postulaciones",
		path: "postulaciones",
		pages: [
			{
				name: "Verificación",
				path: "verificacion",
				entity: "service",
				filters:{
					'current_status':[1]
				},
				controller: "listItemServiceController",
				templateUrl: "views/service/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailItemServiceController",
						templateUrl: "views/service/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemServiceController",
						templateUrl: "views/service/detail.html"
					}
				]
			},
			{
				name: "En Evaluación",
				path: "evaluacion",
				entity: "service",
				filters:{
					'current_status':[5]
				},
				controller: "listItemServiceController",
				templateUrl: "views/service/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailItemServiceController",
						templateUrl: "views/service/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemServiceController",
						templateUrl: "views/service/detail.html"
					}
				]
			},
			{
				name: "Otorgados",
				path: "cumplidos",
				entity: "service",
				filters:{
					'current_status':[8]
				},
				controller: "listItemServiceController",
				templateUrl: "views/service/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailItemServiceController",
						templateUrl: "views/service/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemServiceController",
						templateUrl: "views/service/detail.html"
					}
				]
			},
			{
				name: "No Otorgados",
				path: "no_cumplidos",
				entity: "service",
				filters:{
					'current_status':[11]
				},
				controller: "listItemServiceController",
				templateUrl: "views/service/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailItemServiceController",
						templateUrl: "views/service/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemServiceController",
						templateUrl: "views/service/detail.html"
					}
				]
			},
			{
				name: "Evaluaciones Urgentes",
				path: "urgente",
				entity: "user_answer",
				filters:{
					'evaluators.id_request_status':['< 7'],
					'evaluators.alert_time': ['< '+(new Date().toISOString().substring(0,10))],
				},
				controller: "urgentAnswerController",
				templateUrl: "views/answer/urgent.html",
			}
		]
	},
	{
		section: "Administrar",
		path: "administrar",
		pages: [
			{
				name: "Tipos de Evaluador",
				path: "tipos_evaluador",
				entity: "usertype",
			},
			{
				name: "Categorías",
				path: "categorias",
				entity: "category"
			},
			{
				name: "Temáticas de interés",
				path: "tematicas_interes",
				entity: "questiontopic"
			},
			{
				name: "Requisitos",
				path: "requisitos",
				entity: "question",
				controller: "listItemExtendedController",
				templateUrl: "views/extended/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailItemExtendedController",
						templateUrl: "views/extended/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemExtendedController",
						templateUrl: "views/extended/detail.html"
					}
				]
			},
			{
				name: "Tiempos / Requisito",
				path: "tiempos_requisito",
				entity: "request_status"
			},
			{
				name: "Tiempos / Servicio",
				path: "tiempos_servicio",
				entity: "status"
			},
			{
				name: "Puntaje",
				path: "puntaje",
				entity: "motives",
				controller: "listItemExtendedController",
				templateUrl: "views/extended/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailItemExtendedController",
						templateUrl: "views/extended/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemExtendedController",
						templateUrl: "views/extended/detail.html"
					}
				]
			},
			{
				name: "Aprende y Enseña",
				path: "aprende_ensena",
				entity: "hangouts",
				controller: "listItemExtendedController",
				templateUrl: "views/extended/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailLearnExtendedController",
						templateUrl: "views/extended/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailLearnExtendedController",
						templateUrl: "views/extended/detail.html"
					}
				]
			},
			{
				name: "Preguntas Ciudadano",
				path: "preguntas",
				entity: "category_questions"
			},
			
			{
				name: "Perfiles",
				path: "roles",
				entity: "role",
				controller: "listItemExtendedController",
				templateUrl: "views/extended/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailItemExtendedController",
						templateUrl: "views/extended/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemExtendedController",
						templateUrl: "views/extended/detail.html"
					}
				]
			},
		]
	}
]
try {
	module.exports = dmt;
} catch (e) {
	console.log(e);
}