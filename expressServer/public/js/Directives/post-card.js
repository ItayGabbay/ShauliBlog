var shauli = angular.module('shauli');

shauli.directive('postCard', function() {
    return {
        templateUrl: '/js/Directives/post-card.html',
        scope: {
            saveCallback: '=',
            openModalCallback: '='
        },
        link:  function ($scope, element, attrs) { 
            $scope.openModalCallback = function(post) {
                $scope.post = post;
                $(element).find('#myModal').modal("show");
            }
        } 
    }
})