var tabCtrl = function($scope, $state) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};


    client.go = function(name, params) {
        $state.go(name, params);
    }



}
angular.module('controllers').controller('patient.tabCtrl', tabCtrl);
