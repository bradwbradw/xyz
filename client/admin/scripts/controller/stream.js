angular.module('songApp')

  .controller('streamCtrl', function ($scope, YT_event, Stream, currentSong) {

    //initial settings
    this.width = 400;
    this.height = 480;
    this.videoid = currentSong.songData.provider_id;
    this.startSeconds= 20;
    this.playerStatus = "NOT PLAYING";

    this.YT_event = YT_event;

    this.sendControlEvent = function (ctrlEvent) {
      console.log("SENDING");
      console.log(ctrlEvent);
      $scope.$broadcast(ctrlEvent);
    };

    $scope.$on(YT_event.STATUS_CHANGE, function (event, data) {
      this.yt.playerStatus = data;
    });

    Stream.currentSong = currentSong;
    $scope.Stream = Stream;

  });
