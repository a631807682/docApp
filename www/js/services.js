angular.module('services', [])

.factory('RegExpHelper', function() {

        var regexEnum = {
            money: "^[0-9]+([\.]{0,1}[0-9]{1,2})?$",

            mobile: "^(13|15|18)[0-9]{9}$",

            email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$"
        };

        return {
            isMoney: function(s) {
                return new RegExp(regexEnum.money);
            },
            isMobile: function(s) {
                return new RegExp(regexEnum.mobile);
            },
            isEmail: function(s) {

                return new RegExp(regexEnum.email);
            }


        };

    })
    .factory('httpService', function($http, config, $ionicBackdrop, $ionicLoading) {

        return {
            post: function(url, params) {
                // body...
                $ionicBackdrop.retain();
                $ionicLoading.show({
                    template: "<ion-spinner icon='ios' class='spinner spinner-ios '></ion-spinner>",
                    noBackdrop: true
                });

                //or add x-access-token
                var token = window.localStorage.token;
                var config = {
                    headers: {
                        'Authorization': 'Beare' + token
                    }
                };

                return $http.post(config.host + url, params, config).success(function() {

                    $ionicBackdrop.release();
                    $ionicLoading.hide();

                }).error(function(err) {

                    $ionicBackdrop.release();
                    $ionicLoading.hide();
                });

            }



        }


    });
