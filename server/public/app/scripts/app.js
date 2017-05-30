'use strict';

/**
 * @ngdoc overview
 * @name piluApp
 * @description
 * # piluApp
 *
 * Main module of the application.
 */

var piluApp = angular
  .module('piluApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'ngFileUpload'
  ]);

piluApp.constant('appConfig', {
  apiUrl:'https://localhost:4731/api',
  socketUrl:'https://localhost:4731/'
});

piluApp.constant("$MD_THEME_CSS","");

piluApp.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'login'
    })
    .when('/feed', {
      templateUrl: 'views/feed.html',
      controller: 'FeedCtrl',
      controllerAs: 'feed'
    })
    .when('/about', {
      templateUrl: 'views/notifications.html',
      controller: 'NotificationsCtrl',
      controllerAs: 'notifications'
    })
    .when('/discover', {
      templateUrl: 'views/discover.html',
      controller: 'DiscoverCtrl',
      controllerAs: 'discover'
    })
    .when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl',
      controllerAs: 'profile'
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true).hashPrefix('');
});
