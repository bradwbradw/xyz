'use strict';

describe('Controller: RenameCtrl', function () {

  // load the controller's module
  beforeEach(module('xyzApp'));

  var RenameCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RenameCtrl = $controller('RenameCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
