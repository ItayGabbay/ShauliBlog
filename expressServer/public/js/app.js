'use strict';

var shauli = angular.module('shauli', ['ngRoute']);

shauli.config(function ($routeProvider, $locationProvider) {
$routeProvider
        .when('/blog', {
            templateUrl: 'views/blog.html',
            // controller: 'BlogCtrl'
        })
        .otherwise({
            templateUrl:'views/index.html'
        })

    $locationProvider
        .html5Mode(false)
        .hashPrefix('');
});