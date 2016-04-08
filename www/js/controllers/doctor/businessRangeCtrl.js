var businessRangeCtrl = function($scope, config, storage, httpService, $state, $location, $ionicActionSheet) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    /**
     * 疾病分类下所有疾病
     * @param  {[type]} userId [description]
     * @return {[type]}        [description]
     */
    server.getDiseaseList = function(userId) {

        var data = { id: userId };
        var url = config.docApp + "/DoctorWithDiseases/GetDoctorWithDiseaseByDiseaseCate";
        return httpService.get(url, data);


    }

    /**
     * 医生所选疾病范围
     * @param  {[type]} userId [description]
     * @return {[type]}        [description]
     */
    server.getDocDiseases = function(userId) {
        var data = { id: userId };
        var url = config.docApp + "/DoctorWithDiseases/GetDoctorWithDiseaseByDocId";
        return httpService.get(url, data);
    }

    /**
     * 保存医生所选疾病范围
     * @param  {[type]} docDiseases [{DoctorId,DiseaseId}]
     * @return {[type]}             [description]
     */
    server.saveDocDiseases = function(docDiseases) {

        var url = config.docApp + "/DoctorWithDiseases/PostDoctorWithDiseases/";
        return httpService.post(url, docDiseases);
    }

    /*
    	保存业务范围
     */
    client.save = function() {

        var docDiseases = $scope.docDiseases;
        var diseasesModel = [];
        angular.forEach(docDiseases, function(e, i) {
        	console.log(e)
            var model = {
                DoctorId: params.userId,
                DiseaseId: e.DiseaseId
            };

            diseasesModel.push(model);
        });

        server.saveDocDiseases(diseasesModel).then(function(response) {
            $state.go('doc.member', {});
        });

    }



    client.init = function() {

        var customer = storage.get(config.customerKey);
        params.userId = customer.CustomerUserId;


        server.getDiseaseList(params.userId).then(function(response) {
            $scope.diseases = response.data.data;

            server.getDocDiseases(params.userId).then(function(response) {
                $scope.docDiseases = response.data.data;

            })

        })


    }

    client.init();


}
angular.module('controllers').controller('doc.businessRangeCtrl', businessRangeCtrl);