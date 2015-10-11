
  angular.module('songApp')

    .controller('songTableCtrl', function ($scope, Songs, songs) {

    var newSong =  {};

    Songs.songs = songs;

    $scope.newSong = newSong;
    $scope.Songs = Songs;

  });
