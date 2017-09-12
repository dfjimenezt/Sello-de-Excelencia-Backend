if (!dmt) {
	var dmt = {}
}
dmt.config = [
	{
		section: "Plataforma",
		path: "usuarios",
		pages: [
			{
				name: "Usuarios",
				path: "administrar",
				entity: "user",
				controller: "listItemExtendedController",
				templateUrl: "views/mutuapoly/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					}
				]
			},
			{
				name: "Banner",
				path: "banner",
				entity: "banner",
				controller: "listItemExtendedController",
				templateUrl: "views/mutuapoly/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					}
				]
			},
			{
				name: "Footer",
				path: "footer",
				entity: "footer",
				controller: "listItemExtendedController",
				templateUrl: "views/mutuapoly/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					}
				]
			},
		]
	},
	{
		section: "Lugares",
		path: "lugares",
		pages: [
			{
				name: "Instituciones",
				path: "instituciones",
				entity: "institution",
				controller: "listItemExtendedController",
				templateUrl: "views/mutuapoly/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					}
				]
			},
			{
				name: "Instituciones - Usuarios",
				path: "instituciones_usuarios",
				entity: "institution_user"
			},{
				name: "Ciudades",
				path: "ciudades",
				entity: "city"
			},
			{
				name: "Regiones",
				path: "regiones",
				entity: "region"
			}
		]
	},
	{
		section: "Sello de Excelencia",
		path: "sello_de_excelencia",
		pages: [
			{
				name: "Servicios",
				path: "servicios",
				entity: "service",
				controller: "listItemExtendedController",
				templateUrl: "views/mutuapoly/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					}
				]
			},
			{
				name: "Requistos",
				path: "user_answer",
				entity: "user_answer",
				controller: "listItemExtendedController",
				templateUrl: "views/mutuapoly/list.html",
				pages: [
					{
						name: "add",
						path: "add",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					},
					{
						name: "detail",
						path: "detail/:id",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					}
				]
			},
			{
				name: "Categorías",
				path: "categorias",
				entity: "category"
			},
			{
				name: "Temas",
				path: "temas",
				entity: "questiontopic"
			},
			{
				name: "Etapas",
				path: "etapas",
				entity: "form"
			},
			{
				name: "Evaluaciones",
				path: "evaluaciones",
				entity: "evaluation_request"
			}
			
		]
	},
	{
		section: "Foro",
		path: "foro",
		pages: [
			{
				name: "Aprende",
				path: "aprende",
				entity: "hangouts"
			}
		]
	}
]
try {
	module.exports = dmt;
} catch (e) {
	console.log(e);
}