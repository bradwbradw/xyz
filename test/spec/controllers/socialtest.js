'use strict';

describe('Controller: SocialtestctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('xyzApp'));

  var SocialtestctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SocialtestctrlCtrl = $controller('SocialtestctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SocialtestctrlCtrl.awesomeThings.length).toBe(3);
  });
});
