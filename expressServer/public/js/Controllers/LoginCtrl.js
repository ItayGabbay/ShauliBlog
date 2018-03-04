'use strict';

var shauli = angular.module('shauli');

shauli.controller('LoginCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.user = {};

    $scope.submitLogin = function() {
        $http.post("/login", $scope.user).then(function(res) {
            $window.location.href = '#/admin'
        }, function(err) {
          console.log(err);  
        });
    }
}]);