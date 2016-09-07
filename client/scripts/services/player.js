'use strict';

/**
 * @ngdoc service
 * @name xyzApp.Player
 * @description
 * # Player
 * Service in the xyzApp.
 */
angular.module('xyzApp')
  .service('Player', function ($log) {

    var Player = {
      current: false,
      status:{
        autoplay: true,
        startFrom: 0
      },
      playingAttrs: function () {
        return Player.current;
      },
      playingItem: function(){
        if (Player.current) {
          $log.log('playing item is ', Player.current);
          return Player.current;

        } else {
          return false;
        }
      },
      queue: function(item){
        Player.status.autoplay = false;
        Player.current = item;

      },
      play: function (item) {
        Player.current = item;
      },
      stop: function(){
        $log.debug('stop player');
        Player.current = false;
      },
      show: function(item){
        Player.current = item;
      },
      isPlaying: function(id){
        return Player.playingAttrs().provider_id === id;
      }


    };

    return Player;
  });
