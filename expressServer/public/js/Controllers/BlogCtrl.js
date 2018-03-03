'use strict';

var shauli = angular.module('shauli');

shauli.controller('BlogController', ['$scope', '$http', function($scope, $http) {

$scope.getPosts = function() {
    $http({
        url:"post/",
        method: "GET",
        params: {
            "startDate": $scope.startDate,
            "endDate" : $scope.endDate,
            "postTitle" : $scope.searchedtitle,
            "postWriter": $scope.searchedwriter,
            "postWriterWebsiteURL" : $scope.searchedWebsiteUrl,
            "wordsInPost" : $scope.searchedcontent
        }  
    }).then(function(res) {
        $scope.posts = res.data;
    }, function (error) {
        console.log(res)
    });
}

$scope.getPostDetails = function(post) {
    $scope.editedPost = post;
    console.log("post", editedPost);
};

$scope.getPosts();
    
}])