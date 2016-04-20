var memberCtrl = function($scope,$rootScope, config, storage, httpService, $state, $ionicPopup, $stateParams) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    $scope.imgPath = config.imgPath;

    /**
     * 获取病人信息
     * @param  {[type]} patientId [description]
     * @return {[type]}           [description]
     */
    server.getPatient = function(patientId) {
        var url = config.docApp + "/Patients/GetPatient/";

        var data = { id: patientId };
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

    /*
        跳转
     */
    client.ifRedirect = function(redirectTo, redirectParams) {
        var sources = [];
        sources.push('patient.index');
        console.log(redirectTo, redirectParams)

        if (angular.isDefined(redirectTo)) {
            if (angular.isDefined($rootScope.fromState.name)) { //访问源

                angular.forEach(sources, function(e, i) {
                    if (e == $rootScope.fromState.name) {
                        $state.go(redirectTo, redirectParams);
                    }
                });
            }
        }

    }


    client.init = function() {

        client.ifRedirect($stateParams.redirectTo, $stateParams.redirectParams);

        var customer = storage.get(config.customerKey);
        params.patientId = customer.CustomerUserId;

        server.getPatient(params.patientId).then(function(response) {
            $scope.patient = response.data.data;
            console.log($scope.patient)
        })
    }





    client.init();
}
angular.module('controllers').controller('patient.memberCtrl', memberCtrl);
