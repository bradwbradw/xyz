'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('SidebarCtrl', function ($scope, $timeout,$q,viewer, space, Space, Social) {

    $scope.viewer = viewer;
    $scope.space = space;
    $scope.Space = Space;

    $scope.FB = Social.FB
  });
