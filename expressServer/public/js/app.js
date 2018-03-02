'use strict';

var shauli = angular.module('shauli', ['ngRoute']);

shauli.config(function ($routeProvider, $locationProvider) {
$routeProvider
        .when('/', {
            templateUrl: 'views/blog.html',
            controller: 'BlogCtrl'
        })
        // .otherwise({
        //     templateUrl:'views/blog.html'
        //     //controller: 'BlogCtrl'
        // })

    $locationProvider
        .html5Mode(false)
        .hashPrefix('');
});

shauli.controller('BlogCtrl', ['$scope', '$http', function($scope, $http) {
    //Init of the blog controller, we get all the posts
    $scope.posts = [];
    $http.get("post/").then(function(res) {
        $scope.posts = res.data;
    }, function(err) {
        console.log(err);
    })
}])