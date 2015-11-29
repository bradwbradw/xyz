'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:PreviewCtrl
 * @description
 * # PreviewCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('PreviewCtrl', function ($scope, Stream) {
    $scope.previewingItem = 'something';
    $scope.Stream = Stream;
  });
