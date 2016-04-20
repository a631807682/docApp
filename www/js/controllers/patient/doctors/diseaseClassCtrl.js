var diseaseClassCtrl = function($scope, config, storage, httpService, $stateParams, $state, tips) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    /**
     * 获取科分类
     * @return {[type]} [description]
     */
    server.getDiseaseClass = function() {
        var url = config.docApp + "/DiseaseClass/GetDiseaseClass/";
        return httpService.get(url, {});
    }

    /*
        选择科分类
     */
    client.checkDiseaseClass = function(diseaseClass) {

        var name = 'patient.doctors-disease';
        var data = {
            diseaseClassId: diseaseClass.DiseaseClassId
        };

        $state.go(name, data);
    }

    client.init = function() {

        server.getDiseaseClass().then(function(response) {
            $scope.diseaseClass = response.data.data;
            console.log($scope.diseaseClass);
        })
    }

    client.init();

}


angular.module('controllers').controller('patient.doctors.diseaseClassCtrl', diseaseClassCtrl);
