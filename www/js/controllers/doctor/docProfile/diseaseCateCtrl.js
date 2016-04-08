var diseaseCateCtrl = function($scope, config, storage, httpService, $stateParams, tips, $state) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    /**
     * 获取所有科室
     * @return {[type]} [description]
     */
    server.getDiseaseCate = function() {
        var url = config.docApp + "/DiseaseCategories/GetDiseaseCategorys";
        return httpService.get(url, {});
    }

    /**
     * 更新医生信息
     * @param  {[type]} doctor [description]
     * @return {[type]}        [description]
     */
    server.updateDoctor = function(doctor) {
        var url = config.docApp + "/Doctors/PutDoctor/" + doctor.DoctorId;
        return httpService.post(url, doctor);
    }


    client.save = function() {

        server.updateDoctor(params.doctor).then(function(response) {
            $state.go('doc.docProfile', {});
        })
    }


    client.init = function() {

        params.doctor = $stateParams.doctor;

        server.getDiseaseCate().then(function(response) {
            $scope.diseaseCates = response.data.data;

        });

    }

    client.init();



}
angular.module('controllers').controller('doc.docProfile.diseaseCateCtrl', diseaseCateCtrl);
