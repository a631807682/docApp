var provinceCtrl = function($scope, config, storage, httpService, $stateParams, $state, tips) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    /**
     * 获取省列表
     * @return {[type]} [description]
     */
    server.getProvinces = function() {
        var url = config.docApp + "/Hospitals/Getprovince/";
        return httpService.get(url, {});
    }

    /*
    	选择省份
     */
    client.checkProvince = function(province) {

        params.customer.Province = province.ProName;

        var name = 'doc.profile-city';
        var data = {
            customer: params.customer
        };

        $state.go(name, data);
    }

    client.init = function() {

        params.customer = $stateParams.customer;
        console.log(params.customer)
        server.getProvinces().then(function(response) {
            $scope.provinces = response.data.data;

        })
    }

    client.init();

}


angular.module('controllers').controller('doc.profile.provinceCtrl', provinceCtrl);
