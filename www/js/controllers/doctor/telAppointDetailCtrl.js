var telAppointDetailCtrl = function($scope, config, storage, httpService, $state, $stateParams, tips, regExpHelper) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    params.apply = {};


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


    /**
     * 处理预约请求
     * @param  {[type]} telAppoint [description]
     * @return {[type]}            [description]
     */
    server.updateTelAppoint = function(telId, detailTime, price) {
        var data = {
            TelAppointmentId: telId,
            DetailTime: detailTime,
            Price: price
        };
        var url = config.docApp + "/TelAppointments/BookTelAppointment/";
        return httpService.post(url, data);
    }




    client.save = function() {

        var telId = params.tel.TelAppointment.TelAppointmentId;
        var detailTime = params.tel.TelAppointment.DetailTime;
        var price = params.apply.Price;
        
        //日期验证 
        if (angular.isUndefined(detailTime) || detailTime == null) {
            tips.show('请选择日期');
            return;
        }

        //金额验证
        if (params.tel.TelAppointment.TelState == '申请') {
            if (!regExpHelper.isMoney(price)) {
                tips.show('请填写正确金额');
                return;
            }
        }

        server.updateTelAppoint(telId, detailTime, price).then(function(response) {
            $state.go('doc.telAppoint', {});

        });
    }

    client.init = function() {
        var telId = $stateParams.telId;
        server.getTelAppoint(telId).then(function(response) {
            params.tel = response.data.data;
            console.log(params.tel);
        });
    }

    client.init();

}
angular.module('controllers').controller('doc.telAppointDetailCtrl', telAppointDetailCtrl);