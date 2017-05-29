'use strict';

describe('Directive: loggedoutHeader', function () {

  // load the directive's module
  beforeEach(module('piluApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<loggedout-header></loggedout-header>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the loggedoutHeader directive');
  }));
});
