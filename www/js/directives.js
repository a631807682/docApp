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
})

.directive('focusMe', function($timeout) {
    return {
        link: function(scope, element, attrs) {
            scope.$watch(attrs.focusMe, function(value) {

                if (value === true) {

                    $timeout(function() {
                    element[0].focus();
                    element[0].click();
   
                    });
                }
            });
        }
    };
});
