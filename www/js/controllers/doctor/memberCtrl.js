var memberCtrl = function($scope, $rootScope, config, storage, $state, $stateParams, httpService, $ionicPopup, $ionicHistory) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    $scope.imgPath = config.imgPath;

    /**
     * 获取医生详情
     * @param  {[type]} doctorId [description]
     * @return {[type]}          [description]
     */
    server.getDoctor = function(doctorId) {
        var url = config.docApp + '/Doctors/GetDoctor/';
        var data = { id: doctorId };
        return httpService.get(url, data);

    }

    /**
     * 获取病人数量
     * @param  {[type]} doctorId [description]
     * @return {[type]}          [description]
     */
    server.getPatientCount = function(doctorId) {
        var url = config.docApp + "/Patients/GetpatientCountByDocId/";
        var data = { id: doctorId };
        return httpService.get(url, data);

    }

    /**
     * 登出
     * @return {[type]} [description]
     */
    server.logout = function() {
        var url = config.accountApp + "/Account/Logout/";
        return httpService.get(url, {});
    }

    /*
        跳转
     */
    client.ifRedirect = function(redirectTo) {
        if (angular.isDefined(redirectTo)) {
            if (angular.isDefined($rootScope.fromState.name) && ($rootScope.fromState.name == 'doc.index' || $rootScope.fromState.name == 'doc.profile-city')) {

                $state.go(redirectTo);
            }
        }
    }

    /*
        登出
     */
    client.logout = function() {

        var myPopup = $ionicPopup.show({
            subTitle: '确认登出账号',
            scope: $scope,
            buttons: [{
                text: '取消'
            }, {
                text: '确定',
                type: 'button-positive',
                onTap: function(e) {
                    server.logout();
                    storage.remove(config.customerKey);
                    $state.go('login');

                }
            }]
        });

    }


    client.init = function() {
        console.log('init');

        client.ifRedirect($stateParams.redirectTo);

        var customer = storage.get(config.customerKey);
        params.doctorId = customer.CustomerUserId;
        //医生信息
        server.getDoctor(params.doctorId).then(function(response) {

            $scope.doctor = response.data.data;

        });
        //患者数量
        server.getPatientCount(params.doctorId).then(function(response) {
            $scope.patientCount = response.data.data;
        })
    }



    client.init();

}
angular.module('controllers').controller('doc.memberCtrl', memberCtrl);
