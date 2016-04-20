var onlineMessageCtrl = function($scope, config, storage, httpService, $state) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    /**
     * 网络会话列表
     * @param  {[type]} patientId [description]
     * @return {[type]}           [description]
     */
    server.getMessages = function(patientId) {

        var url = config.docApp + "/OnlineChats/GetDoctorChatView/";
        var data = { id: patientId };
        return httpService.get(url, data);
    }


    client.init = function() {

        var customer = storage.get(config.customerKey);
        params.patientId = customer.CustomerUserId;

        server.getMessages(params.patientId).then(function(response) {
        	$scope.messages = response.data.data;
        	console.log($scope.messages)
        })

    }



    client.init();


}
angular.module('controllers').controller('patient.onlineMessageCtrl', onlineMessageCtrl);
