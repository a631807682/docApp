var signupCtrl = function($scope, regExpHelper, tips, config, httpService, $location) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};


    params.user = '631807682@qq.com';
    params.password = '123456';
    params.confirmPassword = '123456';


    /**
     * 注册
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    server.sigup = function(data) {
        var url = config.accountApp + "/Account/Register/";
        return httpService.post(url, data);
    }



    client.signup = function() {


        if (angular.isUndefined(params.password) || params.password.length < 5) {

            tips.show('请输入6位以上密码')
            return;
        }

        if (params.password != params.confirmPassword) {

            tips.show('请填写一致的密码及确认密码')
            return;
        }

        if ((!regExpHelper.isMobile(params.user)) && (!regExpHelper.isEmail(params.user))) {

            tips.show('请填写正确的手机号码或邮箱')
            return;
        }


        var singupEntity = {
            telOrEmail: params.user,
            password: params.password,
            userType: params.userType
        };
        server.sigup(singupEntity).then(function(response) {
            var data = response.data;

            if (data.Status == 0) {

                var redUrl = "/signupConfirm/" + params.user;
                $location.path(redUrl);
            } else {
                tips.show(data.ErrorMessage);
            }
        });


    }

    client.changeType = function(type) {
        params.userType = type;
        if (params.userType == 0) {

            params.typeName = "医生";
        } else {

            params.typeName = "病人";
        }
    }



    client.Init = function() {

        client.changeType(1);
    }

    client.Init();



}


angular.module('controllers').controller('signupCtrl', signupCtrl);
