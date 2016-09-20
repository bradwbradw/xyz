'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SpaceCtrl
 * @description
 * # SpaceCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('SpaceCtrl', function ($rootScope, $scope, $log, $state, Server, Library, Player, Playlister, Space, space, owner, viewer, contributors) {

      // default tab 'add media' should be open
      if (viewer === 'contributor' || viewer === 'owner') {
        $state.go('.add');
      }
      var expanded;

      var dotRadius = 30;

      Playlister.recompute(space);
      var expand = function (song) {
        expanded = song.id;
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


      var mouseleave = function (song) {
        $log.log('mouseleave');
        song.hovering = false;

      };

      var mouseup = function (song) {
        $log.log('mouseup');

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

      var isFirstSong = function (song) {

        return song.id === space.firstSong;

      };

      var openSidebar = function () {
        $rootScope.$emit('open-search');
      };

      var removeSong = function (songId) {

        return Space.songs.destroyById({id: Library.space().id, fk: songId})
          .$promise
          .then(function () {
            _.remove(space.songs, {id: songId});
          })
          .catch(function (err) {
            return $q.reject(err);
          })
          .finally(updateView);
      };

      var expandedItem = function () {
        if (!expanded || !space.songs) {
          return false;
        } else {
          $log.debug(_.find(space.songs, {id: expanded}).title);
          return _.find(space.songs, {id: expanded});
        }
      };

      var songExpandedPopupCss = function () {
        var item = expandedItem();
        return {
          position: 'absolute',
          top: item.y + 'px',
          left: item.x + 40 + 'px'
        };
      };

      $scope.handleDotClick = handleDotClick;
      $scope.isFirstSong = isFirstSong;
      $scope.setFirstSong = setFirstSong;
      $scope.removeSong = removeSong;
      $scope.Player = Player;
      $scope.mouseup = mouseup;
      $scope.mouseleave = mouseleave;
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

      $scope.dotRadius = dotRadius;

      $scope.getX = function (item) {
        $log.log('get x controller', item.x);
        return item.x;
      };
      $scope.getY = function (item) {
        return item.y;
      };

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
