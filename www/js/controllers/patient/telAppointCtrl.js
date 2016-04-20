var telAppointCtrl = function($scope, config, storage, httpService, $state, $ionicModal, tips) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    /**
     * 电话预约
     * @param  {[type]} patientId [description]
     * @return {[type]}           [description]
     */
    server.getTels = function(patientId) {

        var url = config.docApp + "/TelAppointments/GetTelViewByUserId/";
        var data = { id: patientId };

        return httpService.get(url, data);
    }

    /**
     * 新增电话预约
     * @param  {[type]} diesease [description]
     * @param  {[type]} content  [description]
     * @return {[type]}          [description]
     */
    server.createTel = function(diesease, content) {

        var url = config.docApp + "/TelAppointments/PatientCreateTel/";
        var data = {
            diesease: diesease,
            content: content
        };

        return httpService.post(url, data);
    }

    /*
        添加电话预约
     */
    client.create = function() {

        if (angular.isUndefined(params.tel.diesease) || params.tel.diesease == '') {
            tips.show('请填写疾病');
            return;
        }

        if (angular.isUndefined(params.tel.content) || params.tel.content == '') {
            tips.show('请描述您的病情');
            return;
        }
        
        server.createTel(params.tel.diesease, params.tel.content).then(function(response) {
            //获取列表
            server.getTels(params.patientId).then(function(response) {

                $scope.tels = response.data.data;
                client.closeTelModal();

            });

        })
    }

    /*
        打开咨询弹出层
     */
    client.openTelModal = function() {
        params.tel = {};
        $scope.telModal.show();
    }

    /*
        关闭咨询弹出层
     */
    client.closeTelModal = function() {
        $scope.telModal.hide();
    }

    /*
        加载弹出层
     */
    client.loadModal = function() {
        /*
            咨询弹出层
         */
        $ionicModal.fromTemplateUrl('tel-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.telModal = modal;

        });

        $scope.$on('$ionicView.beforeLeave', function() {
            $scope.telModal.remove();
        });
    }



    client.init = function() {

        client.loadModal(); //加载弹出层

        var customer = storage.get(config.customerKey);
        params.patientId = customer.CustomerUserId;


        server.getTels(params.patientId).then(function(response) {

            $scope.tels = response.data.data;
            console.log($scope.tels);

        });
    }



    client.init();



}
angular.module('controllers').controller('patient.telAppointCtrl', telAppointCtrl);
