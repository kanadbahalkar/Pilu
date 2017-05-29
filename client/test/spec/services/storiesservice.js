'use strict';

describe('Service: storiesService', function () {

  // load the service's module
  beforeEach(module('piluApp'));

  // instantiate service
  var storiesService;
  beforeEach(inject(function (_storiesService_) {
    storiesService = _storiesService_;
  }));

  it('should do something', function () {
    expect(!!storiesService).toBe(true);
  });

});
