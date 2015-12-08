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
    // AngularJS will instantiate a singleton by calling "new" on this function
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
        Player.current = item;
        } else {
          Player.current = {
            saveable:true,
            attrs:item
          }
        }

      },
      show: function(item){
        Player.current = item;
      }
    };

    return Player;
  });
