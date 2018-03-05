'use strict';

var adminModule = angular.module('adminModule');

adminModule.controller('LoginCtrl', ['$scope', 'adminApiService', '$window', 
function($scope, adminApiService, $window) {
    $scope.user = {};

    $scope.submitLogin = function() {
        adminApiService.login($scope.user).then(function(res) {
            $window.location.href = '#/admin'
        }, function(err) {
          console.log(err);  
        });
    }
}]);