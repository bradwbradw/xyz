angular.module('songApp')

  .controller('streamCtrl', function ($scope, YT_event, Stream, currentSong, $sce) {

    //initial settings
    this.width = 400;
    this.height = 280;
    this.videoid = currentSong.songData.provider_id;
    this.startSeconds= 20;
    this.playerStatus = "NOT PLAYING";

    this.YT_event = YT_event;

    this.sendControlEvent = function (ctrlEvent) {
      console.log("SENDING");
      console.log(ctrlEvent);
      $scope.$broadcast(ctrlEvent);
    };


    var playedFromStartOnce = false;

    $scope.$on(YT_event.STATUS_CHANGE, function (event, data) {
      console.log('status change!');
      console.log(event, data);
      this.yt.playerStatus = data;
/*
      if (data === 'PLAYING' && !playedFromStartOnce){
        console.log('playin for first time');
        playedFromStartOnce = true;
      }*/

    });


    Stream.currentSong = currentSong;
    $scope.Stream = Stream;

    $scope.soundcloudUrl = $sce.trustAsResourceUrl("https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"
    +Stream.currentSong.songData.provider_id+"&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true");

    $scope.bandampUrl = $sce.trustAsResourceUrl("")

  });
