'use strict';

describe('Controller: SpaceCtrl', function () {

  // load the controller's module
  beforeEach(module('xyzApp'));

  var SpaceCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpaceCtrl = $controller('SpaceCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
