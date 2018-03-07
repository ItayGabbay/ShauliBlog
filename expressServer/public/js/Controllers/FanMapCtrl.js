'use strict';

var fansClubModule = angular.module('fansClubModule');

fansClubModule.controller('FanMapController', ['$scope', '$http', 'NgMap', function($scope, $http, NgMap) {
    $scope.drawSingleMarker = function(fan, result, geocoderStatus) {

        if (geocoderStatus === google.maps.GeocoderStatus.OK) {

            var parsedResult = {
                pos: [result[0].geometry.location.lat(), result[0].geometry.location.lng()],
                title: result[0].formatted_address,
                fan: fan
            };

            $scope.fans.push(parsedResult);

            $scope.$apply();
        }
    }

    $scope.callbackTester = function(callback) {
        callback.apply(arguments);
        callback();
    }
    // Draw all the fans on the map
    $scope.drawFansOnMap = function() {
        $http({
            url: "fans/",
            method: "GET"
        }).then(function(res) {


            // Check if there is atleast 1 fan to draw on the map
            if (res.data.length > 0) {
                NgMap.getMap().then(function(map) {
                        var geocoder = new google.maps.Geocoder();


                        // Go through all fans and geocode their address, afterwards on the cb add them to the marker
                        for (var i = res.data.length - 1; i >= 0; i--) {

                            // Geocode the fans address
                            geocoder.geocode({ address: res.data[i].address }, $scope.drawSingleMarker.bind(this,res.data[i]));

                        }
                    },
                    function(error) {
                        console.log(res)
                    });

            }
        });

    }

    $scope.pageClass = "page-fanmap";

    $scope.fans = [];
    $scope.fanGender = "male";
    $scope.drawFansOnMap();
}])