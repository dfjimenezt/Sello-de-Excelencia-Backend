if (!dmt) {
	var dmt = {}
}
dmt.config = [
	{
		section: "Usuarios",
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
			}
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
				name: "Categorías",
				path: "categorias",
				entity: "category"
			}]
	},
	{
		section: "Foro",
		path: "foro",
		pages: [
			{
				name: "Temas",
				path: "temas",
				entity: "topic"
			},
			{
				name: "Sesiones",
				path: "sessions",
				entity: "message"
			}]
	}
]
try {
	module.exports = dmt;
} catch (e) {
	console.log(e);
}