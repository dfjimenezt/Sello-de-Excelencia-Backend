var cmsConfig = [
		{
			section:"Configuración",
			pages:[{
				name:"Usuarios",
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
			pages:[
				{
					name:"Instituciones",
					table:"institution",
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
			pages:[
				{
					name:"Servicios",
					table:"service",
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
			pages:[{
				name:"Temas",
				table:"topic",
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

if(module){
    module.exports = cmsConfig;
}