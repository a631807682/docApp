var cityCtrl = function($scope, config, storage, httpService, $stateParams, $state, async, tips) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};


    /**
     * 获根据省获取市列表
     * @return {[type]} [description]
     */
    server.getCitys = function(proName) {
        var url = config.docApp + "/Cities/GetCityByProName/";
        var data = { name: proName };
        return httpService.get(url, data);

    }

    /**
     * 保存
     * @param  {[type]} customer [description]
     * @return {[type]}          [description]
     */
    server.updateCustomer = function(customer) {

        var url = config.docApp + '/CustomerUsers/UpdateCustomer/';

        return httpService.post(url, customer);

    }


    /*
        选择城市
     */
    client.checkCity = function(city) {

        params.customer.City = city.CityName
        console.log('res:', params.customer)
        server.updateCustomer(params.customer).then(function(response) {
            $state.go('doc.profile');

        });
    }

    client.init = function() {

        console.info('init', $stateParams.customer);
        params.customer = $stateParams.customer;
        server.getCitys(params.customer.Province).then(function(response) {
            $scope.citys = response.data.data;
        })


    }

    client.init();




}
angular.module('controllers').controller('doc.profile.cityCtrl', cityCtrl);
