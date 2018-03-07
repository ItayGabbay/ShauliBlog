'use strict';

var shauli = angular.module('shauli');

/**
 * This Service is responsible for making the requests of the blog module.
 */
'use strict';

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
        /** Add a view to a specific post for statistics */
        addViewCounterToPost: function(postId) {
             return $http.get(`post/${postId}`);
        },
        addPost: function(newPost) {
            return $http.post("post/", newPost);
        },
        addNewComment: function(newComment) {
            return $http.post('comment/', newComment);
        },
        /** returns most viewed posts */
        getTopPosts: function() {
            return $http.get('/post/GetTopPosts');
        }
    }
}]);