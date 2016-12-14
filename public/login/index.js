var app = angular.module('anpApp', ['angular-loading-bar', 'ngMaterial', 'md.data.table']);

app.config(function($httpProvider, $mdThemingProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = false;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common.Accept = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';

    $mdThemingProvider.theme('default')
        .primaryPalette('green')
        .accentPalette('orange');
});

app.controller('loginController', function($scope, $httpParamSerializerJQLike, $http) {
    $scope.user = {};

    var request = function(urlP, method, params) {
        return new Promise(function(resolve, reject) {
            var options = {
                url: urlP,
                method: method,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
            };
            if (method === "GET") { options.params = params; }
            else if (method === "POST" || method === "DELETE" || method === "PUT") {
                options.data = $httpParamSerializerJQLike(params);
            }

            $http(options)
                .success(function(data) { resolve(data); })
                .error(function(err) { reject(err); });
        });
    };

    $scope.login = function() {
        request("../auth/login", "POST", $scope.user).then(function(answer) {
            console.log(answer);
        }).catch(function(problem) {
            console.log(problem);
        });
    };

});