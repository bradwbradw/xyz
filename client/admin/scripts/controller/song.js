
  angular.module('songApp')

    .controller('songTableCtrl', function ($scope, Songs, songs) {

    var newSong =  {active:true};

    Songs.songs = songs;

    $scope.newSong = newSong;
    $scope.Songs = Songs;

  });
