angular.module('dmt-back').controller('addItemController', function ($mdDialog, page, $http) {
	var ctrl = this;
	ctrl.data = {};
	ctrl.options = {};
	ctrl.filters = {};
	ctrl.currentPage = page;
	function addFilters(item,index){
        var base = item.endpoint;
		if(!base){
			base = page.endpoint;
		} 
		$http.get(base+item.table).then(function(results){
			$scope.filters[item.name]={
                fields: item.fields,
                filter_key: item.filter_key,
                filter_name: item.filter_name,
                data: results.data
            };
		});
  }
	function addOptions(item, index) {
		var base = item.endpoint;
		if (!base) {
			base = ctrl.currentPage.endpoint;
		}
		$http.get(base + item.table).then(function (results) {
			ctrl.options[item.name] = results.data;
		});
	}
	var opts = [];
	for (var i in this.currentPage.fields) {
		var f = this.currentPage.fields[i];
		if (f.type === 'link') {
			opts.push(f);
		}
	}
	opts.forEach(addOptions);
	page.filters.forEach(addFilters);

	this.cancel = $mdDialog.cancel;

	function error(err) {
		window.location.href = "/login";
	}
	function success() {
		$mdDialog.hide();
	}
	this.addItem = function () {
		ctrl.form.$setSubmitted();
		if (ctrl.form.$valid) {
			var base = ctrl.currentPage.endpoint;
			if(data.timestamp){
				delete data.timestamp;
			}
			/*var fd = new FormData();
			for(let i in ctrl.data){
				fd.append(i,ctrl.data[i]);
			}*/
			
			$http.post(base + ctrl.currentPage.table, ctrl.data).then(success).catch(error);
		}
	};
});
