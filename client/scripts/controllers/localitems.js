'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:LocalitemsCtrl
 * @description
 * # LocalitemsCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('LocalItemsCtrl', function ($scope,Library) {

    $scope.Library = Library;

  });
