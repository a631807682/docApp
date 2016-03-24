var memberCtrl = function($scope, config, storage, httpService) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    $scope.imgPath = config.imgPath;

    /**
     * 获取医生详情
     * @param  {[type]} doctorId [description]
     * @return {[type]}          [description]
     */
    server.getDoctor = function(doctorId) {
        var url = config.docApp + '/Doctors/GetDoctor/';
        var data = { id: doctorId };
        return httpService.get(url, data);

    }

    /**
     * 获取病人数量
     * @param  {[type]} doctorId [description]
     * @return {[type]}          [description]
     */
    server.getPatientCount = function(doctorId) {
        var url = config.docApp + "/Patients/GetpatientCountByDocId/";
        var data = { id: doctorId };
        return httpService.get(url, data);

    }


    client.init = function() {

        var customer = storage.get(config.customerKey);
        params.doctorId = customer.CustomerUserId;
        //医生信息
        server.getDoctor(params.doctorId).then(function(response) {

            $scope.doctor = response.data.data;

        });
        //患者数量
        server.getPatientCount(params.doctorId).then(function(response) {
            $scope.patientCount = response.data.data;
        })
    }



    client.init();

}
angular.module('controllers').controller('doc.memberCtrl', memberCtrl);
