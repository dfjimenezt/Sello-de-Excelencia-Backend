/*
*
*   ARRRRRRRRRRRRRRRRRRRRRR!
*
*
*              |    |    |
*             )_)  )_)  )_)
*            )___))___))___)
*           )____)____)_____)\
*         _____|____|____|____\\\__
*---------\                   /---------
*  ^^^^^ ^^^^^^^^^^^^^^^^^^^^^
*    ^^^^      ^^^^     ^^^    ^^
*         ^^^^      ^^^
*
*
*/

var app = angular.module('dmt-back', ['ngMaterial']);
app.config(function ($mdThemingProvider) {
	$mdThemingProvider.theme('default')
		.primaryPalette('blue')
		.accentPalette('grey');
});

app.controller('backCtrl', function ($scope) {
	var leftMenu=[
		{
			section:"Configuración",
			items:[{
				item:"Ciudades",
				table:"city",
				fields:[
					{
						name:"id",
						type:"int",
						editable:"false"
					},
					{
						name:"name",
						type:"string",
						editable:"true"
					},
					{
						name:"code",
						type:"string",
						editable:"true"
					},
					{
						name:"id_country",
						type:"link",
						editable:"true",
						table:"country",
						foreign_key:"id"
					}
				]
			},
			{
				section:"Foro",
				item:"Region",
				table:"region",
				fields:[
					{
						name:"id",
						type:"int",
						editable:"false"
					},
					{
						name:"name",
						type:"string",
						editable:"true"
					},
					{
						name:"id_capital",
						type:"link",
						editable:"true",
						table:"city",
						foreign_key:"id"
					}
				]
			}]
		},
		{
			section:"Foro",
			items:[{
				item:"Temas",
				table:"topic",
				fields:[
					{
						name:"id",
						type:"int",
						editable:"false"
					},
					{
						name:"name",
						type:"string",
						editable:"true"
					},
					{
						name:"id_parent",
						type:"link",
						editable:"true",
						table:"topic",
						foreign_key:"id"
					}
				]
			}]
		}
	];

	$scope.leftMenu = leftMenu;
	$scope.selectItem = function(i){
		$scope.currentItem = i;
	}
});