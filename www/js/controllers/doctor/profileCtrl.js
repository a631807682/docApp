var profileCtrl = function($scope, config, storage, httpService, $state, $stateParams, $ionicActionSheet) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};


    $scope.imgPath = config.imgPath;

    /**
     * 获取用户详情
     * @param  {[type]} doctorId [description]
     * @return {[type]}          [description]
     */
    server.getDoctor = function(userId) {
        var url = config.docApp + '/CustomerUsers/GetCustomerUser';
        var data = { id: userId };
        return httpService.get(url, data);

    }

    /**
     * 更新会员信息
     * @param  {[type]} customer [description]
     * @return {[type]}          [description]
     */
    server.updateCustomer = function(customer) {

        var url = config.docApp + "/CustomerUsers/UpdateCustomer/";
        return httpService.post(url, customer);

    }


    client.go = function(name) {
        var params = {
            customer: $scope.customer
        };

        $state.go(name, params);

    }

    /*
        修改性别
     */
    client.genderList = function() {

        var hideSheet = $ionicActionSheet.show({
            buttons: [{
                text: '男'
            }, {
                text: '女'
            }],
            cancelText: '取消',
            buttonClicked: function(index) {

                if (index == 0) {
                    if ($scope.customer.Gender != '男') {
                        $scope.customer.Gender = '男';
                        server.updateCustomer($scope.customer).then(function(response) {
                            hideSheet();
                        })

                    } else {
                        hideSheet();
                    }

                } else if (index == 1) {

                    if ($scope.customer.Gender != '女') {
                        $scope.customer.Gender = '女';
                        server.updateCustomer($scope.customer).then(function(response) {
                            hideSheet();
                        })
                    } else {
                        hideSheet();
                    }

                }

            }
        });
    }




    client.init = function() {

        var customer = storage.get(config.customerKey);
        params.userId = customer.CustomerUserId;
        //用户详情
        server.getDoctor(params.userId).then(function(response) {

            $scope.customer = response.data.data;
            console.log($scope.customer);

        });
    }



    client.init();
}
angular.module('controllers').controller('doc.profileCtrl', profileCtrl);
