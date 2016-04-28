var orderDetailCtrl = function($scope, config, storage, httpService, $state, $stateParams, $ionicHistory, tips) {



    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    /**
     * 获取订单信息
     * @param  {[type]} orderId [description]
     * @return {[type]}         [description]
     */
    server.getOrder = function(orderId) {
        var url = config.docApp + "/Orders/GetOrder";
        data = {
            id: orderId
        };
        return httpService.get(url, data);
    }


    /*
        支付
     */
    client.pay = function() {
        //未测试
        var notifyUrl = config.host + config.payApp + '/AlipayReturn/AlipaySuccess/';
        window.alipay.pay({
            tradeNo: $scope.order.Name,
            subject: $scope.order.OrderType,
            body: '咨询' + $scope.order.UserB.Name + '医生',
            price: $scope.order.Price,
            notifyUrl: notifyUrl
        }, function(successResults) {

            tips.show('支付成功');
            $ionicHistory.goBack(-1);
        }, function(errorResults) {


        });


    }



    client.init = function() {
        $scope.orderId = $stateParams.orderId;
        server.getOrder($scope.orderId).then(function(response) {
            $scope.order = response.data.data;
        })
    }

    client.init();


}


angular.module('controllers').controller('patient.orderDetailCtrl', orderDetailCtrl);
