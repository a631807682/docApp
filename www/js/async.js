 angular.module('async', [])
 .factory('async', ['$window', function($window) {
  return $window.async; // assumes underscore has already been loaded on the page
}]);