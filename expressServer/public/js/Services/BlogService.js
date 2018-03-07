'use strict';

var shauli = angular.module('shauli');

shauli.service('blogApiService', ['$http', function ($http) {
    return {
        getPosts: function(filters) {
            return $http({
                url:"post/",
                method: "GET",
                params: {
                    "startDate": filters.startDate,
                    "endDate" : filters.endDate,
                    "postTitle" : filters.searchedtitle,
                    "postWriter": filters.searchedwriter,
                    "postWriterWebsiteURL" : filters.searchedWebsiteUrl,
                    "wordsInPost" : filters.searchedcontent
                }  
            });
        },
        addViewCounterToPost: function(postId) {
             return $http.get(`post/${postId}`);
        },
        addPost: function(newPost) {
            return $http.post("post/", newPost);
        },
        addNewComment: function(newComment) {
            return $http.post('comment/', newComment);
        },
        getTopPosts: function() {
            return $http.get('/post/GetTopPosts');
        }
    }
}]);