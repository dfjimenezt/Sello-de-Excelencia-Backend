var cmsConfig = [
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
				entity: {
					name: "Usuario",
					table: "user",
					defaultSort: "id",
					endpoint: "/api/configuration/",//get service
					fields: [
						{
							name: "id",
							type: "int",
							disabled: "true",
							key: "true"
						},
						{
							name: "name",
							type: "string",
							disabled: "false",
							searchable: "true"
						},
						{
							name: "lastname",
							type: "string",
							disabled: "false",
							searchable: "true"
						},
						{
							name: "email",
							type: "email",
							disabled: "false"
						},
						{
							name: "phone",
							type: "string",
							disabled: "false"
						},
						{
							name: "extension",
							type: "string",
							disabled: "false"
						},
						{
							name: "mobile",
							type: "string",
							disabled: "false"
						},
						{
							name: "active",
							type: "boolean",
							disabled: "false"
						},
						{
							name: "verified",
							type: "boolean",
							disabled: "true"
						},
						{
							name: "tmp_pwd",
							type: "boolean",
							disabled: "false"
						},
						{
							name: "terms",
							type: "boolean",
							disabled: "false"
						},
						{
							name: "timestamp",
							type: "string",
							disabled: "true"
						}
					]
				}
			},
			{
				name: "Roles",
				path: "roles",
				entity: {
					table: "role",
					defaultSort: "id",
					endpoint: "/api/configuration/",//get service
					fields: [
						{
							name: "id",
							type: "int",
							disabled: "true",
							key: "true"
						},
						{
							name: "name",
							type: "string",
							disabled: "false"
						}
					]
				}
			},
			{
				name: "Permisos",
				path: "permisos",
				entity: {
					table: "permission",
					defaultSort: "id",
					endpoint: "/api/configuration/",//get service
					fields: [
						{
							name: "id",
							type: "int",
							disabled: "true",
							key: "true"
						},
						{
							name: "name",
							type: "string",
							disabled: "false"
						}
					]
				}
			},
			{
				name: "Asignación de Permisos a Roles",
				path: "permisos_roles",
				entity: {
					table: "permission_role",
					defaultSort: "id_role",
					endpoint: "/api/configuration/",//get service
					fields: [
						{
							name: "id_role",
							type: "link",
							disabled: "false",
							table: "role",
							foreign_key: "id",
							foreign_name: "name",
							readOnly: true,
							key: "true"
						},
						{
							name: "id_permission",
							type: "link",
							disabled: "false",
							table: "permission",
							foreign_key: "id",
							foreign_name: "name",
							readOnly: true,
							key: "true"
						}
					]
				}
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
				entity: {
					table: "institution",
					defaultSort: "id",
					endpoint: "/api/place/",
					filters: [
						{
							name: "Region",
							table: "region",
							endpoint: "/api/place/",
							foreign_key: "id",
							foreign_name: "name",
							fields: [{
								name: "id_city",
								foreign_key: "id_region"
							}],
						}
					],
					fields: [
						{
							name: "id",
							type: "int",
							disabled: "true",
							key: "true"
						},
						{
							name: "name",
							type: "string",
							disabled: "false"
						},
						{
							name: "address",
							type: "string",
							disabled: "false"
						},
						{
							name: "email",
							type: "string",
							disabled: "false"
						},
						{
							name: "second_email",
							type: "string",
							disabled: "false"
						},
						{
							name: "phone",
							type: "string",
							disabled: "false"
						},
						{
							name: "head_sector",
							type: "boolean",
							disabled: "false"
						},
						{
							name: "id_city",
							type: "link",
							disabled: "false",
							table: "city",
							foreign_key: "id",
							foreign_name: "name",
						},
						{
							name: "id_user_creator",
							type: "link",
							disabled: "false",
							endpoint: "/api/configuration/",
							table: "user",
							foreign_key: "id",
							foreign_name: "name"
						},
						{
							name: "timestamp",
							type: "string",
							disabled: "true"
						}
					]
				},
			},
			{
				name: "Ciudades",
				path: "ciudades",
				entity: {
					table: "city",
					defaultSort: "id",
					endpoint: "/api/place/",//get service
					fields: [
						{
							name: "id",
							type: "int",
							disabled: "true",
							key: "true"
						},
						{
							name: "name",
							type: "string",
							disabled: "false"
						},
						{
							name: "code",
							type: "string",
							disabled: "false"
						},
						{
							name: "id_region",
							type: "link",
							readOnly: "true",
							table: "region",
							foreign_key: "id",
							foreign_name: "name"
						}
					]
				}
			},
			{
				name: "Regiones",
				path: "regiones",
				entity: {
					table: "region",
					defaultSort: "id",
					endpoint: "/api/place/",//get service
					fields: [
						{
							name: "id",
							type: "int",
							disabled: "true",
							key: "true"
						},
						{
							name: "name",
							type: "string",
							disabled: "false"
						},
						{
							name: "id_capital",
							type: "link",
							readOnly: "true",
							table: "city",
							foreign_key: "id",
							foreign_name: "name"
						}
					]
				}
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
				entity: {
					table: "service",
					defaultSort: "name",
					endpoint: "/api/service/",
					fields: [
						{
							name: "id",
							type: "int",
							disabled: "true",
							key: "true"
						},
						{
							name: "name",
							type: "string",
							disabled: "false"
						},
						{
							name: "url",
							type: "string",
							disabled: "false"
						},
						{
							name: "email",
							type: "email",
							disabled: "false"
						},
						{
							name: "second_email",
							type: "email",
							disabled: "false"
						},
						{
							name: "id_institution",
							type: "link",
							disabled: "false",
							table: "institution",
							endpoint: "/api/place/",
							foreign_key: "id",
							foreign_name: "name"
						},
						{
							name: "id_user_creator",
							type: "link",
							disabled: "false",
							table: "user",
							endpoint: "/api/configuration/",
							foreign_key: "id",
							foreign_name: "name"
						},
						{
							name: "hash",
							type: "string",
							disabled: "false"
						},
						{
							name: "rate",
							type: "int",
							disabled: "true"
						},
						{
							name: "id_category",
							type: "link",
							disabled: "false",
							table: "category",
							endpoint: "/api/service/",
							foreign_key: "id",
							foreign_name: "name"
						}
					]
				}
			},
			{
				name: "Categorías",
				path: "categorias",
				entity: {
					table: "category",
					endpoint: "/api/service/",
					defaultSort: "id",
					fields: [
						{
							name: "id",
							type: "int",
							disabled: "true",
							key: "true"
						},
						{
							name: "name",
							type: "string",
							disabled: "false"
						}
					]
				}
			}]
		},
		{
		section: "Foro",
		path: "foro",
		pages: [
			{
				name: "Temas",
				path: "temas",
				entity: {
					table: "topic",
					defaultSort: "id",
					endpoint: "/api/forum/",
					fields: [
						{
							name: "id",
							type: "int",
							disabled: "true",
							key: "true"
						},
						{
							name: "name",
							type: "string",
							disabled: "false"
						},
						{
							name: "id_parent",
							type: "link",
							disabled: "false",
							table: "topic",
							foreign_key: "id",
							foreign_name: "name"
						}
					]
				}
			},
			{
				name: "Sesiones",
				path: "sessions",
				entity: {
					table: "message",
					defaultSort: "id",
					endpoint: "/api/forum/",
					fields: [
						{
							name: "id",
							type: "int",
							disabled: "true",
							key: "true"
						},
						{
							name: "text",
							type: "string",
							disabled: "false"
						},
						{
							name: "id_topic",
							type: "link",
							disabled: "false",
							table: "topic",
							foreign_key: "id",
							foreign_name: "name"
						}
					]
				}
			}]
		}
];

try {
	module.exports = cmsConfig;
} catch (e) {
	console.log(e);
}