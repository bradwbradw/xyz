'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SpaceCtrl
 * @description
 * # SpaceCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('SpaceCtrl', function ($rootScope, $scope, $log, $state, Server, Library, Player, Space, space, owner, viewer, contributors) {

    // default tab 'add media' should be open
    if (viewer === 'contributor' || viewer === 'owner') {
      $state.go('.add');
    }
    var expanded;

    var expand = function (song) {
      expanded = song.id;
//      closeExpanded('ctrl');
//      song.expanded = true;
    };


    var handleDotClick = function (item) {
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
    };

    var closeExpanded = function (source) {
      $log.log('closing expanded ', source);
      expanded = null;
      Player.stop();
      /*
       _.each(Library.songs(), function (song) {

       if (song.justDropped === true) {
       $log.log(' not closing ', song);
       } else {
       $log.log(' closing ', song);
       song.expanded = false;
       Player.stop();
       }
       });*/
    };

    var isExpanded = function (song) {/*
     if (song.justDropped) {
     return false;
     }*/
      return expanded === song.id;
    };


    var mouseleave = function (song) {
      $log.log('mouseleave');
      song.hovering = false;

    };

    var mouseup = function (song) {
      $log.log('mouseup');

    };

    var setFirstSong = function (id) {

      Server.updateSpace(space.id, {firstSong:id})
        .then(function (space) {
          $scope.space.firstSong = id;
          $log.debug('result is ', space);
        })
        .catch(function(err){
          $log.error(err);
        })
    };

    var isFirstSong = function (song) {

      return song.id === space.firstSong;

    };

    var openSidebar = function () {
      $rootScope.$emit('open-search');
    };

    var removeSong = function(songId){

        return Space.songs.destroyById({id: Library.space().id, fk: songId} )
          .$promise
          .then(function(){
            _.remove(space.songs, {id:songId});
          })
          .catch(function (err) {
            return $q.reject(err);
          })
          .finally(updateView);
    };

    $scope.handleDotClick = handleDotClick;
    $scope.isFirstSong = isFirstSong;
    $scope.setFirstSong = setFirstSong;
    $scope.removeSong = removeSong;
    $scope.Player = Player;
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

    $scope.bgImage = function (url) {
      return 'url(' + url + ')';
    }


  });
