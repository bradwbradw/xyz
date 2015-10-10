
  angular.module('songApp')

    .controller('songListCtrl', function ($scope, Songs, songs) {

    var newSong;

    var clearNewSong = function () {
      newSong = {
        name: '',
        url: ''
      };

      newSong =
      {name: 'new song', length: 420, mixPosition: 0, url: 'https:/url.com'};
    };

    clearNewSong();

    Songs.songs = songs;


    $scope.clearNewSong = clearNewSong;
    $scope.newSong = newSong;
    $scope.Songs = Songs;

  });
