'use strict';

/**
 * @ngdoc directive
 * @name xyzApp.directive:previewing
 * @description
 * # previewing
 */
angular.module('xyzApp')
  .directive('previewing', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs, Stream) {
        element.html('<center>this is the previewing directive{{thing}}</center>');
        scope.thing = 'a thing is neat';
      }
    };
  });
