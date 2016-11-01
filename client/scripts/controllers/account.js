'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('AccountCtrl', function ($rootScope, $scope, $q, $log, $location, $state, Dj, user, Server, User, Utility) {

    var passwordSuccess = false;

    var tempAccessToken = $location.search().access_token;

    var changePassword = function (newPassword, newPassword2) {
      passwordSuccess = false;

      if (newPassword === newPassword2) {
        Server.updatePassword(newPassword, tempAccessToken)
          .then(function (response) {
            $log.log(response);
            passwordSuccess = "Password has been updated";
            showMessage(passwordSuccess);
          })
          .catch(function (err) {
            $log.error(err);
            passwordSuccess = false;
          });
      } else {
        alert('passwords do not match');
      }
    };

    var showError = Utility.showError;

    var showMessage = Utility.showMessage;

    var clearMessage = function () {
      $rootScope.message = '';
    };

    var register = function (registerData) {

      User.register(registerData)
        .then(function (data) {
          showMessage("Thanks for signing up! Logging in now ...");
          return $q.resolve(data);
        })
        .then(login)
        .catch(showError)
    };
    var login = function (loginData) {
      User.login(loginData)
        .then(function () {
          $state.go('base.landing');
        })
        .catch(showError)
    };

    var resetPassword = function (email) {
      clearMessage();
      Server.resetPassword(email)
        .then(function () {
          return 'We received your request.  Please check your email in a few minutes for further instructions.'
        })
        .then(showMessage)
        .catch(showError)
    };
    $scope.login = login;
    $scope.register = register;

    $scope.clearMessage = clearMessage;
    $scope.showMessage = showMessage;
    $scope.showError = showError;
    $scope.resetPassword = resetPassword;
    $scope.passwordSuccess = passwordSuccess;

    $scope.changePassword = changePassword;
    $scope.user = user;
    $scope.tempAccessToken = tempAccessToken;

  });
