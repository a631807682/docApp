var nameCtrl = function($scope, config, storage, httpService, $stateParams, tips, $state) {


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
            $state.go('doc.profile', {});

        });
    }

    client.init = function() {

        console.info('init', $stateParams.customer);
        params.customer = $stateParams.customer;
    }

    client.init();

}
angular.module('controllers').controller('doc.profile.nameCtrl', nameCtrl);