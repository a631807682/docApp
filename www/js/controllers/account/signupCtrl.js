var signupCtrl = function($scope, RegExpHelper, $ionicPopup) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};
    var tools = $scope.tools;


    server.sigup = function() {


    }


    client.signup = function() {

//**[验证
        if (angular.isUndefined(params.password) || params.password.length < 5) {

            $ionicPopup.alert({
                template: '请输入6位以上密码'
            });
            return;
        }

        if (params.password != params.confirmPassword) {

            $ionicPopup.alert({
                template: '请填写一致的密码及确认密码'
            });
            return;
        }

        if ((!RegExpHelper.isMobile(params.user)) || (!RegExpHelper.isEm(params.user))) {

            $ionicPopup.alert({
                template: '请填写正确的手机号码或邮箱'
            });

            return;
        }

//]
        var singupEntity = {
            telOrEmail: params.user,
            password: params.password,
            userType: params.userType
        };
        server.sigup(singupEntity).then(function() {


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
