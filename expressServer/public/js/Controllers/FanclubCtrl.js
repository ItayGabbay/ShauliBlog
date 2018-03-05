'use strict';

var shauli = angular.module('shauli');

shauli.controller('FanclubController', ['$scope', '$http', function($scope, $http) {

$scope.getFans = function() {
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
        console.log('get fansss', res);
        $scope.fans = res.data;
    }, function (error) {
        console.log(res)
    });
}

$scope.fanGender = "male";
$scope.getFans();
    
}])