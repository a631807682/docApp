// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('docApp', ['ionic', 'controllers', 'services', 'directives', 'ngCordova',
    'async', 'ion-datetime-picker', 'datetime', 'checklist-model'
])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('httpInterceptor'); //权限拦截
    $httpProvider.defaults.useXDomain = true;

    //doctor
    $stateProvider
        .state('doc', {
            url: '/doc',
            abstract: true,
            templateUrl: 'views/doctor/tabs.html'
        })

    .state('doc.index', {
            url: '/index',
            views: {
                'doc-index': {
                    templateUrl: 'views/doctor/index.html',
                    controller: 'doc.indexCtrl'
                }
            }
        })
        .state('doc.patientGroup', {
            url: '/index/patientGroup',
            views: {
                'doc-index': {
                    templateUrl: 'views/doctor/patientGroup.html',
                    controller: 'doc.patientGroupCtrl'
                }
            }
        })
        .state('doc.patientGroupList', {
            url: '/index/patientGroupList/:groupId',
            params: {
                groupId: ''
            },
            views: {
                'doc-index': {
                    templateUrl: 'views/doctor/patientGroupList.html',
                    controller: 'doc.patientGroupListCtrl'
                }
            }
        })


    .state('doc.visitStop', {
        url: '/visitStop',
        views: {
            'doc-visitStop': {
                templateUrl: 'views/doctor/visitStop.html',
                controller: 'doc.visitStopCtrl'
            }
        }
    })

    .state('doc.help', {
        url: '/help',
        views: {
            'doc-help': {
                templateUrl: 'views/doctor/help.html',
                controller: 'doc.helpCtrl'
            }
        }
    })

    .state('doc.member', {
            url: '/member',
            params: { redirectTo: null },
            views: {
                'doc-member': {
                    templateUrl: 'views/doctor/member.html',
                    controller: 'doc.memberCtrl'
                }
            }
        }).state('doc.profile', {
            url: '/member/profile',
            views: {
                'doc-member': {
                    templateUrl: 'views/doctor/profile.html',
                    controller: 'doc.profileCtrl'
                }
            }
        }).state('doc.profile-age', {
            url: '/member/profile/age',
            params: { customer: {} },
            views: {
                'doc-member': {
                    templateUrl: 'views/doctor/profile/age.html',
                    controller: 'doc.profile.ageCtrl'
                }
            }
        }).state('doc.profile-avatar', {
            url: '/member/profile/avatar',
            params: { customer: {} },
            views: {
                'doc-member': {
                    templateUrl: 'views/doctor/profile/avatar.html',
                    controller: 'doc.profile.avatarCtrl'
                }
            }
        }).state('doc.profile-province', {
            url: '/member/profile/province',
            params: { customer: {} },
            views: {
                'doc-member': {
                    templateUrl: 'views/doctor/profile/province.html',
                    controller: 'doc.profile.provinceCtrl'
                }
            }
        }).state('doc.profile-city', {
            url: '/member/profile/city',
            params: {
                customer: {}
            },
            views: {
                'doc-member': {
                    templateUrl: 'views/doctor/profile/city.html',
                    controller: 'doc.profile.cityCtrl'
                }
            }
        }).state('doc.profile-name', {
            url: '/member/profile/name',
            params: { customer: {} },
            views: {
                'doc-member': {
                    templateUrl: 'views/doctor/profile/name.html',
                    controller: 'doc.profile.nameCtrl'
                }
            }
        })
        .state('doc.docProfile', {
            url: '/member/docProfile',
            views: {
                'doc-member': {
                    templateUrl: 'views/doctor/docProfile.html',
                    controller: 'doc.docProfileCtrl'
                }
            }
        }).state('doc.docProfile-title', {
            url: '/member/docProfile/title',
            params: { doctor: {} },
            views: {
                'doc-member': {
                    templateUrl: 'views/doctor/docProfile/title.html',
                    controller: 'doc.docProfile.titleCtrl'
                }
            }
        }).state('doc.docProfile-hospital', {
            url: '/member/docProfile/hospital',
            params: { doctor: {} },
            views: {
                'doc-member': {
                    templateUrl: 'views/doctor/docProfile/hospital.html',
                    controller: 'doc.docProfile.hospitalCtrl'
                }
            }
        }).state('doc.docProfile-diseaseCate', {
            url: '/member/docProfile/diseaseCate',
            params: { doctor: {} },
            views: {
                'doc-member': {
                    templateUrl: 'views/doctor/docProfile/diseaseCate.html',
                    controller: 'doc.docProfile.diseaseCateCtrl'
                }
            }
        })
        .state('doc.docProfile-description', {
            url: '/member/docProfile/description',
            params: { doctor: {} },
            views: {
                'doc-member': {
                    templateUrl: 'views/doctor/docProfile/description.html',
                    controller: 'doc.docProfile.descriptionCtrl'
                }
            }
        }).state('doc.businessRange', {
            url: '/member/businessRange',
            views: {
                'doc-member': {
                    templateUrl: 'views/doctor/businessRange.html',
                    controller: 'doc.businessRangeCtrl'
                }
            }
        })
        .state('doc.consultationRight', {
            url: '/member/consultationRight',
            views: {
                'doc-member': {
                    templateUrl: 'views/doctor/consultationRight.html',
                    controller: 'doc.consultationRightCtrl'
                }
            }
        })

    .state('doc.telAppoint', {
        url: '/member/telAppoint',
        views: {
            'doc-member': {
                templateUrl: 'views/doctor/telAppoint.html',
                controller: 'doc.telAppointCtrl'
            }
        }
    }).state('doc.telAppointDetail', {
        url: '/member/telAppointDetail/:telId',
        params: {
            telId: ''
        },
        views: {
            'doc-member': {
                templateUrl: 'views/doctor/telAppointDetail.html',
                controller: 'doc.telAppointDetailCtrl'
            }
        }
    }).state('doc.onlineMessage', {
        url: '/member/onlineMessage',
        views: {
            'doc-member': {
                templateUrl: 'views/doctor/onlineMessage.html',
                controller: 'doc.onlineMessageCtrl'
            }
        }
    }).state('doc.onlineChat', {
        url: '/member/onlineChat/:chatId',
        params: {
            chatId: ''
        },
        views: {
            'doc-member': {
                templateUrl: 'views/share/onlineChat.html',
                controller: 'share.onlineChatCtrl'
            }
        }
    });






    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/account/login.html',
            controller: 'loginCtrl'
        });

    $stateProvider
        .state('signup', {
            url: '/signup',
            templateUrl: 'views/account/signup.html',
            controller: 'signupCtrl'
        });

    $stateProvider
        .state('signupConfirm', {
            url: '/signupConfirm/:user',
            templateUrl: 'views/account/signupConfirm.html',
            controller: 'signupConfirmCtrl'
        });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

});
