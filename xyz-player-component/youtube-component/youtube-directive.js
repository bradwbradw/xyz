"use strict";

angular.module("xyzPlayer")
  .directive('youtube', function ($log, $window, $q, YT_event, youTubeApiService) {

    // from http://plnkr.co/edit/8lxuN8?p=info
    return {
      restrict: "A",

      scope: {
        height: "@",
        width: "@",
        videoid: "@",
        startSeconds: "@"
      },

      template: '<div></div>',

      link: function (scope, element, attrs, $rootScope) { //jshint ignore:line

        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var player;

        youTubeApiService.apiReady
          .then(function () {
            return setupPlayer(scope, element);
          })/*
          .then(function(){
            return youTubeApiService.playerReady;
          })*/
          .then(function (p) {
            player = p;

            if (player && _.isFunction(player.loadVideoById)) {
              console.warn('emitting youtube_is_ready');
              scope.$emit('youtube_is_ready');
            }
            else {
              console.error('player does not have loadVideoById function!');
            }
          });


        var setupPlayer = function (scope, element) {
          console.log('YT player element children 0 ', element.children()[0]);

          var deferred = $q.defer();

          var Player = new YT.Player(element.children()[0], { //jshint ignore:line
            playerVars: {
              autoplay: 1,
              html5: 1,
              theme: "light",
              modesbranding: 0,
              color: "white",
              iv_load_policy: 3,
              showinfo: 1,
              controls: 1,
            },

            height: scope.height,
            width: scope.width,
            videoId: scope.videoid,

            events: {
              'onReady': function(event){
                console.log('Player ready');
                deferred.resolve(Player);

              },
              'onStateChange': function (event) {

                var message = {
                  event: YT_event.STATUS_CHANGE,
                  data: ""
                };

                switch (event.data) {
                  case YT.PlayerState.PLAYING: //jshint ignore:line
                    message.data = "PLAYING";
                    break;
                  case YT.PlayerState.ENDED: //jshint ignore:line
                    message.data = "ENDED";
                    break;
                  case YT.PlayerState.UNSTARTED: //jshint ignore:line
                    message.data = "NOT PLAYING";
                    break;
                  case YT.PlayerState.PAUSED: //jshint ignore:line
                    message.data = "PAUSED";
                    break;
                }

                if (message.data === 'ENDED') {
                  $log.debug('emitting youtube_has_ended');
                  scope.$emit('youtube_has_ended');
                }

                scope.$apply(function () {
                  console.log('emitting message from youtube directive:', message);
                  scope.$emit(message.event, message.data);
                });
              }
            }
          });
          return deferred.promise;
        }

        scope.$watch('height + width', function (newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }

          player.setSize(scope.width, scope.height);

        });

        scope.$watch('videoid', function (newValue, oldValue) {
          if (!newValue || (newValue === oldValue)) {
            return;
          }
          console.log('videoid watch hit. value is ', newValue);

          if (player && player.loadVideoById) {
            player.loadVideoById(scope.videoid);
          } else {
            throw new Error('big problem - youtube player has no loadVideoById function');
          }

        });


        scope.$on(YT_event.STOP, function () {
          player.seekTo(0);
          player.stopVideo();
        });

        scope.$on(YT_event.PLAY, function () {
          console.log("playin video");
          player.playVideo();
        });

        scope.$on(YT_event.PAUSE, function () {
          player.pauseVideo();
        });

        scope.$on('jump', function () {
          console.log('jumpin');
        });

      }
    };
  });
