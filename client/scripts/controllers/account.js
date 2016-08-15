'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('AccountCtrl', function ($rootScope, $scope, $q, $log, Dj, user, Server , Social, tempAccessToken) {


    var changePassword = function(newPassword){

    };

    $scope.changePassword = changePassword;
    $scope.user = user;
    $scope.tempAccessToken = tempAccessToken;

  });
