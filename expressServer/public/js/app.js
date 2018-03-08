'use strict';

var shauli = angular.module('shauli', ['ngRoute', 'adminModule','ngMap','fansClubModule','ngAnimate']);


shauli.config(function ($routeProvider, $locationProvider) {
$routeProvider
        .when('/', {
            templateUrl: 'views/blog.html',
            controller: 'BlogController'
        })
        .when('/paint', {
            templateUrl: 'views/paint.html',
            controller: 'PaintCtrl'
        })
        .when('/facebook', {
            templateUrl: 'views/fb.html',
            controller: 'FBController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .when('/blog', {
            templateUrl: 'views/blog.html',
            controller: 'BlogController'
        })
        .when('/admin', {
            templateUrl: 'views/admin.html', 
            controller: 'AdminCtrl'
        })
        .when('/fanclub', {
            templateUrl: 'views/fans.html', 
            controller: 'FansClubController'
        })
        .when('/videos', {
            templateUrl: 'views/video.html', 
        })
        .when('/map', {
            templateUrl: 'views/fanMap.html', 
            controller: 'FanMapController'
        })
    $locationProvider
        .html5Mode(false)
        .hashPrefix('');
});