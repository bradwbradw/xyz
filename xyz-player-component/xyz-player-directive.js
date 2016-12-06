"use strict";
angular.module('xyzPlayer', [])
  .directive('xyzPlayer',
    function ($log,
              $q,
              $timeout,
              $interval,
              $location,
              $rootScope,
              Api,
              MockMediaProvider,
              Playlister,
              UserSettings,
              youTubeApiService,
              YT_event,
              SC_event) {
      return {
        restrict: "A",
        scope: {
          playlist: '<?',
          spaceName: '='
        },
        templateUrl: 'xyz-player.html',
        link: function (scope, element, attrs) { //jshint ignore:line

          scope.soundcloudId = 76067623;
          var mediaProviders = {
            youtube: {
              loading: $q.defer(),
              cueAndPlay: function (provider_id) {
                scope.youtubeId = '';
                return $timeout(function () {
                  scope.youtubeId = provider_id;
                  return true;
                });
              }
            }, soundcloud: {
              loading: $q.defer()
            }, bandcamp: {
              loading: $q.defer()
            }, mock: {
              loading: $q.defer()
            }
          };

          var defaultProviderFunctions = {
            play: {}, pause: {}, volume: {}
          };

          var providerInitFunctions = {
            mock: function () {
              $log.debug('xyzPlayer sees MockMediaProvider');
              mediaProviders.mock.play = MockMediaProvider.play;
              mediaProviders.mock.pause = MockMediaProvider.pause;
              mediaProviders.mock.cueAndPlay = function (provider_id) {

                return MockMediaProvider.loadSong(provider_id)
                  .then(MockMediaProvider.play);

              };
              mediaProviders.mock.onSongDone = MockMediaProvider.onSongDone;
              mediaProviders.mock.loading.resolve();

              $rootScope.$on('mock_song_done', function () {
                $log.debug('mock song has ended, calling go() again');
                go();
              });

            }, youtube: function () {

              mediaProviders.youtube.pause = function () {
                $log.debug('tryin to pause');
                $rootScope.$broadcast(YT_event.PAUSE);
              };
              mediaProviders.youtube.play = function () {
                $log.debug('tryin to play');
                $rootScope.$broadcast(YT_event.PLAY);
              };
              mediaProviders.youtube.stop = function () {
                $log.debug('tryin to stop');
                $rootScope.$broadcast(YT_event.STOP);
              };

              mediaProviders.youtube.loading.resolve('youtube!');

              $rootScope.$on('youtube_has_ended', function () {
                $log.debug('youtube has ended, calling go() again');
                go();
              });

            }, soundcloud: function () {
              mediaProviders.soundcloud.pause = function () {
                $rootScope.$broadcast(SC_event.PAUSE);
                return $q.resolve(true);
              };

              mediaProviders.soundcloud.play = function () {
                $log.debug('tryin to play');
                $rootScope.$broadcast(SC_event.PLAY);
              };

              mediaProviders.soundcloud.stop = function () {
                $log.debug('tryin to stop');
                $rootScope.$broadcast(SC_event.STOP);
              };
              mediaProviders.soundcloud.cueAndPlay = function (provider_id) {
                scope.soundId = '';
                return $timeout(function () {
                  scope.soundId = provider_id;
                  return true;
                });
              };


              $rootScope.$on('soundcloud_has_ended', function () {
                $log.debug('soundcloud has ended, calling go() again');
                go();
              });


              mediaProviders.soundcloud.loading.resolve('soundcloud!');
            }
          };

          _.each(mediaProviders, function (provider, index) {
            _.extend(mediaProviders[index], defaultProviderFunctions);
          });

          MockMediaProvider.onReady(function () {
            $log.debug('mock media provider onready');
            providerInitFunctions.mock();
          });

          $rootScope.$on('youtube_is_ready', function () {
            $log.debug('youtube provider onready');
            providerInitFunctions.youtube();

          });
          $rootScope.$on('soundcloud_is_ready', function () {
            $log.debug('soundcloud provider onready');
            providerInitFunctions.soundcloud();

          });

          $timeout(function () {
            // todo - code in bandcamp loading (faked)
            mediaProviders.bandcamp.loading.resolve('bandcamp!');
          }, 300);

          var serviceProvidersLoaded = $q.all(
            [
              mediaProviders.youtube.loading.promise,
              mediaProviders.soundcloud.loading.promise,
              mediaProviders.bandcamp.loading.promise,
              mediaProviders.mock.loading.promise
            ]);

          var loadPlaylist = function (spaceId) {
            if (getPlaylist()) {
              return $q.resolve(getPlaylist());
            } else {
              $log.debug('no playlist found in scope, so loading using space ID ', spaceId);
            }
            return Api.getPlaylist(spaceId);
          };

          var status = 'initializing';
          var playlist = false;
          var space = false;

          var getPlaylist = function () {
            return Playlister.getList(scope.spaceId);
          };

          var play = function () {
            console.debug('play button clicked, so will play ', Playlister.getNowPlaying().provider);
            mediaProviders[Playlister.getNowPlaying().provider].play();
          };

          var pause = function () {
            mediaProviders[Playlister.getNowPlaying().provider].pause();
          };

          var next = function () {
//            mediaProviders[Playlister.getNowPlaying().provider].stop();
            stopAll();
            go();
          };

          var stopAll = function () {
            _.each(mediaProviders, function (provider) {
              if (_.isFunction(provider.stop)) {
                provider.stop();
              }
            });
          };

          var nextSong = function (songObjThatJustFinished) {
            console.debug('nextSong called: playlist is ', getPlaylist());
            if (!songObjThatJustFinished) {
              return getPlaylist()[0];
            } else {
              var indexOfSongThatJustFinished = _.indexOf(getPlaylist(), songObjThatJustFinished);
              if (_.size(getPlaylist()) === indexOfSongThatJustFinished + 1) {
                return getPlaylist()[0];
              } else {
                return getPlaylist()[indexOfSongThatJustFinished + 1];
              }
            }

          };

          var go = function (songIdToPlay) {
            var songToPlay = _.find(getPlaylist(), {id: songIdToPlay});

            if (!songToPlay) {
              songToPlay = nextSong(Playlister.getNowPlaying());
              $log.debug('go called. no song specified.  deciding to play ', songToPlay);
            } else {
              $log.debug('go called. song to play is ', songToPlay);
            }


            mediaProviders[songToPlay.provider].cueAndPlay(songToPlay.provider_id)
              .then(function () {
                Playlister.setNowPlaying(songToPlay);
              })
              .catch(function (err) {
                $log.error(err);
              });

          };


          var loadAndPlay = function (spaceId, itemId) {
            $q.all([loadPlaylist(), serviceProvidersLoaded])
              .then(function (results) {
                playlist = _.get(results[0], 'playlist', results[0]);
                scope.space = _.get(results[0], 'space', scope.space);

                // assuming auto-play, otherwise, bind go() to a button click or something
                if (_.size(playlist) > 0) {
                  go(itemId);
                  message = '';
                } else {
                  message = 'playlist has 0 songs';
                }

              });
          };

          scope.$on('play', function (event, args) {

            spaceOpen = true;
            var spaceId = _.get(args, 'space.id');
            var itemId = _.get(args, 'itemId');
            stopAll();
            if (spaceId !== '') {
              scope.spaceId = spaceId;
              loadAndPlay(spaceId, itemId);
            }
          });

          if ($location.search().playlist) {
            attrs.space = $location.search().playlist;
          }

          var message = '';
          var spaceOpen = true;

          var close = function () {
            stopAll();
            spaceOpen = false;
            Playlister.nowPlaying = false;
//            $timeout(scope.$destroy);
            // TODO: currently, destroy annihilates everything
            // but the calls to go() above keep happening.
            // should not try to play
            // (might just be from mock media though..)
          };

          var spaceIsOpen = function () {
            return spaceOpen;
          };

          var fullScreen = false;

          var isFullScreen = function () {
            return fullScreen;
          };

          var doBrowserLevelFullscreen = function () {

            var doContinue = true;
            var fullScreenFunctions = [
              'webkitRequestFullScreen',
              'mozRequestFullScreen',
              'msRequestFullscreen'];
            _.each(fullScreenFunctions, function (name) {
              if (doContinue && _.isFunction(document.documentElement[name])) {
                document.documentElement[name]();
                doContinue = false;
              }
            });
          };

          var undoBrowserLevelFullscreen = function () {

            var doContinue = true;
            var exitFullScreenFunctions = [
              'webkitExitFullscreen',
              'mozCancelFullScreen',
              'msExitFullscreen'];
            _.each(exitFullScreenFunctions, function (name) {
              if (doContinue && _.isFunction(document[name])) {
                document[name]();
                doContinue = false;
              }
            });
          };

          var toggleFullScreen = function () {
            fullScreen = !fullScreen;
            if (UserSettings.get('browser-level-fullscreen-enabled')) {
              if (fullScreen) {
                doBrowserLevelFullscreen();
              } else {
                undoBrowserLevelFullscreen();
              }
            }
          };

          scope.toggleFullScreen = toggleFullScreen;
          scope.isFullScreen = isFullScreen;
          scope.Playlister = Playlister;
          scope.status = status;
          scope.message = message;

          scope.play = play;
          scope.pause = pause;
          scope.next = next;
          scope.spaceOpen = spaceOpen;
          scope.close = close;
          scope.spaceIsOpen = spaceIsOpen;

          scope.getPlaylist = getPlaylist;
        }
      }
    });


angular.module('xyzPlayer')
  .constant('YT_event', {
    STOP: 0, PLAY: 1, PAUSE: 2, STATUS_CHANGE: 3
  })
  .constant('SC_event', {
    STOP: 10, PLAY: 11, PAUSE: 12, STATUS_CHANGE: 13
  });

