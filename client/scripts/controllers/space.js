'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SpaceCtrl
 * @description
 * # SpaceCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('SpaceCtrl', function ($rootScope, $scope, $log, $state, Library, Player, Space, space, owner, viewer, contributors) {

    // default tab 'add media' should be open
    if (viewer === 'contributor' || viewer === 'owner') {
      $state.go('.add');
    }

    var expand = function (song) {
      closeExpanded('ctrl');
      song.expanded = true;
    };

    var closeExpanded = function (p) {
      $log.log('closing expanded ', p);

      _.each(Library.songs(), function (song) {

        if (_.isUndefined(song.justDropped) && song.justDropped !== true) {
          song.expanded = false;
          Player.stop();
        } else {
          $log.log(' not closing ', song);
        }
      });
    };

    var queueIfNotDragging = function (item) {
      if (item.justDropped) {
        return false;
      } else {
        Player.queue(item);
      }
      item.justDropped = false;

    };
    var isExpanded = function (song) {
      if (song.justDropped) {
        return false;
      }
      return song.expanded && !song.dragging;
    };

    var showControlsView = function (song) {
      return song.expanded;
    };

    var mouseleave = function (song) {
      $log.log('mouseleave');
      song.hovering = false;

    };

    var mouseup = function (song) {
      $log.log('mouseup');

    };

    var setFirstSong = function (id) {/*
      Space.update({
          where: {
            id: space.id
          }
        },
        {
          firstSong: id
        }).$promise
        .then(function(result){
          $log.log('result ', result);
        })
        .catch(function(err){
          $log.error(err);
        })*/

      space.firstSong = id;
      space.$save()
        .then(function(){
          Library.fetchSpaceAndSongs(space.id)
            .then(Library.space)
            .then(function(space){
              $scope.space = space;
            })

        });
    };

    var isFirstSong = function (song) {

      return song.id === space.firstSong;

    };

    var openSidebar = function () {
      $rootScope.$emit('open-search');
    };

    $scope.isFirstSong = isFirstSong;
    $scope.setFirstSong = setFirstSong;
    $scope.queueIfNotDragging = queueIfNotDragging;
    $scope.Player = Player;
    $scope.showControlsView = showControlsView;
    $scope.mouseup = mouseup;
    $scope.mouseleave = mouseleave;
    $scope.isExpanded = isExpanded;
    $scope.expand = expand;
    $scope.Library = Library;
    $scope.closeExpanded = closeExpanded;
    $scope.openSidebar = openSidebar;
    $scope.contributors = contributors;

    $scope.space = space;
    $scope.owner = owner;
    $scope.viewer = viewer;

    $scope.bgImage = function(url){
      return 'url('+url+')';
    }


  });
