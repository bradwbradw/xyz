'use strict';

describe('Service: Social', function () {

  // load the service's module
  beforeEach(module('xyzApp'));

  // instantiate service
  var Social;
  beforeEach(inject(function (_Social_) {
    Social = _Social_;
  }));

  it('should do something', function () {
    expect(!!Social).toBe(true);
  });

});
