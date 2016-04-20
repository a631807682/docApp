var avatarCtrl = function($scope, config, storage, httpService, $stateParams, $ionicActionSheet, tips, $cordovaCamera) {

    $scope.server = server = {};
    $scope.params = params = {};
    $scope.client = client = {};

    $scope.imgPath = config.imgPath;
    $scope.preview = false;


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

                            httpService.upload(imageURI, function(url) {
                                $scope.preview = true;
                                $scope.imageURI = url;
                            })
                        });
                    } else if (index == 1) {
                        client.camera().then(function(imageURI) {
                            
                            httpService.upload(imageURI, function(url) {
                                $scope.preview = true;
                                $scope.imageURI = url;
                            })
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