'use strict';

/**
 * @ngdoc service
 * @name xyzApp.Utility
 * @description
 * # Utility
 * Service in the xyzApp.
 */
angular.module('xyzApp')
  .service('Utility', function ($sce, $rootScope, $log, $location, ngToast, localStorageService, layout_constants) {

      var random = function (n) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < n; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      };


      var Utility = {

        // use .then(Utility.applyProviderName) to stick resolved data onto object keyed with providerName

        applyProviderName: function (providerName) {
          return function (input) {
            var out = {
              provider: providerName,
              results: input
            };
            return out;
          }
        },
        clean: {
          soundcloud: {
            mediaItem: function (track) {

              var cleaned =
              {
                provider: 'soundcloud',
                id: 'SC-' + track.id + '~' + random(4),
                provider_id: track.id,
                artist: track.user.username,
                title: track.title,
                description: track.description,
                length: track.duration / 1000,
                url: track.permalink_url,
                stream: track.stream_url,
                pic: track.artwork_url,
                date_saved: new Date(),
                kind: 'media',
                original_data: track

              };
              if (!cleaned.pic && track.user && track.user.avatar_url) {
                cleaned.pic = track.user && track.user.avatar_url;
              }

              return cleaned;
            },
            track: function (raw) {
              return Utility.clean.soundcloud.mediaItem(raw);
            },

            user: function (user) {
              return {
                provider: 'soundcloud',
                provider_id: user.id,
                artist: user.username,
                description: user.description,
                url: user.permalink_url,
                pic: user.avatar_url,
                date_saved: new Date(),
                kind: 'user',
                original_data: user

              }
            },

            playlist: function (playlist) {
              return {
                provider: 'soundcloud',
                provider_id: playlist.id,
                artist: playlist.user.username,
                title: playlist.title,
                length: playlist.duration / 1000,
                description: playlist.description,
                url: playlist.permalink_url,
                pic: playlist.artwork_url,
                date_saved: new Date(),
                kind: 'playlist',
                original_data: playlist

              }
            }
          },
          youtube: {
            mediaItem: function (raw) {

              var cleanData =
              {
                provider: 'youtube',
                artist: raw.snippet.channelTitle,
                title: raw.snippet.title,
                description: raw.snippet.description,
                pic: raw.snippet.thumbnails.high.url, //"http://img.youtube.com/vi/" + raw.id + "/0.jpg",
                date_saved: new Date(),
                kind: 'media',
                original_data: raw

              };

              if (raw.id.videoId) {
                cleanData.provider_id = raw.id.videoId;
              } else {
                cleanData.provider_id = raw.id;
              }
              cleanData.url = 'https://youtube.com/watch?v=' + cleanData.provider_id;
              cleanData.id = 'YT-' + cleanData.provider_id + '~' + random(4);

              //PT#M#S
              if (raw.contentDetails && raw.contentDetails.duration) {
                var dur_string = raw.contentDetails.duration;
                var formattedTime = dur_string.replace("PT", "").replace("H", ":").replace("M", ":").replace("S", "");
                var hms_arr = formattedTime.split(':');
                var seconds = parseFloat(hms_arr.pop());
                if (hms_arr.length > 0) {
                  seconds += parseFloat(hms_arr.pop()) * 60;  // minutes
                }
                if (hms_arr.length > 0) {
                  seconds += parseFloat(hms_arr.pop()) * 60 * 60; // hours
                }
                cleanData.length = seconds;
              }
              return cleanData;
            }

          },
          bandcamp: {
            parseUrlForType: function (url) {
              var parts = url.split('.bandcamp.com/');
              parts = parts[1].split('/');
              return parts[0];
            }
          }
        },
        iFrameUrl: function (item, playerStatus) {

          var url;
          if (item.provider === 'youtube') {
            url = 'https://www.youtube.com/embed/'
              + item.provider_id
              + '?autoplay=';

            if (playerStatus.autoplay) {
              url += '1';
            } else {
              url += '0';
            }
            url += '&start=' + playerStatus.startFrom;

          } else if (item.provider === 'soundcloud') {

            url = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'
              + item.provider_id
              + '&amp;auto_play='
              + playerStatus.autoplay
              + '&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true';

          } else if (item.provider === 'bandcamp') {

            url = 'http://bandcamp.com/EmbeddedPlayer/size=medium/bgcol=ffffff/linkcol=0687f5/tracklist=false/track='
              + item.provider_id
              + '/transparent=true/';
          } else {
            url = '/iframeUrlProblem';
          }

          return $sce.trustAsResourceUrl(url);
        },

        fixUrl: function (domainOrUrl) {
          if (domainOrUrl.indexOf('://') > -1) {
            return domainOrUrl;
          } else {
            return 'https://' + domainOrUrl;
          }
        },
        keepCoordsInBoundaries: function (coords) {
          var x = coords.x;
          var y = coords.y;

          var boundaries = {
            minX: layout_constants.SPACE_DIMENSIONS.minX + layout_constants.DOT_RADIUS,
            minY: layout_constants.SPACE_DIMENSIONS.minY + layout_constants.DOT_RADIUS,
            maxX: layout_constants.SPACE_DIMENSIONS.width - layout_constants.DOT_RADIUS,
            maxY: layout_constants.SPACE_DIMENSIONS.height - layout_constants.DOT_RADIUS
          };

          if (x < boundaries.minX) {
            x = boundaries.minX;
          }
          if (y < boundaries.minY) {
            y = boundaries.minY;
          }

          if (x > boundaries.maxX) {
            x = boundaries.maxX;
          }
          if (y > boundaries.maxY) {
            y = boundaries.maxY;
          }

          return {
            x:x,
            y:y
          };
        },
        cleanError: function (thing) {

          var codes = {
            'EMAIL_NOT_FOUND': "Couldn't find that email address."
          };

          var apology = 'Sorry, ';
          if (_.isNumber(_.get(thing, 'status')) && _.get(thing, 'status') === 404) {
            // 404, 405, etc..
            return 'sorry, an unknown error occured';
          }
          if (_.isString(thing)) {
            return thing;
          } else {
            if (_.get(thing, 'message')) {
              return apology + _.get(thing, 'message');
            }

            if (_.get(thing, 'error.message')) {
              return apology + _.get(thing, 'error.message');
            }

            if (_.get(thing, 'data.error.errmsg')) {
              if (_.get(thing, 'data.error.errmsg').indexOf('duplicate key error') > -1) {
                return apology + 'Already exists';
              }
            }

            if (_.isObject(_.get(thing, 'data.error.details.messages'))) {
              var out = '';
              _.each(_.get(thing, 'data.error.details.messages'), function (problem, withThing) {
                out += '  ' + withThing + ': ' + problem + '.';

              });
              return apology + out;
            }

            if (_.get(thing, 'error.code')) {
              var code = _.get(thing, 'error.code');
              var message = _.get(codes, code);
              if (message) {
                return apology + message;
              } else {
                return apology + ' error code "' + code + '"';
              }
            }

            $log.error('unknown error format: ', thing);
            return angular.toJSON(thing, true);
          }
        },

        showError: function (error) {
          ngToast.create({
            className: 'danger',
            content: Utility.cleanError(error)/*,
             dismissOnTimeout: false,*/
          });
        },
        showMessage: function (message) {
          ngToast.create({
            content: message/*,
             dismissOnTimeout: false,*/
          });
        },
        absoluteRef: function (id) {
          return 'url(' + $location.absUrl() + '#' + id + ')';
        },
        // must use this method instead of pageY
        // because viewport is fixed, and contents of main-container are set to overflow: scroll
        // http://stackoverflow.com/questions/6073505/what-is-the-difference-between-screenx-y-clientx-y-and-pagex-y#answer-21452887
        absoluteCursorCoords: function(event){
          var svgElement = angular.element('.main-container svg');
          // TODO finish me
          return event;
        }


      };
      return Utility;
    }
  )
;
