'use strict';

describe('Service: MediaAPI', function () {

  // load the service's module
  beforeEach(module('xyzApp'));

  // instantiate service
  var MediaAPI;
  beforeEach(inject(function (_MediaAPI_) {
    MediaAPI = _MediaAPI_;
  }));

  it('should do something', function () {
    expect(!!MediaAPI).toBe(true);
  });

});
