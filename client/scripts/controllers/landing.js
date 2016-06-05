'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:LandingCtrl
 * @description
 * # LandingCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('LandingCtrl', function ($rootScope, $scope, $q, $timeout, Dj, User, Server, Space, publicSpaces) {

    $scope.Dj = Dj;//.findById({id:'5684f858d4b1e4996ec6d9bf'});

    $scope.User = User;

    $scope.publicSpaces = publicSpaces;

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

    var thePlayingSpace = false;

    var playSpace = function(space){
      thePlayingSpace = space;
    };

    var playingSpace = function(){
      return thePlayingSpace;
    };


    var addingSpace = false;
    var resetAdding = function(){
      addingSpace = false;
    };

    var isAdding = function(){
      return addingSpace;
    };

    var setAdding = function(){
      addingSpace = true;
    };


    $scope.playingSpace = playingSpace;
    $scope.playSpace = playSpace;

    $scope.isAdding = isAdding;
    $scope.setAdding = setAdding;
    $scope.addingSpace = addingSpace;
    $scope.resetAdding = resetAdding;



  });
