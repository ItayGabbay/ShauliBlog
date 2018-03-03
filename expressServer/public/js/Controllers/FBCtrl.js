'use strict';

var shauli = angular.module('shauli');

shauli.controller('FBController', ['$scope', function($scope) {
    window.fbAsyncInit = function () {
        FB.init({
            appId: '1718957321460683',
            cookie: true,
            xfbml: true,
            autoLogAppEvents: true,
            display: 'popup',
            status: true,
            version: 'v2.10'
        });

    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId=1718957321460683';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    $scope.onShareClick = function(button) {
        if (button.target.id == 'shareBtn') {
            FB.ui({
                method: 'share',
                display: 'popup',
                quote: 'Cool blog',
                href: 'https://www.youtube.com/watch?v=lRIQDhlZ7co'
            }, function (response) { });
        }
        else if (button.target.id == 'shareBtn2') {
            FB.ui({
                method: 'share',
                display: 'popup',
                quote: 'Cool blog',
                href: 'https://www.youtube.com/watch?v=A-kIm6KfTXc'
            }, function (response) { });
        }
    }
    $scope.$on('youtubeLoaded', function(event) {
        loadYTVideos($scope);
    })
    function loadYTVideos(scope) {
        if ($scope.$root.youtubeLoaded)
        {
            player = new YT.Player('player', {
            height: '100',
            width: '150',
            videoId: 'lRIQDhlZ7co',
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
            });
            player2 = new YT.Player('player2', {
                height: '100',
                width: '150',
                videoId: 'A-kIm6KfTXc',
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }
    }
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }
    function stopVideo() {
        player.stopVideo();
    }

    loadYTVideos($scope)
}]) 