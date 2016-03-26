'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:LandingCtrl
 * @description
 * # LandingCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('LandingCtrl', function ($rootScope, $scope, $q, Dj, User, Server, Space, publicSpaces) {

    $scope.Dj = Dj;//.findById({id:'5684f858d4b1e4996ec6d9bf'});

    $scope.User = User;

    $scope.publicSpaces = publicSpaces;

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

    $scope.showError = function (error) {
      if (error.error.message) {
        error = error.error.message;
      }

      $rootScope.error = error;
    };

    $scope.clearError = function (thing) {
      $rootScope.error = '';
      return $q.resolve(thing);
    };

    $rootScope.lb = Server.loopback;


    $scope.deleteSpace = function (space) {
      //return Dj.spaces.destroyById({id:User.get().id,fk:space.id}, _.noop)
    };

    var thePlayingSpace = false;

    var playSpace = function(space){
      thePlayingSpace = space;
    };

    var playingSpace = function(){
      return thePlayingSpace;
    };

    //TODO remove this
//    playSpace('mock');
    $scope.playingSpace = playingSpace;
    $scope.playSpace = playSpace;


  });
