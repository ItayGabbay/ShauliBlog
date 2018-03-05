'use strict';

var fansClubModule = angular.module('fansClubModule', []);

fansClubModule.controller('FanclubController', ['$scope', '$http', function($scope, $http) {

    $scope.searchFans = function() {
        let queryParams = {};
        // Setting only wanted filters
        $scope.fanFirstName && (queryParams.firstName = $scope.fanFirstName);
        $scope.fanLastName && (queryParams.lastName = $scope.fanLastName);
        $scope.fanBirthday && (queryParams.birthday = $scope.fanBirthday);
        $scope.fanGender && $scope.fanGender !== "all" && (queryParams.gender = $scope.fanGender);
        $scope.fanAddress && (queryParams.address = $scope.fanAddress);
        
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

    $scope.clearFilter = function() {
        Object.assign($scope, {
            fanFirstName: "",
            fanLastName: "",
            fanBirthday: null,
            fanGender: "all",
            fanAddress: ""
        });

        $scope.getFans();
    }

    $scope.fanGender = "all";
    $scope.getFans();
    
}])