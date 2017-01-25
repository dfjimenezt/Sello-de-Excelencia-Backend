angular.module('dmt-back').controller('deleteController', function ($mdDialog,$scope, items, page, $q, $http) {
  
  this.cancel = $mdDialog.cancel;
  
  function removeItems(item, index) {
    var promise = $http.delete();
    promise.then(function () {
      items.splice(index, 1);
    });
    return promise;
  }
  
  function onComplete() {
    $mdDialog.hide();
  }
	function error(err){
		window.location.href = "/login";
	}
  
  function deleteItems() {
    $q.all(items.forEach(removeItems)).then(onComplete).catch(error);
  }
});