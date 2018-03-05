var shauli = angular.module('shauli');

shauli.directive('postCard', function() {
    return {
        templateUrl: '/js/Directives/post-card.html',
        scope: {
            post: '=',
            buttonText: '@',
            callback: '='
        },
    }
})