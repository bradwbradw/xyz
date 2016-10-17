'use strict';

fdescribe('Service: Spaces', function () {

  // load the service's module
  beforeEach(module('xyzApp'));

  // instantiate service
  var Spaces, $log, $q, Space, User, Dj, Server, Utility, Playlister;
  var $httpBackend, requestHandler;

  beforeEach(angular.mock.http.init);
  afterEach(angular.mock.http.reset);

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');

    //noinspection JSUnusedAssignment
    requestHandler = $httpBackend.whenGET()
      .passThrough();

    //noinspection JSUnusedAssignment
    requestHandler = $httpBackend.whenPOST()
      .passThrough();

    requestHandler = $httpBackend.whenDELETE()
      .passThrough();
  }));


  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  beforeEach(inject(function (_$log_, _$q_, _Space_, _User_, _Dj_, _Server_, _Utility_, _Playlister_) {
    Spaces = _Spaces_;
      $log = _$log_;
      $q = _$q_;
      Space = _Space;
      User = _User_;
      Dj = _Dj_;
      Server = _Server_;
      Utility = _Utility_;
      Playlister = _Playlister_;
  }));

  it('should have Spaces', function () {
    expect(!!Spaces).toBe(true);
  });

});
