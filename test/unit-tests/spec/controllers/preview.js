'use strict';

describe('Controller: PreviewCtrl', function () {

  // load the controller's module
  beforeEach(module('xyzApp'));

  var PreviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PreviewCtrl = $controller('PreviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PreviewCtrl.awesomeThings.length).toBe(3);
  });
});
