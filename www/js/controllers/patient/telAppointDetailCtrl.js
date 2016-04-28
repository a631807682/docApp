var telAppointDetailCtrl = function($scope, config, storage, httpService, $state, $stateParams) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    /**
     * 获取预约明细
     * @param  {[type]} telId [description]
     * @return {[type]}       [description]
     */
    server.getTelAppoint = function(telId) {
        var data = { id: telId };
        var url = config.docApp + "/TelAppointments/GetTelDetailView/";
        return httpService.get(url, data);
    }

    client.goPay = function(orderId) {

        var name = 'patient.orderDetail';
        var data = {
            orderId: orderId
        };
        $state.go(name, data);
    }

    client.init = function() {
        var telId = $stateParams.telId;
        server.getTelAppoint(telId).then(function(response) {
            $scope.tel = response.data.data;
            console.log($scope.tel);
        });
    }

    client.init();



}
angular.module('controllers').controller('patient.telAppointDetailCtrl', telAppointDetailCtrl);
