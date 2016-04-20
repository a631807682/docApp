var doctorsCtrl = function($scope, $rootScope, config, storage, httpService, $state, $stateParams) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};


    $scope.imgPath = config.imgPath;


    /**
     * 获取推荐医生
     * @return {[type]} [description]
     */
    server.getTopDoctors = function() {
        var url = config.docApp + "/Doctors/GetDcotorByTop/";

        return httpService.get(url, {});
    }


    /*
        跳转
     */
    client.ifRedirect = function(redirectTo, redirectParams) {
        var sources = [];
        sources.push('patient.myDoctor');

        if (angular.isDefined(redirectTo)) {
            if (angular.isDefined($rootScope.fromState.name)) { //访问源

                angular.forEach(sources, function(e, i) {
                    if (e == $rootScope.fromState.name) {
                        $state.go(redirectTo, redirectParams);
                    }
                });
            }
        }

    }


    client.init = function() {


        client.ifRedirect($stateParams.redirectTo, $stateParams.redirectParams);

        server.getTopDoctors().then(function(response) {
            $scope.tops = response.data.data;
            console.log($scope.tops);
        });
    }

    client.init();

}
angular.module('controllers').controller('patient.doctorsCtrl', doctorsCtrl);
