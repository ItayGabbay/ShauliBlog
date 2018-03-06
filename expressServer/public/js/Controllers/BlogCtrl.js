'use strict';

var shauli = angular.module('shauli');

shauli.controller('BlogController', ['$scope', 'blogApiService', function($scope, blogApiService) {
$scope.addComment = {};

$scope.getPosts = function() {
    blogApiService.getPosts($scope).then(function(res) {
        $scope.posts = res.data;
    }, function (error) {
        console.log(error)
    });
}

$scope.getMoreDetails = function(post) {
    $scope.expandedPost = post._id;

   blogApiService.addViewCounterToPost(post._id).then(undefined, function (error) {
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

    blogApiService.addPost($scope.editedPost)
    .then(function(res) {
        $scope.posts = res.data;
        $scope.getPosts();
    }, function (error) {
        console.log(error)
    });
};

$scope.addNewComment = function() {
    $scope.addComment.postId = $scope.addCommentToPost;
    blogApiService.addNewComment($scope.addComment).then(()=>{
        $scope.getPosts();
        $scope.addComment = {};
        $scope.addCommentToPost = '';
        $scope.expandedPost = '';
    });
}

$scope.getPosts();
    
}])