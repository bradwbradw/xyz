'use strict';

angular.module('xyzApp')
  .controller('BodyCtrl', function ($rootScope, $window, $scope, $log, $stateParams, localStorageService, Utility, Playlister) {

    $rootScope.askConfirm = function (callback, thing, error) {
      if ($window.confirm) {
        callback(thing).then(error);
      }
    };
    $rootScope.debug = !_.isNull(localStorageService.get('d'));

    var playingSpace;
    var playSpace = function (space) {
      Playlister.recompute(space);
      playingSpace = space;
    };

    var getPlayingSpace = function () {
      return playingSpace;
    };

    $scope.playSpace = playSpace;
    $scope.getPlayingSpace = getPlayingSpace;
    $scope.Playlister = Playlister;
    $scope.Utility = Utility;

    $rootScope.showError = function (thing) {
      $rootScope.error = Utility.cleanError(thing);
    }
  });

//askConfirm