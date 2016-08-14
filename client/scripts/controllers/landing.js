'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:LandingCtrl
 * @description
 * # LandingCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('LandingCtrl', function ($rootScope, $scope, $q, $timeout, $log, Dj, User, Server, Space, publicSpaces, Player, Social, Utility) {

    $scope.Dj = Dj;//.findById({id:'5684f858d4b1e4996ec6d9bf'});

    $scope.User = User;

    $scope.publicSpaces = publicSpaces;

    var showError = function (error) {

      $rootScope.error = Utility.cleanError(error);
    };

    var clearError = function (thing) {
      $rootScope.error = '';
      return $q.resolve(thing);
    };

    var showMessage = function (msg) {

      $rootScope.message = msg;
    };

    var clearMessage = function(){
      $rootScope.message = '';
    };

    $rootScope.lb = Server.loopback;

    var addingSpace = false;
    var resetAdding = function () {
      addingSpace = false;
    };

    var isAdding = function () {
      return addingSpace;
    };

    var setAdding = function () {
      addingSpace = true;
    };

    var spaceIsOwned = function (space) {
      return space.ownerId === User.get().id;
    };

    var login = function (loginData) {
      clearError(loginData)
        .then(User.login)
        .then(User.fetchSpaces)
        .then(function (spaces) {
          Social.FB.refreshFB();
          Server.fetchAllPlaylists(_.union(publicSpaces, spaces.own, spaces.editable));
        })
        .catch(showError)
    };

    var resetPassword = function (email) {
      clearMessage();
      clearError();
      Server.resetPassword(email)
        .then(function(){
          return 'We received your request.  Please check your email in a few minutes for further instructions.'
        })
        .then(showMessage)
        .catch(showError)
    };
    $scope.login = login;
    $scope.spaceIsOwned = spaceIsOwned;
    $scope.isAdding = isAdding;
    $scope.setAdding = setAdding;
    $scope.addingSpace = addingSpace;
    $scope.resetAdding = resetAdding;
    $scope.clearError = clearError;
    $scope.showError = showError;
    $scope.clearMessage = clearMessage;
    $scope.showMessage = showMessage;
    $scope.resetPassword = resetPassword;

    $scope.Player = Player;


  });
