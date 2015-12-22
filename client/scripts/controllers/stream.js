"use strict";

angular.module('xyzApp')

  .controller('streamCtrl', function ($scope, $interval, YT_event, Stream, playlist, Server, Utility) {
    //initial settings
    //borrowed from http://plnkr.co/edit/8lxuN8?p=info
/*

    this.videoid = playlist[0].provider_id;
    this.startSeconds= 20;
    this.playerStatus = "NOT PLAYING";

    this.YT_event = YT_event;

    this.sendControlEvent = function (ctrlEvent) {
      console.log("SENDING");
      console.log(ctrlEvent);
      $scope.$broadcast(ctrlEvent);
    };

    $scope.$on(YT_event.STATUS_CHANGE, function (event, data) {
      console.log('status change!');
      console.log(event, data);
//      this.yt.playerStatus = data;
*/
/*
      if (data === 'PLAYING' && !playedFromStartOnce){
        console.log('playin for first time');
        playedFromStartOnce = true;
      }*//*


    });
*/
    var playerOptions = {
      autoplay:true,
      startFrom:false
    };

    if(!playerOptions.startFrom){
    Stream.getPlayhead()
      .then(function(playhead){
        playerOptions.startFrom = playhead;
      })

    }

    $scope.iFrameUrl = Utility.iFrameUrl;
    $scope.playerOptions = playerOptions;

    $scope.Server = Server;
    $scope.playlist = Stream.playlist;

    var updateScopePlaylist = function() {
      Stream.reloadPlaylist().then(
        function (playlist) {
          $scope.playlist = playlist;
        });
    };



    $interval(updateScopePlaylist, 5000);

  });
