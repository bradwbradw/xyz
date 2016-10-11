'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SpaceCtrl
 * @description
 * # SpaceCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('SpaceCtrl', function ($rootScope, $timeout, $scope, $log, $state, $window, Server, Library, Player, Playlister, Space, space, owner, viewer, contributors, layout_constants) {

      var expanded;

      var computeViewBox = function () {
        return _.values(layout_constants.SPACE_DIMENSIONS).join(" ");
      };

      Playlister.recompute(space);

      var expand = function (song) {
        $timeout(function () {
          expanded = song.id;
        });
      };


      var handleDotClick = function (item, event) {

        if (item.justDropped) {
          // do nothing
          item.justDropped = false;
        } else {
          if (isExpanded(item)) {
            // also do nothing
          } else {
            closeExpanded();
            expand(item);
          }
        }

        if (event.stopPropagation) event.stopPropagation();
        if (event.preventDefault) event.preventDefault();
        event.cancelBubble = true;
        event.returnValue = false;
      };

      var closeExpanded = function (source) {

        $log.log('closing expanded ', source);
        expanded = null;
        Player.stop();
      };

      var isExpanded = function (song) {
        return expanded === song.id;
      };

      var setFirstSong = function (song) {

        Server.updateSpace(space.id, {firstSong: song.id, pic: song.pic})
          .then(function (space) {
            $scope.space.firstSong = song.id;

            Playlister.recompute($scope.space);
            $log.debug('result is ', space);
          })
          .catch(function (err) {
            $log.error(err);
          })
      };

      var isNowPlaying = function (song) {
        return song.id === _.get(Playlister.getNowPlaying(), 'id');
      };
      var isFirstSong = function (song) {
        return song.id === space.firstSong;
      };

      var openSidebar = function () {
        $rootScope.$emit('open-search');
      };

      var removeSong = function (songId) {

        if ($window.confirm('remove this song from the space?')) {

          return Space.songs.destroyById({id: Library.space().id, fk: songId})
            .$promise
            .then(function () {
              _.remove(space.songs, {id: songId});
              closeExpanded('removed a song');
              Playlister.recompute(space);
            })
            .catch(function (err) {
              return $q.reject(err);
            });
        }

      };

      var expandedItem = function () {
        if (!expanded || !space.songs) {
          return false;
        } else {
          $log.debug('expanded item is ', _.find(space.songs, {id: expanded}).title);
          return _.find(space.songs, {id: expanded});
        }
      };

      var songExpandedPopupCss = function () {
        var item = expandedItem();

        var topOffset = item.y +
          layout_constants.SPACE_MARGIN.LEFT +
          layout_constants.DOT_RADIUS +
          'px';

        var leftOffset = item.x +
          layout_constants.SPACE_MARGIN.TOP +
          layout_constants.DOT_RADIUS +
          'px';

        return {
          position: 'absolute',
          top: topOffset,
          left: leftOffset
        };
      };

      var onDragDone = function (item) {
        $log.debug('done draggging!', item);

        item.justDropped = true;

        if (canEdit()) {
          Library.update(item.id, item);
        }
        Playlister.recompute(Library.currentSpace);
      };

      var canEdit = function () {
        return viewer === 'owner' || viewer === 'contributor';
      };

      $scope.canEdit = canEdit;
      $scope.onDragDone = onDragDone;
      $scope.handleDotClick = handleDotClick;
      $scope.isNowPlaying = isNowPlaying;
      $scope.isFirstSong = isFirstSong;
      $scope.setFirstSong = setFirstSong;
      $scope.removeSong = removeSong;
      $scope.Player = Player;
      $scope.isExpanded = isExpanded;
      $scope.expandedItem = expandedItem;
      $scope.expand = expand;
      $scope.Library = Library;
      $scope.closeExpanded = closeExpanded;
      $scope.openSidebar = openSidebar;
      $scope.contributors = contributors;

      $scope.space = space;
      $scope.owner = owner;
      $scope.viewer = viewer;

      $scope.computeViewBox = computeViewBox;

      $scope.layout_constants = layout_constants;

      $scope.linePath = function (dirtypoints) {

        var points = _.filter(dirtypoints, function (p) {
          return p.x && p.y;
        });
        var pathParts = [], currentPoint, i;

        for (i = 0; i < points.length; i++) {
          currentPoint = points[i];
          pathParts.push(currentPoint.x + "," + currentPoint.y);
        }


        return "M" + pathParts.join(" L");
      };

      $scope.songExpandedPopupCss = songExpandedPopupCss;

    }
  );
