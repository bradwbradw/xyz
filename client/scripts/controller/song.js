
  angular.module('songApp')

    .controller('songTableCtrl', function ($scope, Songs, songs) {

    var newSong =  {active:true};
    var error = '';

      $scope.showError = function(error){
        $scope.error = error;
      };
    Songs.songs = songs;

      $scope.error = error;
    $scope.newSong = newSong;
    $scope.Songs = Songs;


  });
