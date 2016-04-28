var diseaseCtrl = function($scope, config, storage, httpService, $stateParams, $state, tips) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    /**
     * 获取疾病
     * @return {[type]} [description]
     */
    server.getDisease = function(diseaseClassId) {
        var url = config.docApp + "/Diseases/GetDiseaseByClass/";
        var data = {
            id: diseaseClassId
        };
        return httpService.get(url, data);
    }

    /*
        选择科分类
     */
    client.checkDisease = function(disease) {

        var name = 'patient.doctors-searchDoctors';
        var data = {
            diseaseId: disease.DiseaseId
        };

        $state.go(name, data);
    }

    client.init = function() {

        $scope.diseaseClassId = $stateParams.diseaseClassId;

        server.getDisease($scope.diseaseClassId).then(function(response) {
            $scope.diseases = response.data.data;
            console.log($scope.diseases);
        })
    }

    client.init();

}


angular.module('controllers').controller('patient.doctors.diseaseCtrl', diseaseCtrl);
