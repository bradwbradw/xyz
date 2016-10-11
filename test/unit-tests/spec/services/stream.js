'use strict';

describe('Service: Stream', function () {

  // load the service's module
  beforeEach(module('xyzApp'));

  // instantiate service
  var Stream;

  beforeEach(inject(function (_Stream_) {
    Stream = _Stream_;
  }));

  it('should do something', function () {
    expect(!!Stream).toBe(true);
  });

  it('should return current', function(){


  });

});
