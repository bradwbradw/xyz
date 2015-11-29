'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SpaceCtrl
 * @description
 * # SpaceCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('SpaceCtrl', function ($scope, Library, $log) {

    var expand = function(song){
      closeExpanded();
      song.expanded = true;
    };

    var closeExpanded = function(){
      $log.log('closing expanded');

      _.each(Library.songs,function(song){
        song.expanded = false;
      });
    };

    var showExpandedView = function(song){
      if (song.justDropped){
        return false;
      }
      return song.hovering || (song.expanded && !song.dragging);
    };

    var showControlsView = function(song){
      return song.expanded;
    };

    var mouseleave = function(song){
      $log.log('mouseleave');
      song.hovering = false;
      song.justDropped = false;

    };

    var mouseup = function(song){
      song.justDropped = true;
      $log.log('mouseup');

    };

    $scope.showControlsView = showControlsView;
    $scope.mouseup = mouseup;
    $scope.mouseleave = mouseleave;
    $scope.showExpandedView = showExpandedView;
    $scope.expand = expand;
    $scope.Library = Library;
    $scope.closeExpanded = closeExpanded;

  });
