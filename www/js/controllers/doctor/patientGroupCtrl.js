var patientGroupCtrl = function($scope, config, storage, httpService, $state, $stateParams) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    /**
     * 获取患者分组
     * @param  {[type]} userId [description]
     * @return {[type]}        [description]
     */
    server.getPatientGroup = function(userId) {
        var url = config.docApp + "/Patients/GetGroupAndCount/";
        var data = { "id": userId };
        return httpService.get(url, data);
    }


    client.init = function() {

        var customer = storage.get(config.customerKey);
        params.userId = customer.CustomerUserId;

        server.getPatientGroup(params.userId).then(function(response) {

            params.patientGroups = response.data.data;
            console.log(params.patientGroups );

        })

    }

    client.init();


}



angular.module('controllers').controller('doc.patientGroupCtrl', patientGroupCtrl);
