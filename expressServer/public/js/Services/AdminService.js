/**
 * This Service is responsible for making the requests of the admin module.
 */
'use strict';

var adminModule = angular.module('adminModule');

adminModule.service('adminApiService', ['$http', function ($http) {
   return {
       getPostsCountByWriter: function() {
           return $http.get("post/getPostsCountByWriter");
       },
       /** Returns the posts title and their views */
       getPostStats: function() {
           return $http.get("/post/getPostStats");
       },
       getAllPosts: function() {
           return $http.get("admin/");
       },
       savePost: function(post) {
           return $http.put("post/" + post._id, post);
       },
       login: function(user) {
           return $http.post("/login", user);
       }
   } 
}])