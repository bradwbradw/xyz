'use strict';

/**
 * @ngdoc service
 * @name xyzApp.Utility
 * @description
 * # Utility
 * Service in the xyzApp.
 */
angular.module('xyzApp')
  .service('Utility', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function


    var Utility = {

      clean: {
        SC: {
          track: function (track) {
            return {
              provider: 'soundcloud',
              provider_id: track.id,
              artist: track.user.username,
              title: track.title,
              description: track.description,
              length: track.duration / 1000,
              url: track.permalink_url,
              stream: track.stream_url,
              pic: track.artwork_url,
              date_saved: new Date(),
              kind:'media',
              original_data: track

            };
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
              kind:'user',
              original_data: user

            }
          },

          playlist: function (playlist) {
            return {
              provider: 'soundcloud',
              provider_id:playlist.id,
              artist:playlist.user.username,
              title:playlist.title,
              length:playlist.duration / 1000,
              description:playlist.description,
              url:playlist.permalink_url,
              pic:playlist.artwork_url,
              date_saved: new Date(),
              kind:'playlist',
              original_data:playlist

            }
          }
        },
        YT: {
          video: function (raw) {


            var cleanData =
            {
              provider: 'youtube',
              artist: raw.snippet.channelTitle,
              title: raw.snippet.title,
              description: raw.snippet.description,
              pic: raw.snippet.thumbnails.high.url, //"http://img.youtube.com/vi/" + raw.id + "/0.jpg",
              date_saved: new Date(),
              kind:'media',
              original_data: raw

            };

            if (raw.id.videoId) {
              cleanData.provider_id = raw.id.videoId;
            } else {
              cleanData.provider_id = raw.id;
            }
            cleanData.url = 'https://youtube.com/watch?v=' + cleanData.provider_id;

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
        BC: {
          parseUrlForType: function(url){
            var parts = url.split('.bandcamp.com/');
            parts = parts[1].split('/');
            return parts[0];
          }
        }
      }
    }
    return Utility;
  });
