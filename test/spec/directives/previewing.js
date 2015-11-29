'use strict';

describe('Directive: previewing', function () {

  // load the directive's module
  beforeEach(module('xyzApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<previewing></previewing>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the previewing directive');
  }));
});
