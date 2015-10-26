
  angular.module('xyzApp')

    .controller('songTableCtrl', function ($scope, Library, songs) {

    var newSong =  {active:true};
    var error = '';

      $scope.showError = function(error){
        $scope.error = error;
      };
    Library.songs = songs;

      $scope.error = error;
    $scope.newSong = newSong;
    $scope.Library = Library;


  });
