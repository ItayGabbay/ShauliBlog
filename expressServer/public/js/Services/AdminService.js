'use strict';

var adminModule = angular.module('adminModule');

adminModule.service('adminApiService', ['$http', function ($http) {
   return {
       getPostsCountByWriter: function() {
           return $http.get("post/getPostsCountByWriter");
       },
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