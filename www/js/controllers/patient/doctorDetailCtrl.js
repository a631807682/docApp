var doctorDetailCtrl = function($scope, config, storage, httpService, $state, $stateParams, $ionicModal, tips) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};


    $scope.imgPath = config.imgPath;


    /**
     * 获取医生信息
     * @return {[type]} [description]
     */
    server.getDoctorInfo = function(doctorId) {

        var url = config.docApp + "/Doctors/GetDoctorAndSheduingByDoctorId";
        var data = { doctorId: doctorId };
        return httpService.get(url, data);
    }

    /**
     * 是否存在双方聊天室
     * @param  {[type]}  patientId [description]
     * @param  {[type]}  doctorId [description]
     * @return {Boolean}         [description]
     */
    server.getChatByPerson = function(patientId, doctorId) {

        var url = config.docApp + "/OnlineChats/GetChatByPersonInfo/";
        var data = {
            userAId: patientId,
            userBId: doctorId
        };
        return httpService.get(url, data);
    }


    /**
     * 添加网络咨询
     * @param  {[type]} onlineMessage [description]
     * @return {[type]}               [description]
     */
    server.createMessage = function(onlineMessage) {

        var url = config.docApp + "/OnlineMessages/CreateOnlineMessage";
        var data = onlineMessage;
        return httpService.post(url, data);
    }


    /**
     * 网络咨询 弱会话不存在 病历弹出层
     * @return {[type]} [description]
     */
    client.goMessage = function() {

        server.getChatByPerson($scope.patientId, $scope.doctorId).then(function(response) {
            var chat = response.data.data;
            console.log(chat)
            if (chat) {
                client.goChat(chat.OnlineChatId);
            } else {
                client.openCaseModal();
            }
        })

    }

    /**
     * 跳转电话咨询
     * @return {[type]} [description]
     */
    client.goTels = function() {
        var params = {
            redirectTo: 'patient.telAppoint'
        }

        $state.go('patient.member', params);
    }

    /*
        跳转聊天室
     */
    client.goChat = function(chatId) {

        var params = {
            redirectTo: 'patient.onlineChat',
            redirectParams: {
                chatId: chatId
            }
        }

        $state.go('patient.member', params);
    }



    /*
        打开病历模态框
     */
    client.openCaseModal = function() {
        params.diseaseCase = {
            userAId: $scope.patientId,
            userBId: $scope.doctorId
        };
        $scope.caseModal.show();
    }

    /*
        关闭病历模态框
     */
    client.closeCaseModal = function() {
        $scope.caseModal.hide();
    }

    /*
        添加病历
     */
    client.createCase = function() {
        // params.diseaseCase
        if (angular.isUndefined(params.diseaseCase.Title) || params.diseaseCase.Title == '') {
            tips.show('请填写标题');
            return;
        }

        if (angular.isUndefined(params.diseaseCase.Disease) || params.diseaseCase.Disease == '') {
            tips.show('请填写所患疾病');
            return;
        }

        if (angular.isUndefined(params.diseaseCase.Title) || params.diseaseCase.Title == '') {
            tips.show('请填写病情描述');
            return;
        }

        server.createMessage(params.diseaseCase).then(function(response) {
            client.closeCaseModal();
            var chat = response.data.data;
            client.goChat(chat.OnlineChatId);
        })
    }

    /*
        加载弹出层
     */
    client.loadModal = function() {
        /*
            病历弹出层
         */
        $ionicModal.fromTemplateUrl('case-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.caseModal = modal;

        });

        $scope.$on('$ionicView.beforeLeave', function() {
            $scope.caseModal.remove();
        });
    }


    client.init = function() {

        $scope.doctorId = $stateParams.doctorId;

        var customer = storage.get(config.customerKey);
        $scope.patientId = customer.CustomerUserId;

        client.loadModal(); //加载模态框

        server.getDoctorInfo($scope.doctorId).then(function(response) {
            var doctorInfo = response.data.data;
            $scope.doctor = doctorInfo.Doctor;
            $scope.scheuding = doctorInfo.ScheudingView;
            console.log(doctorInfo);
        })
    }

    client.init();

}
angular.module('controllers').controller('patient.doctorDetailCtrl', doctorDetailCtrl);
