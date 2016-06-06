'use strict';

/**
 * @ngdoc service
 * @name xyzApp.Player
 * @description
 * # Player
 * Service in the xyzApp.
 */
angular.module('xyzApp')
  .service('Player', function () {

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
          return false;
        }
      },
      playingItem: function(){
        if (Player.current) {
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
      show: function(item){
        Player.current = item;
      },
      //^^^^ Above were here just for sidebar media player
      // \/\/\/ below are now as of introducing site-wide player

      playingSpaceId: false,

      playSpace: function(spaceId){
        Player.playingSpaceId = spaceId;
      },

      getPlayingSpaceId: function(){
        return Player.playingSpaceId;
      }

    };

    return Player;
  });
