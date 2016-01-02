'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:LandingCtrl
 * @description
 * # LandingCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('LandingCtrl', function ($rootScope, $scope, Dj, User, Server) {

    $scope.Dj = Dj;//.findById({id:'5684f858d4b1e4996ec6d9bf'});

    $scope.User = User;
/*

    var registerData = {};

    $scope.registerData = registerData;

    $scope.handleRegister = function(){
      return Dj.login(registerData, _.noop)
        .$promise
        .catch(function(err){
          return $q.reject(err);
        });
      console.log('register handled:');
    };
*/

    $scope.showError = function(error){
      $rootScope.error = error;
    };

    $rootScope.lb = Server.loopback;




  });
