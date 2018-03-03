'use strict';

var shauli = angular.module('shauli', ['ngRoute']);

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
            controller: 'BlogCtrl'
        })
        .when('/admin', {
            templateUrl: 'views/admin.html', 
            controller: 'AdminCtrl'
        })
        
    $locationProvider
        .html5Mode(false)
        .hashPrefix('');
});

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

shauli.controller('PaintCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    
    $timeout(function() {
        var canvas = $('#canvasInAPerfectWorld');
        var context = canvas[0].getContext("2d");
        var clickX = new Array();
        var clickY = new Array();
        var clickDrag = new Array();
        var paint;
        var colorPurple = "#cb3594";
        var colorGreen = "#659b41";
        var colorYellow = "#ffcf33";
        var colorRed = "#df4b26";
        var colorGray = "#f0f0f0";
        var curTool = "no";
        var curColor = colorPurple;
        var clickColor = new Array();
        var canvasImage;

        context.fillStyle = colorGray;
        context.fillRect(20, 20, canvas[0].width, canvas[0].height);
        canvas.mousedown(function (event) {
            var mouseX = event.pageX - this.offsetLeft;
            var mouseY = event.pageY - this.offsetTop;

            paint = true;
            addClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, false, clickX, clickY, clickDrag, clickColor, curTool, curColor, colorGray);
            redraw(clickX, clickY, clickDrag, clickColor, context);
        });
        canvas.mousemove(function (event) {
            if (paint) {
                addClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, true, clickX, clickY, clickDrag, clickColor, curTool, curColor, colorGray);
                redraw(clickX, clickY, clickDrag, clickColor, context);
            }
        });
        canvas.mouseup(function (event) {
            paint = false;
        });
        canvas.mouseleave(function (event) {
            paint = false;
        });

        $('#choosePurple').mousedown (function (event) {
            curColor = colorPurple;
            curTool = "no";
        });
        $('#chooseGreen').mousedown(function (event) {
            curColor = colorGreen;
            curTool = "no";
        });
        $('#chooseYellow').mousedown(function (event) {
            curColor = colorYellow;
            curTool = "no";
        });
        $('#chooseRed').mousedown(function (event) {
            curColor = colorRed;
            curTool = "no";
        });
        $('#Eraser').mousedown(function (event) {
            curTool = "eraser";
        });
    })
    

    function addClick(x, y, dragging, clickX, clickY, clickDrag, clickColor, curTool, curColor, colorGray) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
        if (curTool == "eraser") {
            clickColor.push(colorGray);
        } else {
            clickColor.push(curColor);
        }
    }
    $scope.download = function() {
        var image = canvas[0].toDataURL("image/png");
        var download = $('<a/>')[0];
        download.href = image;
        download.download = 'image.png';
        download.click();
        // delete download;
        // delete image;
    }
    function redraw(clickX, clickY, clickDrag, clickColor, context) {
        
        context.lineJoin = "round";
        context.lineWidth = 5;

        for (var i = 0; i < clickX.length; i++) {
            context.beginPath();
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.strokeStyle = clickColor[i];
            context.stroke();
        }
    }
}])