var profileCtrl = function($scope, config, storage, httpService, $state, $location) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    $scope.imgPath = config.imgPath;

    /**
     * 获取用户详情
     * @param  {[type]} doctorId [description]
     * @return {[type]}          [description]
     */
    server.getDoctor = function(userId) {
        var url = config.docApp + '/CustomerUsers/GetCustomerUser';
        var data = { id: userId };
        return httpService.get(url, data);

    }


    client.go = function(name) {
        var params = {
            customer: $scope.customer
        };

        $state.go(name, params);

    }


    client.init = function() {
        var customer = storage.get(config.customerKey);
        params.userId = customer.CustomerUserId;
        //用户详情
        server.getDoctor(params.userId).then(function(response) {

            $scope.customer = response.data.data;

        });
    }

    client.init();
}
angular.module('controllers').controller('doc.profileCtrl', profileCtrl);
