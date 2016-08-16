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

    var passwordSuccess = false;

    var changePassword = function(newPassword, newPassword2){
      passwordSuccess = false;

      if(newPassword === newPassword2){
        Server.updatePassword(newPassword, tempAccessToken)
          .then(function(response){
            $log.log(response);
            passwordSuccess = "Password has been updated";
          })
          .catch(function(err){
            $log.error(err);
            passwordSuccess = false;
          });
      } else {
        alert('passwords do not match');
      }
    };

    $scope.passwordSuccess = passwordSuccess;
    $scope.changePassword = changePassword;
    $scope.user = user;
    $scope.tempAccessToken = tempAccessToken;

  });
