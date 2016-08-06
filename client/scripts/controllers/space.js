'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SpaceCtrl
 * @description
 * # SpaceCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('SpaceCtrl', function ($rootScope, $scope, $log, $state, Library, Player, space, owner, viewer, contributors) {

    // default tab 'add media' should be open
    if(viewer === 'contributor' || viewer === 'owner'){
      $state.go('.add');
    }


    var expand = function (song) {
      closeExpanded();
      song.expanded = true;
    };

    var closeExpanded = function () {
      $log.log('closing expanded');

      _.each(Library.songs, function (song) {
        song.expanded = false;
      });
    };

    var queueIfNotDragging = function(item){
      if (item.justDropped) {
        return false;
      } else {
        Player.queue(item);
      }

        item.justDropped = false;

    };
    var showExpandedView = function (song) {
      if (song.justDropped) {
        return false;
      }
      return song.hovering || (song.expanded && !song.dragging);
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


    var openSidebar = function(){
      $rootScope.$emit('open-search');
    };

    $scope.queueIfNotDragging = queueIfNotDragging;
    $scope.Player = Player;
    $scope.showControlsView = showControlsView;
    $scope.mouseup = mouseup;
    $scope.mouseleave = mouseleave;
    $scope.showExpandedView = showExpandedView;
    $scope.expand = expand;
    $scope.Library = Library;
    $scope.closeExpanded = closeExpanded;
    $scope.openSidebar = openSidebar;
    $scope.contributors = contributors;

    $scope.space = space;
    $scope.owner = owner;
    $scope.viewer = viewer;


  });
