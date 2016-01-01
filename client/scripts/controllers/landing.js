'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:LandingCtrl
 * @description
 * # LandingCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('LandingCtrl', function ($rootScope, $scope, Dj, Server) {

    $scope.Dj = Dj;//.findById({id:'5684f858d4b1e4996ec6d9bf'});

    $scope.Server = Server;

    $scope.handleRegister = function(bla){
      console.log('register handled:',bla);
    };

    $scope.showError = function(error){
      $rootScope.error = error;
    };


    $scope.p = Server.p;


  });
