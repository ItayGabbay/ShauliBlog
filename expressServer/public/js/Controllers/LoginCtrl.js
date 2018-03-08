'use strict';

var adminModule = angular.module('adminModule');

adminModule.controller('LoginCtrl', ['$scope', 'adminApiService', '$window', 
function($scope, adminApiService, $window) {
    $scope.user = {};

    $scope.submitLogin = function() {
        adminApiService.login($scope.user).then(function(res) {
            // IF the login was succeded - redirect to the admin page.
            $window.location.href = '#/admin'
        }, function(err) {
          console.log(err);  
        });
    }
}]);