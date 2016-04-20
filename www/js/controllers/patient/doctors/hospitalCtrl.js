var hospitalCtrl = function($scope, config, storage, httpService, $stateParams, $state, tips) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    /**
     * 获取医院
     * @param  {[type]} city [description]
     * @return {[type]}      [description]
     */
    server.getHospitals = function(city) {
        var url = config.docApp + "/Hospitals/GethospitalByCity/";
        var data = { city: city };

        return httpService.get(url, data);
    }


    client.checkHospital = function(hospital) {

        var name = 'patient.doctors-searchDoctors';
        var data = {
            hospitalId: hospital.HospitalId
        };

        $state.go(name, data);
    }


    client.init = function() {


        $scope.cityName = $stateParams.cityName;
        server.getHospitals($scope.cityName).then(function(response) {
            $scope.hospitals = response.data.data;
            console.log(response.data.data)
        })

    }

    client.init();

}


angular.module('controllers').controller('patient.doctors.hospitalCtrl', hospitalCtrl);
