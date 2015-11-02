"use strict";

angular.module('xyzApp')

  .controller('listCtrl', function ($scope, Library, songs, Extract) {

    var newSong = {active: true};
    var error = '';

    $scope.showError = function (error) {
      $scope.error = error;
    };
    Library.songs = songs;

    $scope.error = error;
    $scope.newSong = newSong;
    $scope.Library = Library;
    $scope.Extract = Extract;


  });
