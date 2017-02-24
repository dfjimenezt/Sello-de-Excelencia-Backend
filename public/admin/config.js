if (!dmt) {
	var dmt = {}
}
dmt.config= [
	{
		section: "Usuarios",
		path:"usuarios",
		pages: [
			{
				name:"Usuarios",
				path:"administrar",
				entity:"user",
				controller: "listItemExtendedController",
				templateUrl: "views/mutuapoly/list.html",
				pages:[
					{
						name:"add",
						path:"add",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					},
					{
						name:"detail",
						path: "detail/:id",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					}
				]
			}
		]
	},
	{
		section:"Contenido",
		path:"contenido",
		pages:[
			{
				name:"TARJETAS DE ENTORNO",
				path:"tarjetas",
				entity:"cardConfig",
				controller: "listItemExtendedController",
				templateUrl: "views/mutuapoly/list.html",
				pages:[
					{
						name:"add",
						path:"add",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					},
					{
						name:"detail",
						path: "detail/:id",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					}
				]
			},
			{
				name:"PLANES",
				path:"planes",
				entity:"plansConfig",
				controller: "listItemExtendedController",
				templateUrl: "views/mutuapoly/list.html",
				pages:[
					{
						name:"add",
						path:"add",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					},
					{
						name:"detail",
						path: "detail/:id",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					}
				]
			},
			{
				name:"CASILLAS DE EMPRESA",
				path:"casillas",
				entity:"companyConfig",
				controller: "listItemExtendedController",
				templateUrl: "views/mutuapoly/list.html",
				pages:[
					{
						name:"add",
						path:"add",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					},
					{
						name:"detail",
						path: "detail/:id",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					}
				]
			}
		]
	},
	{
		section:"Estadísticas Individuales",
		path:"estadisticas",
		pages:[
			{
				name:"INDIVIDUALES",
				path:"individual",
				entity:"userStats"
			}
		]
	},
	{
		section:"Estadísticas Generales",
		path:"estadisticas",
		pages:[
			{
				name:"GENERALES",
				path:"general",
				entity:"statisticsGlobal"
			}
		]
	},
	{
		section:"RANKING",
		path:"ranking",
		pages:[
			{
				name:"RANKING GENERAL",
				path:"general",
				entity:"rankingGlobal",
				controller: "listItemExtendedController",
				templateUrl: "views/mutuapoly/list.html",
				pages:[
					{
						name:"add",
						path:"add",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					},
					{
						name:"detail",
						path: "detail/:id",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					}
				]
			},
			{
				name:"TOP MEJORES PARTIDAS",
				path:"individual",
				entity:"userRanking",
				controller: "listItemExtendedController",
				templateUrl: "views/mutuapoly/list.html",
				pages:[
					{
						name:"add",
						path:"add",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					},
					{
						name:"detail",
						path: "detail/:id",
						controller: "detailItemExtendedController",
						templateUrl: "views/mutuapoly/detail.html"
					}
				]
			}
		]
	}
]
try {
	module.exports = dmt;
} catch (e) {
	console.log(e);
}