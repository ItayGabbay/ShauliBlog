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
    $scope.isDisable = true;

    $http.get(`post/${post._id}`).then(function(res) {
        console.log("postByid", res)
        $scope.editedPost = res.data;
    }, function (error) {
        console.log(res)
    });
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

$scope.getPosts();
    
}])