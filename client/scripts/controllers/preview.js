'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:PreviewCtrl
 * @description
 * # PreviewCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('PreviewCtrl', function ($scope, Player, $sce, Utility) {

    $scope.iFrameUrl = Utility.iFrameUrl;

    $scope.Player = Player;


    $scope.$sce = $sce;
  });
