'use strict';

angular.module('xyzApp')
  .controller('BodyCtrl', function ($rootScope, $window, $scope, $log, $timeout, $stateParams, localStorageService, Utility, Playlister) {

    $rootScope.askConfirm = function (callback, thing, error) {
      if ($window.confirm) {
        callback(thing).then(error);
      }
    };
    $rootScope.debug = !_.isNull(localStorageService.get('d'));

    var playingSpace;
    var playSpace = function (space, itemId) {

      if (!itemId) {
        itemId = _.get(space, 'firstSong');
      }
      Playlister.recompute(space, itemId)
        .then(function () {
          $rootScope.$broadcast('play', {space: space, itemId: itemId});
          playingSpace = space;
        });

    };

    var getPlayingSpace = function () {
      return playingSpace;
    };

    $scope.playSpace = playSpace;
    $scope.getPlayingSpace = getPlayingSpace;
    $rootScope.getPlayingSpace = getPlayingSpace;
    $scope.Playlister = Playlister;
    $scope.Utility = Utility;

    $rootScope.showError = function (thing) {
      $rootScope.error = Utility.cleanError(thing);
    };

  });

//askConfirm