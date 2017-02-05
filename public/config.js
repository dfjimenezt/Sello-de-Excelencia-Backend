var dmt={
config : [
		{
		section: "Configuración",
		path: "configuracion",
		pages: [
			{
				name: "Usuarios",
				path: "usuarios",
				controller: "listItemExtendedController",
				templateUrl: "/views/extended/list.html",
				pages: [
					{
						name: "Agregar",
						path: "add",
						controller: "addItemExtendedController",
						templateUrl: "/views/extended/add.html"
					},
					{
						name: "Detail",
						path: "detail/:id",
						controller: "detailItemExtendedController",
						templateUrl: "/views/extended/detail.html"
					},
				],
				entity:"user"
			},
			{
				name: "Roles",
				path: "roles",
				entity: "role"
			},
			{
				name: "Permisos",
				path: "permisos",
				entity: "permission"
			},
			{
				name: "Asignación de Permisos a Roles",
				path: "permisos_roles",
				entity: "permission_role"
			},
			{
				name: "Parametros Plataforma",
				path: "parametros",
				entity: "config"
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
				controller: "listItemExtendedController",
				templateUrl: "/views/extended/list.html",
				pages:[
					{
						name: "Agregar",
						path: "add",
						controller: "detailItemExtendedController",
						templateUrl: "/views/extended/detail.html"
					},
					{
						name: "Detalle",
						path: "detail/:id",
						controller: "detailItemExtendedController",
						templateUrl: "/views/extended/detail.html"
					},
				],
				entity: "institution",
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
				entity: "service"
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
]};

try {
	module.exports = dmt;
} catch (e) {
	console.log(e);
}