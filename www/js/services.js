angular.module('services', [])

.factory('regExpHelper', function() {

    var regexEnum = {
        money: "^[0-9]+([\.]{0,1}[0-9]{1,2})?$",

        mobile: "^(13|15|18)[0-9]{9}$",

        email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$"
    };

    return {
        isMoney: function(s) {
            return new RegExp(regexEnum.money).test(s);
        },
        isMobile: function(s) {
            return new RegExp(regexEnum.mobile).test(s);
        },
        isEmail: function(s) {

            return new RegExp(regexEnum.email).test(s);
        }


    };

})

.factory('storage', function() {

    if (window.localStorage) {

        var storage = window.localStorage;
        return {
            get: function(key) {
                var data = storage.getItem(key);
                return JSON.parse(data);
            },
            set: function(key, val) {
                var data = JSON.stringify(val);
                storage.setItem(key, data);

            },
            remove: function(key) {
                storage.removeItem(key);
            }

        }
    }


})

.factory('httpInterceptor', function($q, $location, $injector) {

    return {
        responseError: function(response) {
            var $ionicLoading = $injector.get('$ionicLoading');
            var $ionicBackdrop = $injector.get('$ionicBackdrop');

            $ionicBackdrop.release();
            $ionicLoading.hide();

            if (response.status === 401) { //无权限
                // var $state = $injector.get('$state');
                // $state.go('login');

                $ionicLoading.show({
                    template: '请检测您的网络状况401' + JSON.stringify(response),
                    noBackdrop: true,
                    duration: 10 * 1000
                });
            } else {
                // console.log('请检测您的网络状况')
                $ionicLoading.show({
                    template: '请检测您的网络状况' + JSON.stringify(response),
                    noBackdrop: true,
                    duration: 10 * 1000
                });
            }


            return $q.reject(response);

        }
    }
})

.factory('httpService', function($http, config, $ionicBackdrop, $ionicLoading, storage, $cordovaFileTransfer, $cordovaProgress, $state, $q) {

    return {
        post: function(url, params) {

            //or add x-access-token 
            var token = '';
            var tokenInfo = storage.get(config.tokenKey);
            if (tokenInfo && tokenInfo.access_token) {
                token = tokenInfo.access_token;
            }

            var httpConfig = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };


            $ionicBackdrop.retain();
            $ionicLoading.show({
                template: "<ion-spinner icon='ios' class='spinner spinner-ios '></ion-spinner>",
                noBackdrop: true
            });

            return $http.post(config.host + url, params, httpConfig).success(function() {

                $ionicBackdrop.release();
                $ionicLoading.hide();

            });
            // return $http.post(config.host + url, params, httpConfig);
        },
        get: function(url, params) {

            //or add x-access-token
            var token = '';
            var tokenInfo = storage.get(config.tokenKey);
            if (tokenInfo && tokenInfo.access_token) {
                token = tokenInfo.access_token;
            }
            //Safari Authorization不可空格
            var httpConfig = {
                params: params,
                headers: {
                    Authorization: 'Bearer ' + token
                }
            };

            $ionicBackdrop.retain();
            $ionicLoading.show({
                template: "<ion-spinner icon='ios' class='spinner spinner-ios '></ion-spinner>",
                noBackdrop: true
            });

            // return $http.get(config.host + url, httpConfig).success(function() {

            //     $ionicBackdrop.release();
            //     $ionicLoading.hide();

            // });
            var deferred = $q.defer();
            $http.get(config.host + url, httpConfig).then(function(response) {
                $ionicBackdrop.release();
                $ionicLoading.hide();

                deferred.resolve(response);
            }, function(response) {
                deferred.reject(response);
            });
            return deferred.promise;

        },
        connect: function(url, params) {

            var token = '';
            var tokenInfo = storage.get(config.tokenKey);
            if (tokenInfo && tokenInfo.access_token) {
                token = tokenInfo.access_token;
            }

            var httpConfig = {
                params: params,
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };

            return $http.get(config.host + url, httpConfig);

        }

        // /**
        //  * 图片上传
        //  * @param  {[type]}   filePath [description]
        //  * @param  {Function} done     [description]
        //  * @return {[type]}            [description]
        //  */
        // upload: function(filePath, done) {

        //     document.addEventListener("deviceready", function() {

        //         $cordovaFileTransfer.upload(config.uploadServer, filePath)
        //             .then(function(result) {
        //                 var response = JSON.parse(result.response);
        //                 done(response.url);
        //                 // Success!
        //             }, function(err) {
        //                 console.log('Error');
        //                 // Error
        //             }, function(progress) {
        //                 // $cordovaProgress

        //                 // constant progress updates
        //                 console.log(progress, (progress.loaded / progress.total) * 100)
        //             });

        //     });

        // }



    }

})

.factory('tips', function($ionicLoading) {

    return {
        show: function(content) {
            $ionicLoading.show({
                template: content,
                noBackdrop: true,
                duration: 1000
            });
        }
    }
});
