var cityCtrl = function($scope, config, storage, httpService, $stateParams, $state, async, tips, $ionicHistory) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};


    /**
     * 获根据省获取市列表
     * @return {[type]} [description]
     */
    server.getCitys = function(proName) {
        var url = config.docApp + "/Cities/GetCityByProName/";
        var data = { name: proName };
        return httpService.get(url, data);

    }



    /*
        选择城市
     */
    client.checkCity = function(city) {

        var name = 'patient.doctors-hospital';
        var data = {
            cityName: city.CityName
        };

        $state.go(name, data);
        
    }

    client.init = function() {

        var proName = $stateParams.proName;
        server.getCitys(proName).then(function(response) {
            $scope.citys = response.data.data;
        })


    }

    client.init();




}
angular.module('controllers').controller('patient.doctors.cityCtrl', cityCtrl);
