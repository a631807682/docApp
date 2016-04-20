var ageCtrl = function($scope, config, storage, httpService, $stateParams, $state, $ionicPosition, $ionicScrollDelegate) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};


    server.save = function(customer) {

        var url = config.docApp + '/CustomerUsers/UpdateCustomer/';

        var data = customer;
        console.log(url, data);
        return httpService.post(url, data);

    }


    client.save = function() {

        server.save(params.customer).then(function(response) {
            $state.go('patient.profile');

        });
    }



    client.init = function() {

        console.info('init', $stateParams.customer);
        params.customer = $stateParams.customer;

        $scope.ages = [];
        var maxAge = 130;

        for (var i = 1; i < maxAge; i++) {
            $scope.ages.push(i);
        }

 
    }

    client.init();



}
angular.module('controllers').controller('patient.profile.ageCtrl', ageCtrl);