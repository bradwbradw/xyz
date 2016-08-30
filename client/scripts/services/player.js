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
        autoplay: false,
        startFrom: 0
      },
      playingAttrs: function () {
        if (Player.current && Player.current.attrs) {
          return Player.current.attrs;
        } else {
          return Player.current;
        }
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
        Player.status.autoplay = true;
        if(item.id){
          // the item is already saved (playing from library)
        Player.current = item;
        } else {
          // the item is being previewed (not yet saved)
          Player.current = {
            saveable:true,
            attrs:item
          }
        }
      },
      stop: function(){
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
