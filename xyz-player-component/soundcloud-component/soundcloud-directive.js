"use strict";

angular.module("xyzPlayer")
  .directive('soundcloud', function ($sce, $log, $window, $timeout, SC_event /*, soundCloudApiService*/) {

    return {

      restrict: "A",

      scope: {
        soundid: "@",
        startSeconds: "@"
      },
      template: '<div> <iframe id="xyz-soundcloud-iframe" src=\'https://w.soundcloud.com/player/?url=https://soundcloud.com/smilebandsmile/holiday\'></iframe></div>',


      link: function (scope, element, attrs, $rootScope) { //jshint ignore:line

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

        console.log('linking soundcloud directive');


        /*
         var tag = document.createElement('script');
         tag.src = "https://w.soundcloud.com/player/api.js";
         var firstScriptTag = document.getElementsByTagName('script')[0];
         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
         */

        var SC = $window.SC;

        var widget = $window.SC.Widget('xyz-soundcloud-iframe');

        widget.bind(SC.Widget.Events.READY, function () {
          console.log('SC widget is now Ready');

          scope.$emit('soundcloud_is_ready');

          widget.bind(SC.Widget.Events.PLAY, function () {
            widget.getCurrentSound(function (sound) {
              console.log('SC Widget is playing: ', sound.title);
            });
          });
          widget.bind(SC.Widget.Events.FINISH, function () {
            console.log('SC Widget is Finished');
            scope.$emit('soundcloud_has_ended');
          });


          scope.$on(SC_event.PAUSE, function () {
            widget.pause();
          });

          scope.$on(SC_event.PLAY, function () {
            widget.play();
          });

        });

        console.log('SC widget is ', widget);

        scope.$watch('soundid', function (newValue, oldValue) {
          if (!newValue || (newValue === oldValue)) {
            return;
          }
          console.log('soundId watch hit, value is ', newValue);

          var newUrl = 'https://api.soundcloud.com/tracks/' + scope.soundid; // NOTE - can also do an artist for the url, might want to load actual url from xyz item
          console.log('soundcloud new url is ', newUrl);
          var options = {
            callback: function (thing) {
              console.log('ok the song is ready to play ', thing);
              widget.play();
            }
          };
          widget.load(newUrl, options);

        });


      }
    }
  });
