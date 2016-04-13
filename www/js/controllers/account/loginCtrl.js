var loginCtrl = function($scope, config, regExpHelper, tips, httpService, storage, $location, $http, $state) {


    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    params.user = '13510271102';
    params.password = '123456';



    /**
     * 登录
     * @param  {[type]} user [description]
     * @param  {[type]} password [description]
     * @return {[type]}          [description]
     */
    server.login = function(user, password) {

        var url = "/Token";
        var data = "grant_type=password&username=" + user + "&password=" + password + "&client_id=" + config.clientAuthId;
        return httpService.post(url, data);
    }

    /**
     * 获取用户信息
     * @return {[type]} [description]
     */
    server.getCustomer = function() {

        var url = config.customerApp + "/CustomerCenter/GetUserInfo";
        return httpService.get(url, null);
    }


    client.login = function() {


        if (regExpHelper.isEmail(params.user) || regExpHelper.isMobile(params.user)) {

            if (params.password.length > 0) {

                server.login(params.user, params.password).then(function(response) { //登录成功

                    var token = response.data;
                    //写入
                    storage.set(config.tokenKey, token);

                    client.goIndex();

                }, function(response) { //登录异常
                    var error = response.data;

                    if (error.error == 'err_user') { //登录错误

                        tips.show(error.error_description);

                    } else if (error.error == 'err_binding') { //未绑定用户

                        var redUrl = '/signupConfirm/' + params.user;
                        $location.path(redUrl);

                    }
                });

            } else {
                tips.show('请输入密码');
            }

        } else {

            tips.show('请输入正确的用户名或邮箱');
        }
    }

    /*
        跳转个人主页
     */
    client.goIndex = function() {
        //查询用户信息
        server.getCustomer().then(function(response) {
            var customer = response.data;

            console.log('customer', customer);
            storage.set(config.customerKey, customer);

            //跳转首页 医/患
            if (customer.UserType == '医生') {
                $location.path('/doc/index');
            } else {
                tips.show('跳转患者端')
            }

        });
    }

    /*
        权限跳转
     */
    client.init = function() {

        //localstorage存在 且token未过期
        var customer = storage.get(config.customerKey);
        console.log('customer:', customer);
        if (customer) {
            client.goIndex();
        }

    }

    client.init();

}


angular.module('controllers').controller('loginCtrl', loginCtrl);
