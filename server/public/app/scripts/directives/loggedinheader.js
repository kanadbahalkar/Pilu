'use strict';

/**
 * @ngdoc directive
 * @name piluApp.directive:loggedinHeader
 * @description
 * # loggedinHeader
 */
angular.module('piluApp')
  .directive('loggedinHeader', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the loggedinHeader directive');
      }
    };
  });
