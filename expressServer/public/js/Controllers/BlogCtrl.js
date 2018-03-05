'use strict';

var shauli = angular.module('shauli');

shauli.controller('BlogController', ['$scope', '$http', function($scope, $http) {
$scope.addComment = {};

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
        console.log(error)
    });
}

$scope.getMoreDetails = function(post) {
    $scope.expandedPost = post._id;

    $http.get(`post/${post._id}`).then(function(res) {
        $scope.editedPost = res.data;
    }, function (error) {
        console.log(error)
    });
};

$scope.addPostComment = function(post) {
    $scope.addCommentToPost = post._id;
};

$scope.closeAndReset = function() {
    $scope.isDisable = false;
    $scope.editedPost = {};
}

$scope.addPost = function() {
    $scope.isDisable = false;

    $http.post("post/", $scope.editedPost)
    .then(function(res) {
        $scope.posts = res.data;
        $scope.getPosts();
    }, function (error) {
        console.log(error)
    });
};

$scope.addNewComment = function() {
    $scope.addComment.postId = $scope.addCommentToPost;

    $http({
    url:"comment/",
    method: "POST",
    data: $scope.addComment}).then(()=>{
        $scope.getPosts();
        $scope.addComment = {};
        $scope.addCommentToPost = '';
        $scope.expandedPost = '';
    });
}

$scope.getPosts();
    
}])