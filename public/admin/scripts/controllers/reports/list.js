angular.module('dmt-back').controller('reportsController', 
function ($scope, $mdDialog, page, entityService, $http) {
	let ctrl = {}
	ctrl.service = entityService('')
	ctrl.service.loadEntity('hall_of_fame')
	ctrl.date_hall = new Date()
	
	ctrl.downloadHall = function(){
		ctrl.service.entities.hall_of_fame.query.filters = {
			date:['>= '+ctrl.date_hall.toISOString().split('T')[0],'<= '+ctrl.date_hall.toISOString().split('T')[0]]
		}
		ctrl.service.entities.hall_of_fame.download().then((response)=>{
			var filename = 'Salón de la Fama.xlsx'
			saveAs(response, filename)
		})
	}

	ctrl.service.loadEntity('service')
	ctrl.downloadServiceReport = function(){
		ctrl.service.downloadUrl('/api/stats/service?download=true&service='+ctrl._service.id).then((response)=>{
			var filename = 'Servicio.xlsx'
			saveAs(response, filename)
		})
	}

	ctrl.downloadPerformance = function(){
		ctrl.service.downloadUrl('/api/stats/performance?download=true&institution='+ctrl._institution.id).then((response)=>{
			var filename = 'Institucion.xlsx'
			saveAs(response, filename)
		})
	}

	ctrl.downloadPerformanceAll = function(){
		ctrl.service.downloadUrl('/api/stats/performance?download=true').then((response)=>{
			var filename = 'Institucion.xlsx'
			saveAs(response, filename)
		})
	}

	ctrl.service.loadEntity('institution')
	return ctrl
});
