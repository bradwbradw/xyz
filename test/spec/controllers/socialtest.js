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

});
