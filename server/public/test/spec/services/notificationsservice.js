'use strict';

describe('Service: notificationsService', function () {

  // load the service's module
  beforeEach(module('piluApp'));

  // instantiate service
  var notificationsService;
  beforeEach(inject(function (_notificationsService_) {
    notificationsService = _notificationsService_;
  }));

  it('should do something', function () {
    expect(!!notificationsService).toBe(true);
  });

});
