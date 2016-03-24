var signupConfirmCtrl = function($scope, regExpHelper, $stateParams, httpService, tips, $timeout, config, $location) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    params.user = '';
    params.code = '';

    /**
     * 发生验证码
     * @param  {[type]} user [description]
     * @return {[type]}      [description]
     */
    server.getConfirmCode = function(user) {

        var url = config.accountApp + '/Account/getConfirmCode';
        var data = { telOrEmail: user };

        return httpService.get(url, data);
    }

    /**
     * 验证码
     * @param  {[type]} user [description]
     * @param  {[type]} code [description]
     * @return {[type]}      [description]
     */
    server.verifyCode = function(user, code) {
        var url = config.accountApp + '/Account/VerifyConfirmCode';
        var data = { telOrEmail: user, code: code };

        return httpService.get(url, data)

    }


    client.sendCode = function() {
        console.log('sendCode')

        server.getConfirmCode(params.user).then(function(response) {
            var data = response.data;

            if (data.Status == '0') {

                client.enableSend(60);

            } else {
                tips.show(data.ErrorMessage);
            }
        })

    }

    client.verifyCode = function() {
        if (params.code.length > 0) {
            server.verifyCode(params.user, params.code).then(function(response) {
                var data = response.data;
                if (data.Status == '0') {
                    $location.path('/login');
                } else {
                    tips.show(data.ErrorMessage);
                }
            })
        } else {
            tips.show('请输入验证码');
        }


    }

    client.enableSend = function(times) {
        if (times > 1) {
            times--;

            $scope.codeEnable = false;
            $scope.codeTips = times + '秒后获取';
            $timeout(function() {
                client.enableSend(times);
            }, 1000);

        } else {
            $scope.codeEnable = true;
            $scope.codeTips = '发送验证码';
        }

    }

    client.init = function() {
        $scope.codeTips = '发送验证码';
        $scope.codeEnable = true;

        params.user = $stateParams.user;
    }

    client.init();


}

angular.module('controllers').controller('signupConfirmCtrl', signupConfirmCtrl);
