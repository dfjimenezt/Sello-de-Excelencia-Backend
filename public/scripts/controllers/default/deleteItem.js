angular.module('dmt-back').controller('deleteItemController', function ($mdDialog,$scope, items, entity, $q, $http) {
  var ctrl = this;
	ctrl.currentEntity = entity;
	ctrl.cancel = $mdDialog.cancel;
  
  function removeItems(item, index) {
    var base = ctrl.currentEntity.endpoint;
    var fields = [];
    ctrl.currentEntity.fields.forEach((field)=>{
      if(field.key === "true" || field.key === true){
        fields.push(field.name + "=" + item[field.name]);
      }
    })
    var query = "?" + fields.join("&");
    var promise = $http.delete(base + ctrl.currentEntity.table + query);
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
  
  this.deleteItems = function() {
    $q.all(items.forEach(removeItems)).then(onComplete).catch(error);
  }
});