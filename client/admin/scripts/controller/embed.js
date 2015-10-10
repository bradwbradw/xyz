angular.module('songApp')

  .controller('embedTesterCtrl', function ($scope, Player) {


    var onYouTubeIframeAPIReady = function () {
      Player.yt.player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'M7lc1UVf-VE',
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    };


    $scope.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

    $scope.Player = Player;
    $scope.play = Player.yt.player.playVideo;

  });
