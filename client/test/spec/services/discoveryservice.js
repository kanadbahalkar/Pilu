'use strict';

describe('Service: discoveryService', function () {

  // load the service's module
  beforeEach(module('piluApp'));

  // instantiate service
  var discoveryService;
  beforeEach(inject(function (_discoveryService_) {
    discoveryService = _discoveryService_;
  }));

  it('should do something', function () {
    expect(!!discoveryService).toBe(true);
  });

});
