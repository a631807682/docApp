var consultationRightCtrl = function($scope, config, storage, httpService, $state, regExpHelper, tips) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    /**
     * 获取收费信息
     * @param  {[type]} userId [description]
     * @return {[type]}        [description]
     */
    server.getConsultationRight = function(userId) {
        var url = config.docApp + "/ConsultationRights/GetByDoctorId";
        var data = { doctorId: userId };
        return httpService.get(url, data);
    }

    /**
     * 更新收费信息
     * @param  {[type]} consultationRight [description]
     * @return {[type]}                   [description]
     */
    server.updateConsultationRight = function(consultationRight) {
        var url = config.docApp + "/ConsultationRights/UpdateMyConsultationRight";
        return httpService.post(url, consultationRight);
    }

    /*
    	保存
     */
    client.save = function() {
        if (!angular.isNumber(params.consultationRight.Time)) {
            tips.show('请填写正确的次数');
            return;
        }

        if (!regExpHelper.isMoney(params.consultationRight.Price)) {
            tips.show('请填写正确的收费金额');
            return;
        }
        server.updateConsultationRight(params.consultationRight).then(function(response) {

            $state.go('doc.member', {});

        });

    }

    client.init = function() {

        var customer = storage.get(config.customerKey);
        params.userId = customer.CustomerUserId;

        server.getConsultationRight(params.userId).then(function(response) {

            params.consultationRight = response.data.data;
            console.log(params.consultationRight);

        });
    }

    client.init();


}

angular.module('controllers').controller('doc.consultationRightCtrl', consultationRightCtrl);
