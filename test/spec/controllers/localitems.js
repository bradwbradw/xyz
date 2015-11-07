'use strict';

describe('Controller: LocalitemsCtrl', function () {

  // load the controller's module
  beforeEach(module('xyzApp'));

  var LocalitemsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LocalitemsCtrl = $controller('LocalitemsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
