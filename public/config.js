var cmsConfig = [
		{
			section:"Configuración",
			path: "configuracion",
			pages:[{
				name:"Usuarios",
				path:"usuarios",
				table:"user",
				defaultSort:"id",
				endpoint:"/api/configuration/",//get service
				fields:[
					{
						name:"id",
						type:"int",
						disabled:"true"
					},
					{
						name:"name",
						type:"string",
						disabled:"false"
					},
					{
						name:"lastname",
						type:"string",
						disabled:"false"
					},
					{
						name:"email",
						type:"email",
						disabled:"false"
					},
					{
						name:"phone",
						type:"string",
						disabled:"false"
					},
					{
						name:"extension",
						type:"string",
						disabled:"false"
					},
					{
						name:"mobile",
						type:"string",
						disabled:"false"
					},
					{
						name:"active",
						type:"boolean",
						disabled:"false"
					},
					{
						name:"verified",
						type:"boolean",
						disabled:"true"
					},
					{
						name:"tmp_pwd",
						type:"boolean",
						disabled:"false"
					},
					{
						name:"terms",
						type:"boolean",
						disabled:"false"
					},
					{
						name:"timestamp",
						type:"string",
						disabled:"true"
					}
				]
			},{
				name:"Roles",
				table:"role",
				path:"roles",
				defaultSort:"id",
				endpoint:"/api/configuration/",//get service
				fields:[
					{
						name:"id",
						type:"int",
						disabled:"true"
					},
					{
						name:"name",
						type:"string",
						disabled:"false"
					}
				]
			},
			{
				name:"Permisos",
				table:"permission",
				path:"permisos",
				defaultSort:"id",
				endpoint:"/api/configuration/",//get service
				fields:[
					{
						name:"id",
						type:"int",
						disabled:"true"
					},
					{
						name:"name",
						type:"string",
						disabled:"false"
					}
				]
			},
			{
				name:"Asignación de Permisos a Roles",
				table:"permission_role",
				path:"permisos_roles",
				defaultSort:"id_role",
				endpoint:"/api/configuration/",//get service
				fields:[
					{
						name:"id_role",
						type:"link",
						disabled:"false",
						table:"role",
						foreign_key:"id",
						foreign_name:"name"
					},
					{
						name:"id_permission",
						type:"link",
						disabled:"false",
						table:"permission",
						foreign_key:"id",
						foreign_name:"name"
					}
				]
			},
			]
		},
		{
			section:"Lugares",
			path:"lugares",
			pages:[
				{
					name:"Instituciones",
					table:"institution",
					path:"instituciones",
					defaultSort:"name",
					endpoint:"/api/place/",//get service
					fields:[
						{
							name:"id",
							type:"int",
							disabled:"true"
						},
						{
							name:"name",
							type:"string",
							disabled:"false"
						},
						{
							name:"address",
							type:"string",
							disabled:"false"
						},
						{
							name:"email",
							type:"string",
							disabled:"false"
						},
						{
							name:"second_email",
							type:"string",
							disabled:"false"
						},
						{
							name:"phone",
							type:"string",
							disabled:"false"
						},
						{
							name:"head_sector",
							type:"boolean",
							disabled:"false"
						},
						{
							name:"id_city",
							type:"link",
							disabled:"false",
							table:"city",
							foreign_key:"id",
							foreign_name:"name"
						},
						{
							name:"id_user_creator",
							type:"link",
							disabled:"false",
							endpoint:"/api/configuration/",
							table:"user",
							foreign_key:"id",
							foreign_name:"name"
						},
						{
							name:"timestamp",
							type:"string",
							disabled:"true"
						}
					]
				},
				{
					name:"Ciudades",
					table:"city",
					path:"ciudades",
					defaultSort:"id",
					endpoint:"/api/place/",//get service
					fields:[
						{
							name:"id",
							type:"int",
							disabled:"true"
						},
						{
							name:"name",
							type:"string",
							disabled:"false"
						},
						{
							name:"code",
							type:"string",
							disabled:"false"
						},
						{
							name:"id_region",
							type:"link",
							disabled:"false",
							table:"region",
							foreign_key:"id",
							foreign_name:"name"
						}
					]
				},
				{
					section:"Foro",
					name:"Regiones",
					path:"regiones",
					table:"region",
					defaultSort:"id",
					endpoint:"/api/place/",//get service
					fields:[
						{
							name:"id",
							type:"int",
							disabled:"true"
						},
						{
							name:"name",
							type:"string",
							disabled:"false"
						},
						{
							name:"id_capital",
							type:"link",
							disabled:"false",
							table:"city",
							foreign_key:"id",
							foreign_name:"name"
						}
					]
				}
			]
		},
		{
			section:"Sello de Excelencia",
			path:"sello_de_excelencia",
			pages:[
				{
					name:"Servicios",
					table:"service",
					path:"servicios",
					defaultSort:"name",
					endpoint:"/api/service/",
					fields:[
						{
							name:"id",
							type:"int",
							disabled:"true"
						},
						{
							name:"name",
							type:"string",
							disabled:"false"
						},
						{
							name:"address",
							type:"string",
							disabled:"false"
						},
						{
							name:"email",
							type:"email",
							disabled:"false"
						},
						{
							name:"second_email",
							type:"email",
							disabled:"false"
						},
						{
							name:"second_email",
							type:"email",
							disabled:"false"
						},
						{
							name:"id_institution",
							type:"link",
							disabled:"false",
							table:"institution",
							endpoint:"/api/place/",
							foreign_key:"id",
							foreign_name:"name"
						},
						{
							name:"id_user_creator",
							type:"link",
							disabled:"false",
							table:"user",
							endpoint:"/api/configuration/",
							foreign_key:"id",
							foreign_name:"name"
						},
						{
							name:"hash",
							type:"string",
							disabled:"false"
						},
						{
							name:"rate",
							type:"int",
							disabled:"true"
						},
						{
							name:"id_category",
							type:"link",
							disabled:"false",
							table:"category",
							endpoint:"/api/service/",
							foreign_key:"id",
							foreign_name:"name"
						}
					]
				},
				{
					name:"Categorías",
					table:"category",
					path:"categorias",
					endpoint:"/api/service/",
					fields:[
						{
							name:"id",
							type:"int",
							disabled:"true"
						},
						{
							name:"name",
							type:"string",
							disabled:"false"
						}
					]
				}
			]
		},
		{
			section:"Foro",
			path:"foro",
			pages:[{
				name:"Temas",
				table:"topic",
				path:"temas",
				defaultSort:"name",
				endpoint:"/api/forum/",
				fields:[
					{
						name:"id",
						type:"int",
						disabled:"true"
					},
					{
						name:"name",
						type:"string",
						disabled:"false"
					},
					{
						name:"id_parent",
						type:"link",
						disabled:"false",
						table:"topic",
						foreign_key:"id",
						foreign_name:"name"
					}
				]
			}]
		}
	];

try{
    module.exports = cmsConfig;
}catch(e){
	console.log(e);
}