// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('docApp', ['ionic', 'controllers', 'services', 'directives', 'ngCordova'])

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

.config(function($stateProvider, $urlRouterProvider) {

    //doctor
    $stateProvider

        .state('doc', {
        url: '/doc',
        abstract: true,
        templateUrl: 'views/doctor/tabs.html'
    }).state('doc.index', {
        url: '/index',
        views: {
            'doc-index': {
                templateUrl: 'views/doctor/index.html',
                controller: 'doc.indexCtrl'
            }
        }
    }).state('doc.visitStop', {
        url: '/visitStop',
        views: {
            'doc-visitStop': {
                templateUrl: 'views/doctor/visitStop.html',
                controller: 'doc.visitStopCtrl'
            }
        }
    }).state('doc.help', {
        url: '/help',
        views: {
            'doc-help': {
                templateUrl: 'views/doctor/help.html',
                controller: 'doc.helpCtrl'
            }
        }
    }).state('doc.member', {
        url: '/member',
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
    }).state('doc.profile-avatar', {
        url: '/member/profile/avatar',
        params: { customer: {} },
        views: {
            'doc-member': {
                templateUrl: 'views/doctor/profile/avatar.html',
                controller: 'doc.profile.avatarCtrl'
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
