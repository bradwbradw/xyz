'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:LandingCtrl
 * @description
 * # LandingCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('LandingCtrl', function ($rootScope, $scope, $q, $timeout, $log, ngToast, Dj, User, Server, Space, publicSpaces, Player, Social, Utility) {

    Social.FB.refreshFB();

    $scope.Dj = Dj;

    $scope.User = User;

    $scope.publicSpaces = publicSpaces;

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

    var userIsCollaborator = function (space) {
      return space.userIsContributor;
    };

    $scope.userIsCollaborator = userIsCollaborator;
    $scope.isAdding = isAdding;
    $scope.setAdding = setAdding;
    $scope.addingSpace = addingSpace;
    $scope.resetAdding = resetAdding;

    $scope.Player = Player;


  });
