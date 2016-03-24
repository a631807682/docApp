var visitStopCtrl = function($scope, config, storage, httpService) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};


    /**
     * 获取医生信息
     * @param  {[type]} doctorId [description]
     * @return {[type]}          [description]
     */
    server.getDoctorInfo = function(doctorId) {

        var url = config.docApp + "/Doctors/GetDoctorAndSheduingByDoctorId";
        var data = { doctorId: doctorId };
        return httpService.get(url, data);
    }



    client.init = function() {

        var customer = storage.get(config.customerKey);
        params.doctorId = customer.CustomerUserId;

        server.getDoctorInfo(params.doctorId).then(function(response) {
            var data = response.data.data;

            params.scheduing = data.ScheudingView;

        });
    }



    client.init();

}
angular.module('controllers').controller('doc.visitStopCtrl', visitStopCtrl);
