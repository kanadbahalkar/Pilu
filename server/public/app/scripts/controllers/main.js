'use strict';

/**
 * @ngdoc function
 * @name piluApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the piluApp
 */
angular.module('piluApp')
  .controller('MainCtrl', [
    'appConfig',
    '$http',
    '$scope',
    '$log',
    '$window',
    '$routeParams',
    'storiesService',
    '$mdDialog',
    function (appConfig, $http, $scope, $log, $window, $routeParams, storiesService, $mdDialog) {
      this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      //Get public stories from storiesService
      storiesService.getPublicStories()
      .then(function(data){
        $scope.publicStories = data.publicStories;
      });

      //Load more public stories
      $scope.loadMorePublicStories = function (){
        console.log('Loading more stories...');
      }
    }]);
