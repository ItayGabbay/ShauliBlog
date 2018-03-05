'use strict';

var shauli = angular.module('shauli');

shauli.controller('FanclubController', ['$scope', '$http', function($scope, $http) {

$scope.searchFans = function() {
    $http({
        url:"fans/",
        method: "GET",
        params: {
            "firstName": $scope.fanFirstName,
            "lastName" : $scope.fanLastName,
            "birthday" : $scope.fanBirthday,
            "gender": $scope.fanGender,
            "address" : $scope.fanAddress
        } 
    }).then(function(res) {
        $scope.fans = res.data;
    }, function (error) {
        console.log(error)
    });
}

$scope.getFans = function() {
    $http({
        url:"fans/",
        method: "GET"
    }).then(function(res) {
        console.log('get fansss', res);
        $scope.fans = res.data;
    }, function (error) {
        console.log(error)
    });
}

$scope.fanGender = "male";
$scope.getFans();
    
}])