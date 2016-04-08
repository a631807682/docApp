var docProfileCtrl = function($scope, config, storage, httpService, $state, $location, $ionicActionSheet) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    /**
     * 获取医生信息
     * @param  {[type]} userId [description]
     * @return {[type]}        [description]
     */
    server.getDoctor = function(userId) {
        var url = config.docApp + "/Doctors/GetDoctor/";
        var data = { id: userId };
        return httpService.get(url, data);
    }

    /*
    	定向修改页
     */
    client.go = function(name) {
        var params = {
            doctor: $scope.doctor
        };

        $state.go(name, params);

    }



    client.init = function() {
        var customer = storage.get(config.customerKey);
        params.userId = customer.CustomerUserId;

        server.getDoctor(params.userId).then(function(response) {

            $scope.doctor = response.data.data;
            console.log($scope.doctor);
        })
    }

    client.init();


}
angular.module('controllers').controller('doc.docProfileCtrl', docProfileCtrl);
