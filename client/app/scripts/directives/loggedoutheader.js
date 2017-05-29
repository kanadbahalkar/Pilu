'use strict';

/**
 * @ngdoc directive
 * @name piluApp.directive:loggedoutHeader
 * @description
 * # loggedoutHeader
 */
angular.module('piluApp')
  .directive('loggedoutHeader', function () {
    return {
      template: '<h1>asdfasdfasdfsaf</h1>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the loggedoutHeader directive');
      }
    };
  });
