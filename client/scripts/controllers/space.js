'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SpaceCtrl
 * @description
 * # SpaceCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
  .controller('SpaceCtrl', function ($scope, Library) {

    var expand = function(song){
      _.each(Library.songs,function(song){
        song.expanded = false;
      });
      song.expanded = true;
    };
    $scope.expand = expand;
    $scope.Library = Library;

  });
