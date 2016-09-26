'use strict';

angular.module('xyzApp')
  .controller('HeadCtrl', function ($scope, Playlister) {

    var title = function(){
      if(Playlister.getNowPlaying()){
        return "XYZ | " + Playlister.getNowPlaying().title;
      } else {
        return "XYZ";
      }
    };
  $scope.title = title;

  });