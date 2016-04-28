var searchCtrl = function($scope, config, storage, httpService, $stateParams, $state, tips, $ionicHistory) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    /*
    	返回
     */
    client.goBack = function() {

        $state.go('patient.doctors');
    }

    /*
    	查找
     */
    client.goSearch = function(searchName) {

        if (angular.isDefined(searchName) && searchName != '') {
            var name = 'patient.doctors-searchDoctors';
            var data = {
                name: searchName
            };

            $state.go(name, data);
        }


    }

    client.init = function() {




    }

    client.init();




}
angular.module('controllers').controller('patient.doctors.searchCtrl', searchCtrl);
