'use strict';

/**
 * @ngdoc function
 * @name piluApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the piluApp
 */
angular.module('piluApp')
  .controller('LoginCtrl', [
    'appConfig',
    '$http',
    '$scope',
    '$location',
    '$log',
    '$window',
    '$routeParams',
    'storiesService',
    function (appConfig, $http, $scope, $location, $log, $window, $routeParams, storiesService) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      //Go to Feed/home page
      $scope.go = function (path) {
        $location.path(path);
      };
    }]);