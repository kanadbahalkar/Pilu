'use strict';

describe('Service: awsS3OperationsService', function () {

  // load the service's module
  beforeEach(module('piluApp'));

  // instantiate service
  var awsS3OperationsService;
  beforeEach(inject(function (_awsS3OperationsService_) {
    awsS3OperationsService = _awsS3OperationsService_;
  }));

  it('should do something', function () {
    expect(!!awsS3OperationsService).toBe(true);
  });

});
