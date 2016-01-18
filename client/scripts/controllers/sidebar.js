'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('SidebarCtrl', function ($scope, $timeout,$q,viewer, space, Social) {

    $scope.viewer = viewer;
    $scope.space = space;

    $scope.FB = Social.FB
  });
