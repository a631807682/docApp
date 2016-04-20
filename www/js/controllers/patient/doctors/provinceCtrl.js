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

        var name = 'patient.doctors-city';
        var data = {
            proName: province.ProName
        };

        $state.go(name, data);
    }

    client.init = function() {

        server.getProvinces().then(function(response) {
            $scope.provinces = response.data.data;
            console.log($scope.provinces);
        })
    }

    client.init();

}


angular.module('controllers').controller('patient.doctors.provinceCtrl', provinceCtrl);
