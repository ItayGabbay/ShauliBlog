'use strict';

var fansClubModule = angular.module('fansClubModule', []);

fansClubModule.controller('FansClubController', ['$scope', '$http', 'fansClubService',  
function($scope, $http, fansClubService) {

    $scope.searchFans = function() {
        // Checking if birthday value exists 
        if ($scope.fanBirthday) {

            // Dumping time from date so it will be filterred by date only
            $scope.fanBirthday = new Date($scope.fanBirthday);
            $scope.fanBirthday.setHours(0,0,0,0);
        }

        // Executing search request using service
        fansClubService.searchFans($scope.fanFirstName, 
                                   $scope.fanLastName,
                                   $scope.fanBirthday,
                                   $scope.fanGender,
                                   $scope.fanAddress)
        .then(function(res) {
            // Setting data
            $scope.fans = res.data;
        }, function (error) {
            console.log(error)
        });
    }

    $scope.getFans = function() {
        // Executing request using service
        fansClubService.getFans()
        .then(function(res) {
            console.log('get fansss', res);
            $scope.fans = res.data;
        }, function (error) {
            console.log(error)
        });
    }

    // This function is used to clear all data from fields of search
    $scope.clearFilter = function() {
        // Setting all relevant scope variables to be empty
        Object.assign($scope, {
            fanFirstName: "",
            fanLastName: "",
            fanBirthday: null,
            fanGender: "all",
            fanAddress: "",
            createFanErrors: []
        });

        // getting fans with no filters.
        $scope.getFans();
    }

    $scope.createFan = function() {
        // validating that all mandatory foelds exist.
        // if not - adding error to error array that will be displayed
        $scope.createFanErrors = [];
        if (!$scope.fanFirstName) {
            $scope.createFanErrors.push("First name is mandatory");
        }

        if (!$scope.fanLastName) {
            $scope.createFanErrors.push("Last name is mandatory");
        }

        if (!$scope.fanGender || $scope.fanGender === "all") {
            $scope.createFanErrors.push("Gender must be male or female, sorry");
        }

        if ($scope.fanBirthday) {
            $scope.fanBirthday = new Date($scope.fanBirthday);
            $scope.fanBirthday.setHours(0,0,0,0);
        }

        // Checkning that there were no errors
        if ($scope.createFanErrors.length === 0) {
            // Creating fan using service
            fansClubService.createFan({
                firstName: $scope.fanFirstName,
                lastName: $scope.fanLastName,
                dateOfBirth: $scope.fanBirthday,
                gender: $scope.fanGender,
                address: $scope.fanAddress
            }).then(function(data) {
                // after creation clearing fans
                $scope.clearFilter();
            })
        }
    }

    // View uses this function to display date in proper way
    $scope.toPrettyDate = function(date) {
        return new Date(date).toLocaleDateString();
    }

    // Initilizing data
    $scope.fanGender = "all";
    $scope.getFans();
    
}])