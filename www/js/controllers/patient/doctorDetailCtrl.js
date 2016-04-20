var doctorDetailCtrl = function($scope, config, storage, httpService, $state, $stateParams) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};


    $scope.imgPath = config.imgPath;


    /**
     * 获取医生信息
     * @return {[type]} [description]
     */
    server.getDoctorInfo = function(doctorId) {

        var url = config.docApp + "/Doctors/GetDoctorAndSheduingByDoctorId";
        var data = { doctorId: doctorId };
        return httpService.get(url, data);
    }


    client.init = function() {

        $scope.doctorId = $stateParams.doctorId;
        server.getDoctorInfo($scope.doctorId).then(function(response) {
            var doctorInfo = response.data.data;
            $scope.doctor = doctorInfo.Doctor;
            $scope.scheuding = doctorInfo.ScheudingView;
            console.log(doctorInfo );
        })
    }

    client.init();

}
angular.module('controllers').controller('patient.doctorDetailCtrl', doctorDetailCtrl);
