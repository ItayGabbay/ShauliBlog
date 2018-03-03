'use strict';

var shauli = angular.module('shauli');

shauli.controller('LoginCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.user = {};

    $scope.submitLogin = function() {
        $http.post("/login", $scope.user).then(function(res) {
            
        }, function(err) {
          console.log(err);  
        });
    }
}]);