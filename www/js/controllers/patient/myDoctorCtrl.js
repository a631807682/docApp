var myDoctorCtrl = function($scope, config, storage, httpService, $state) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    $scope.imgPath = config.imgPath;

    /**
     * 获取我的医生
     * @param {[type]} patientId [description]
     */
    server.GetMyDoctors = function(patientId) {
        var data = { "id": patientId };
        var url = config.docApp + "/PatientToDoctors/GetByPatientId/";
        return httpService.get(url, data);
    }


    client.goDetail = function(doctorId) {
        var params = {
            redirectTo: 'patient.doctorDetail',
            redirectParams: {
                doctorId: doctorId
            }
        }

        $state.go('patient.doctors', params);
    }


    client.init = function() {

        var customer = storage.get(config.customerKey);
        params.patientId = customer.CustomerUserId;

        server.GetMyDoctors(params.patientId).then(function(response) {
            $scope.myDoctors = response.data.data;
            console.log($scope.myDoctors)
        })

    }



    client.init();





}
angular.module('controllers').controller('patient.myDoctorCtrl', myDoctorCtrl);
