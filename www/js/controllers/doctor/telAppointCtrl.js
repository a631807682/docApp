var telAppointCtrl = function($scope, config, storage, httpService, $state, tips) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    /**
     * 获取电话预约
     * @param  {[type]} userId [description]
     * @return {[type]}        [description]
     */
    server.getTelAppoints = function(userId) {
        var data = { "id": userId };
        var url = config.docApp + "/TelAppointments/GetTelViewByUserId/";
        return httpService.get(url, data);
    }




    client.show = function(type) {
        $scope.type = type;

        var allTels = $scope.allTels;
        var showTels = [];

        angular.forEach(allTels, function(e, i) {
            if (e.TelAppointment.TelState == type) {
                showTels.push(e);
            }
        });
        $scope.showTels = showTels;
       
    }


    client.init = function() {
        var customer = storage.get(config.customerKey);
        params.userId = customer.CustomerUserId;

        server.getTelAppoints(params.userId).then(function(response) {
            $scope.allTels = response.data.data;
            console.log($scope.allTels )
            client.show('申请');
        });
    }



    client.init();

}
angular.module('controllers').controller('doc.telAppointCtrl', telAppointCtrl);