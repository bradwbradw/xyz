'use strict';

describe('Service: Library', function () {

  // load the service's module
  beforeEach(module('xyzApp'));


  // instantiate service
  var Library;

  Library.playlist =

  beforeEach(inject(function (_Library_) {
    Library = _Library_;
  }));

  it('should do something', function () {
    expect(!!Library).toBe(true);
  });

  it('should return current', function(){

  });

});
