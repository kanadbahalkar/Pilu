'use strict';

describe('Directive: loggedinHeader', function () {

  // load the directive's module
  beforeEach(module('piluApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<loggedin-header></loggedin-header>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the loggedinHeader directive');
  }));
});
