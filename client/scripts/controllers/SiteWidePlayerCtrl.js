'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:LandingCtrl
 * @description
 * # LandingCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('SiteWidePlayerCtrl', function ($rootScope, $scope, $log, Player) {
      $scope.Player = Player;
  });
