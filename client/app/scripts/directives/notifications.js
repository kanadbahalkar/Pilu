'use strict';

/**
 * @ngdoc directive
 * @name piluApp.directive:notifications
 * @description
 * # notifications
 */
angular.module('piluApp')
  .directive('notifications', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the notifications directive');
      }
    };
  });
