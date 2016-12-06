"use strict";

angular.module("xyzPlayer")
  .directive('soundcloud', function ($sce, $log, $window, $timeout, SC_event, Playlister /*, soundCloudApiService*/) {

    return {

      restrict: "A",

      scope: {
        soundid: "@",
        startSeconds: "@"
      },
      template:
      '<iframe ng-show="showWidget()" id="xyz-soundcloud-iframe" ' +
      'src=\'https://w.soundcloud.com/player/?url=\'>' +
      '</iframe>',

      link: function (scope) { //jshint ignore:line

        /*
         var iframeSrc = 'https://w.soundcloud.com/player/?url=' +
         'https%3A//api.soundcloud.com/tracks/' + soundcloudId +
         '&amp;auto_play=false' +
         '&amp;hide_related=true' +
         '&amp;show_comments=true' +
         '&amp;show_user=true' +
         '&amp;show_reposts=false' +
         '&amp;visual=true';
         iframeSrc = $sce.trustAsResourceUrl(iframeSrc);*/

        /*
         var tag = document.createElement('script');
         tag.src = "https://w.soundcloud.com/player/api.js";
         var firstScriptTag = document.getElementsByTagName('script')[0];
         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
         */

        var SC = $window.SC;

        var widget = $window.SC.Widget('xyz-soundcloud-iframe');

        widget.bind(SC.Widget.Events.READY, function () {
//          $log.log('SC widget is now Ready');

          scope.$emit('soundcloud_is_ready');

          widget.bind(SC.Widget.Events.PLAY, function () {
            widget.getCurrentSound(function (sound) {
              $log.log('SC Widget got PLAY. is playing: ', sound.title);
            });
          });
          widget.bind(SC.Widget.Events.FINISH, function () {
            $log.log('SC Widget is Finished');
            scope.$emit('soundcloud_has_ended');
          });


          scope.$on(SC_event.PAUSE, function () {
            widget.pause();
          });

          scope.$on(SC_event.STOP, function () {
            widget.seekTo(0);
            widget.pause();
          });

          scope.$on(SC_event.PLAY, function () {
            widget.play();
          });

        });

//        $log.log('SC widget is ', widget);

        var soundCloudUrl = function (id) {
          return 'https://api.soundcloud.com/tracks/' + id + '?visual=true';
        };

        // double to make sure current song still matches scope id
        // because maybe user is clicking 'next' rapidly
        var stillShouldPlay = function () {
          var nowPlayingProviderId = _.get(Playlister.getNowPlaying(), 'provider_id');
          return nowPlayingProviderId === scope.soundid
        };

        scope.showWidget = function(){
          return stillShouldPlay();
        };

        scope.$watch('soundid', function (newValue, oldValue) {
          if (!newValue || (newValue === oldValue)) {
            return;
          }

          var newUrl = soundCloudUrl(scope.soundid);
          // NOTE - can also do an artist for the url, might want to load actual url from xyz item
          $log.debug('soundcloud watch hit: (' + scope.soundid + ') new url is ', newUrl);
          var options = {
            callback: function () {
              $log.debug('ok the sound id is ', scope.soundid);

              if (stillShouldPlay()) {
                widget.play();
              }
            }
          };

          if (stillShouldPlay()) {
            widget.load(newUrl, options);
          }

        });


      }
    }
  });
