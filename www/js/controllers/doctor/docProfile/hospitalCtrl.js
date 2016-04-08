var hospitalCtrl = function($scope, config, storage, httpService, $stateParams, tips, $state) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    /**
     * 更新医生信息
     * @param  {[type]} doctor [description]
     * @return {[type]}        [description]
     */
    server.updateDoctor = function(doctor) {
        var url = config.docApp + "/Doctors/PutDoctor/" + doctor.DoctorId;
        return httpService.post(url, doctor);
    }

    /**
     * 获取医院信息
     * @return {[type]} [description]
     */
    server.getHospitals = function() {

        var url = config.docApp + "/Hospitals/GetHospitals";
        return httpService.get(url, {});

    }

    client.save = function() {

        server.updateDoctor(params.doctor).then(function(response) {
            $state.go('doc.docProfile', {});
        })
    }


    client.init = function() {

        params.doctor = $stateParams.doctor;

        server.getHospitals().then(function(response) {
            $scope.hospitals = response.data.data;
  
        });
    }

    client.init();



}
angular.module('controllers').controller('doc.docProfile.hospitalCtrl', hospitalCtrl);
