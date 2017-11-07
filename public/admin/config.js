if (!dmt) {
	var dmt = {}
}
dmt.config = [
	{
		section: "General",
		path: "general",
		pages:[
			{
				name:"Logos",
				path: "logos",
				filters:{
					'id':[1]
				},
				entity: "config",
				controller: "detailItemController",
				templateUrl: "views/logos/detail.html",
			},
			{
				name: "Banner",
				path: "banner",
				entity: "banner",
				controller: "bannerListController",
				templateUrl: "views/banner/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "bannerDetailController",
						templateUrl: "views/banner/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "bannerDetailController",
						templateUrl: "views/banner/detail.html"
					}
				]
			},
			{
				name: "Salón de la fama",
				path: "hall",
				entity: "hall_of_fame",
				controller: 'hallFameController',
				templateUrl: "views/hall/list.html",
			},
			{
				name: "Pie de página",
				path: "pie_pagina",
				filters:{
					'id':[1]
				},
				entity: "footer",
				controller: "detailItemController",
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
				controller: "representantListController",
				templateUrl: "views/representant/list.html",
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
				controller: "evaluatortListController",
				templateUrl: "views/evaluator/list.html",
				filters:{
					'roles.id':[2]
				},
				pages: [
					{
						name: "add",
						path: "add",
						controller: "evaluatorDetailController",
						templateUrl: "views/evaluator/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "evaluatorDetailController",
						templateUrl: "views/evaluator/detail.html"
					}
				]
			},
			{
				name: "Ciudadanos",
				path: "ciudadanos",
				entity: "user",
				controller: "citizenListController",
				templateUrl: "views/citizen/list.html",
				filters:{
					'roles.id':[1]
				},
				pages: [
					{
						name: "add",
						path: "add",
						controller: "citizenDetailController",
						templateUrl: "views/citizen/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "citizenDetailController",
						templateUrl: "views/citizen/detail.html"
					}
				]
			},
			{
				name: "Administradores",
				path: "administradores",
				entity: "user",
				controller: "admonListController",
				templateUrl: "views/admon/list.html",
				filters:{
					'roles.id':['!= 1','!= 2','!= 4']
				},
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailItemUserController",
						templateUrl: "views/admon/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemUserController",
						templateUrl: "views/admon/detail.html"
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
				controller: "servicesListController",
				templateUrl: "views/service/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "servicesDetailController",
						templateUrl: "views/service/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "servicesDetailController",
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
				controller: "servicesListController",
				templateUrl: "views/service/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "servicesDetailController",
						templateUrl: "views/service/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "servicesDetailController",
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
				controller: "servicesListController",
				templateUrl: "views/service/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "servicesDetailController",
						templateUrl: "views/service/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "servicesDetailController",
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
				controller: "servicesListController",
				templateUrl: "views/service/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "servicesDetailController",
						templateUrl: "views/service/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "servicesDetailController",
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
				controller: "questionListController",
				templateUrl: "views/question/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "questionDetailController",
						templateUrl: "views/question/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "questionDetailController",
						templateUrl: "views/question/detail.html"
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
				controller: "pointsListController",
				templateUrl: "views/points/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "pointsDetailController",
						templateUrl: "views/points/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "pointsDetailController",
						templateUrl: "views/points/detail.html"
					}
				]
			},
			{
				name: "Aprende y Enseña",
				path: "aprende_ensena",
				entity: "hangouts",
				controller: "learnListController",
				templateUrl: "views/learn/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "learnDetailController",
						templateUrl: "views/learn/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "learnDetailController",
						templateUrl: "views/learn/detail.html"
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
				controller: "rolesListController",
				templateUrl: "views/roles/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "rolesDetailController",
						templateUrl: "views/roles/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "rolesDetailController",
						templateUrl: "views/roles/detail.html"
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