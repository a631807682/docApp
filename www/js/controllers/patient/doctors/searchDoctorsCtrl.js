var searchDoctorsCtrl = function($scope, config, storage, httpService, $stateParams, $state, $ionicHistory) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    $scope.imgPath = config.imgPath;

    /**
     * 获取医院医生
     * @return {[type]} [description]
     */
    server.getDoctorsByHospital = function(hospitalId) {
        var url = config.docApp + "/Doctors/GetDocByhospital/";
        var data = { id: hospitalId };
        return httpService.get(url, data);
    }

    /**
     * 获取疾病医生
     * @param  {[type]} diseaseId [description]
     * @return {[type]}           [description]
     */
    server.getDoctorsByDisease = function(diseaseId) {
        var url = config.docApp + "/Doctors/GetDocByDisease/";
        var data = { id: diseaseId };
        return httpService.get(url, data);
    }


    client.search = function(type) {

        switch (type) {
            case '医院':
                server.getDoctorsByHospital($scope.hospitalId).then(function(response) {
                    $scope.doctors = response.data.data;
                    console.log($scope.doctors)
                })
                break;
            case '疾病':
                server.getDoctorsByDisease($scope.diseaseId).then(function(response) {
                    $scope.doctors = response.data.data;
                    console.log($scope.doctors)
                })
                break;
            case '名称':
                break;
        }

    }


    client.init = function() {

        $scope.hospitalId = $stateParams.hospitalId;
        $scope.diseaseId = $stateParams.diseaseId;
        $scope.name = $stateParams.name;

        if ($scope.hospitalId != '') {
            client.search('医院');
        } else if ($scope.diseaseId != '') {
            client.search('疾病');
        } else if ($scope.name != '') {
            client.search('名称');
        }
    }


    client.init();

}



angular.module('controllers').controller('patient.doctors.searchDoctorsCtrl', searchDoctorsCtrl);
