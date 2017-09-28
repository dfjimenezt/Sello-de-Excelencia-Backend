if (!dmt) {
	var dmt = {}
}
dmt.config = [
	{
		section: "General",
		path: "general",
		pages:[
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
				name: "Evaluadores",
				path: "evaluadores",
				entity: "evaluator",
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
						templateUrl: "views/user/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemEvaluatorController",
						templateUrl: "views/user/detail.html"
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
			},
		]
	},
	{
		section: "Postulaciones",
		path: "postulaciones",
		pages: [
			{
				name: "En Postulación",
				path: "incompletos",
				entity: "service",
				filters:{
					'current_status':[10]
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
				name: "Cumplidos",
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
				name: "No Cumplidos",
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
				name: "Logos",
				path: "logos/1",
				entity: "config",
				controller: "detailItemSingleController",
				templateUrl: "views/single/detail.html",
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
				name: "Puntaje",
				path: "puntaje",
				entity: "motives"
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
				name: "Aprende y Enseña",
				path: "aprende_ensena",
				entity: "hangouts"
			},
			{
				name: "Preguntas Ciudadano",
				path: "preguntas",
				entity: "category_questions"
			},
			{
				name: "Ciudades",
				path: "ciudades",
				entity: "city"
			},
			{
				name: "Regiones",
				path: "regiones",
				entity: "region"
			},
			{
				name: "Roles",
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