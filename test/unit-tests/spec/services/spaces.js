'use strict';

fdescribe('Service: Spaces', function () {

  // load the service's module
  beforeEach(module('xyzApp'));

  // instantiate service
  var Spaces, $log, $q, $stateParams, Space, User, Dj, Utility;
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

  beforeEach(inject(function (_$log_, _$q_, _$stateParams_, _Space_, _User_, _Dj_, _Utility_) {
    Spaces = _Spaces_;
      $log = _$log_;
      $q = _$q_;
      $stateParams = _$stateParams_;
      Space = _Space;
      User = _User_;
      Dj = _Dj_;
      Utility = _Utility_;
  }));

  it('should have Spaces', function () {
    expect(!!Spaces).toBe(true);
  });

});
