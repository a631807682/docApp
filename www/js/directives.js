angular.module('directives', [])

.directive('hideTabs', function($rootScope, $ionicTabsDelegate) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.$on('$ionicView.beforeEnter', function() {
                scope.$watch(attributes.hideTabs, function(value) {
                    $ionicTabsDelegate.showBar(false);
                });
            });

            scope.$on('$ionicView.beforeLeave', function() {
                $ionicTabsDelegate.showBar(true);
            });
        }
    };
});
