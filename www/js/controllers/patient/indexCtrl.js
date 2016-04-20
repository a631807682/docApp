var indexCtrl = function($scope, config, storage, httpService, $state) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    $scope.imgPath = config.imgPath;

    /**
     * 获取网络预约
     * @param  {[type]} patientId [description]
     * @return {[type]}           [description]
     */
    server.getChats = function(patientId) {
        var url = config.docApp + "/OnlineChats/GetPatientChatView/";
        var data = { id: patientId };
        return httpService.get(url, data);
    }

    /**
     * 获取电话预约
     * @param  {[type]} patientId [description]
     * @return {[type]}           [description]
     */
    server.getTelAppoint = function(patientId) {
        var url = config.docApp + "/TelAppointments/GetTelAppointmentByUserId/";
        var data = { id: patientId };
        return httpService.get(url, data);
    }

    /*
        跳转网络会话页
     */
    client.goMessage = function(chatId) {
        var params = {
            redirectTo: 'patient.onlineChat',
            redirectParams: {
                chatId: chatId
            }
        }

        $state.go('patient.member', params);
    }

    /*
        跳转电话咨询
     */
    client.goTel = function(telId) {
        var params = {
            redirectTo: 'patient.telAppointDetail',
            redirectParams: {
                telId: telId
            }
        }

        $state.go('patient.member', params);
    }


    client.init = function() {

        var customer = storage.get(config.customerKey);
        params.patientId = customer.CustomerUserId;

        server.getChats(params.patientId).then(function(response) {
            var chats = response.data.data;
            $scope.chats = chats.slice(0, 3);
            console.log($scope.chats);
        })

        server.getTelAppoint(params.patientId).then(function(response) {
            var telAppoints = response.data.data;
            $scope.telAppoints = telAppoints.slice(0, 3);
            console.log($scope.telAppoints);
        })

    }



    client.init();


}
angular.module('controllers').controller('patient.indexCtrl', indexCtrl);
