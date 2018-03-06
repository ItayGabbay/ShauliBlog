'use strict';

var shauli = angular.module('shauli');

shauli.controller('BlogController', ['$scope', 'blogApiService', function($scope, blogApiService) {

// added comment varaible
$scope.addComment = {};

// get all posts data
$scope.getPosts = function() {
    // get posts from backend
    blogApiService.getPosts($scope).then(function(res) {
        $scope.posts = res.data;
    }, function (error) {
        console.log(error)
    });
}

// showing more details for speific post 
$scope.getMoreDetails = function(post) {
    $scope.expandedPost = post._id;

    // increasing post view count
   blogApiService.addViewCounterToPost(post._id).then(undefined, function (error) {
        console.log(error)
    });
};


$scope.openModal = function() {
    $scope.showModal({});
}

// setting post for adding comment 
$scope.addPostComment = function(post) {
    $scope.addCommentToPost = post._id;
};

$scope.closeAndReset = function() {
    // set is post input to enable
    $scope.isDisable = false;

    // clear edited post 
    $scope.editedPost = {};
}

$scope.addPost = function(post) {
    $scope.isDisable = false;

    blogApiService.addPost(post)
    .then(function(res) {
        $scope.posts = res.data;
        $scope.getPosts();
    }, function (error) {
        console.log(error)
    });
};

// add new comment 
$scope.addNewComment = function() {
    // setting added comment post id
    $scope.addComment.postId = $scope.addCommentToPost;
    blogApiService.addNewComment($scope.addComment).then(()=>{
        $scope.getPosts();
        $scope.addComment = {};
        $scope.addCommentToPost = '';
        $scope.expandedPost = '';
    });
}

// first intialize posts data
$scope.getPosts();
    
}])