'use strict';

angular.module('xyzApp')
  .controller('BodyCtrl', function ($rootScope, $window, $scope, $log, $timeout, $stateParams, $state, localStorageService, Utility, UserSettings, Playlister, Spaces) {

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

      Playlister.resetAllIfOneDidPlay(space, itemId);
      Playlister.recompute(space, itemId)
        .then(function () {
          $rootScope.$broadcast('play', {space: space, itemId: itemId});
          playingSpace = space;
        });
    };

    var getPlayingSpace = function () {
      return playingSpace;
    };

    var currentSpaceIsPlaying = function () {
      return _.get(getPlayingSpace(), 'id') === _.get(Spaces.current(), 'id');
    };

    var onMainClick = function(event){
      $log.debug('main click', event);
      $rootScope.$broadcast('close popups');
    };

    $rootScope.updateBackground = function () {
      $scope.gradientClass = _.get(UserSettings.get('gradient'), 'class');
    };

    var shouldMakeRoomForSidebar = function(){
      return $state.is('base.space.add');
    };

    $rootScope.updateBackground();

    $scope.shouldMakeRoomForSidebar = shouldMakeRoomForSidebar;
    $scope.onMainClick = onMainClick;
    $scope.playSpace = playSpace;
    $scope.getPlayingSpace = getPlayingSpace;
    $scope.currentSpaceIsPlaying = currentSpaceIsPlaying;
    $rootScope.getPlayingSpace = getPlayingSpace;
    $scope.Playlister = Playlister;
    $scope.Utility = Utility;
    $scope.UserSettings = UserSettings;

    $rootScope.showError = function (thing) {
      $rootScope.error = Utility.cleanError(thing);
    };

  });

//askConfirm