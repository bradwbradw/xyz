'use strict';

describe('Controller: AddMediaCtrl', function () {

  // load the controller's module
  beforeEach(module('xyzApp'));

  var AddMediaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddMediaCtrl = $controller('AddMediaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
