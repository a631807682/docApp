var orderCtrl = function($scope, config, storage, httpService, $state) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    /**
     * 获取订单
     * @return {[type]} [description]
     */
    server.getOrders = function() {
        var url = config.docApp + "/Orders/GetMyOrders";
        return httpService.get(url, {});
    }


    client.show = function(type) {
        var orders = $scope.orders;
        var showOrders = [];

        angular.forEach(orders, function(e, i) {
            if (e.OrderState == type) {
                showOrders.push(e);
            }
        });

        $scope.showOrders = showOrders;
    }


    client.init = function() {

        var customer = storage.get(config.customerKey);
        params.patientId = customer.CustomerUserId;

        server.getOrders().then(function(response) {
            $scope.orders = response.data.data;
            client.show('待支付');
            console.log($scope.orders)
        })

    }



    client.init();




}
angular.module('controllers').controller('patient.orderCtrl', orderCtrl);
