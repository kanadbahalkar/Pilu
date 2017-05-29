'use strict';

/**
 * @ngdoc directive
 * @name piluApp.directive:pressEnter
 * @description
 * # pressEnter
 */
angular.module('piluApp')
  .directive('pressEnter', function () {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if (event.which === 13) {
          scope.$apply(function () {
            scope.$eval(attrs.pressEnter);
          });

          event.preventDefault();
        }
      });
    };
  });