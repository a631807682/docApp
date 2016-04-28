var avatarCtrl = function($scope, config, storage, httpService, $state, $stateParams, $ionicActionSheet, tips, $cordovaCamera) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    $scope.imgPath = config.imgPath;
    $scope.preview = false;

    server.save = function(customer) {

        var url = config.docApp + '/CustomerUsers/UpdateCustomer/';

        var data = customer;

        return httpService.post(url, data);

    }


    client.update = function(imageURI) {

        httpService.upload(imageURI).then(function(url) {
            $scope.preview = true;
            $scope.imageURI = url;
            params.customer.Photo = url;

            tips.show(url);

            server.save(params.customer).then(function(response) {
                $state.go('patient.profile', {});
            })


        }, function(err) {
            tips.show(err);
        })
    }


    client.show = function() {
        // 显示操作表
        var hideSheet = $ionicActionSheet.show({
            buttons: [{
                text: '拍照'
            }, {
                text: '从手机相册选择'
            }],
            cancelText: '取消',
            buttonClicked: function(index) {

                document.addEventListener("deviceready", function() {
                    if (index == 0) {
                        client.gallery().then(function(imageURI) {

                            client.update(imageURI);
                        });
                    } else if (index == 1) {
                        client.camera().then(function(imageURI) {

                            client.update(imageURI);
                        });
                    }

                    hideSheet();

                });
            }
        });
    }

    client.gallery = function() {
        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
        };
        return $cordovaCamera.getPicture(options);
    }

    client.camera = function() {
        var options = {
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        };

        return $cordovaCamera.getPicture(options);
    }

    client.init = function() {

        console.info('init', $stateParams.customer);
        params.customer = $stateParams.customer;
    }

    client.init();
}
angular.module('controllers').controller('patient.profile.avatarCtrl', avatarCtrl);
