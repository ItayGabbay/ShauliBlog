'use strict';

var fansClubModule = angular.module('fansClubModule', []);

fansClubModule.controller('FansClubController', ['$scope', '$http', 'fansClubService',
    function($scope, $http, fansClubService) {

        $scope.searchFans = function() {
            if ($scope.fanBirthday) {
                $scope.fanBirthday = new Date($scope.fanBirthday);
                $scope.fanBirthday.setHours(0, 0, 0, 0);
            }

            fansClubService.searchFans($scope.fanFirstName,
                    $scope.fanLastName,
                    $scope.fanBirthday,
                    $scope.fanGender,
                    $scope.fanAddress)
                .then(function(res) {
                    $scope.fans = res.data;
                }, function(error) {
                    console.log(error)
                });
        }

        $scope.getFans = function() {
            fansClubService.getFans()
                .then(function(res) {
                    console.log('get fansss', res);
                    $scope.fans = res.data;
                }, function(error) {
                    console.log(error)
                });
        }

        $scope.clearFilter = function() {
            Object.assign($scope, {
                fanFirstName: "",
                fanLastName: "",
                fanBirthday: null,
                fanGender: "all",
                fanAddress: "",
                createFanErrors: []
            });

            $scope.getFans();
        }

        $scope.createFan = function() {
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

            if (!$scope.fanBirthday) {
                $scope.createFanErrors.push("Date is mandatory");
            } else {
                $scope.fanBirthday = new Date($scope.fanBirthday);
                $scope.fanBirthday.setHours(0, 0, 0, 0);
            }

            if ($scope.createFanErrors.length === 0) {
                fansClubService.createFan({
                    firstName: $scope.fanFirstName,
                    lastName: $scope.fanLastName,
                    dateOfBirth: $scope.fanBirthday,
                    gender: $scope.fanGender,
                    address: $scope.fanAddress
                }).then(function(data) {
                    $scope.clearFilter();
                    $scope.getFans();
                })
            }
        }

        $scope.toPrettyDate = function(date) {
            return new Date(date).toLocaleDateString();
        }

        $scope.fanGender = "all";
        $scope.getFans();
        $scope.pageClass = "page-fan"

    }
])