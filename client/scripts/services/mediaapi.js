'use strict';

/**
 * @ngdoc service
 * @name xyzApp.MediaAPI
 * @description
 * # MediaAPI
 * Service in the xyzApp.
 */
angular.module('xyzApp')
  .service('MediaAPI', function ($http, $window, apiKeys) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    $window.SC.initialize({
      client_id: apiKeys.sc,
      redirect_uri: 'http://l.h:8080/sc_callback'
    });


    var MediaAPI = {
      SC: $window.SC,
      YT: {
        search: function (query) {

        },
        get: function (id) {
          if (_.isArray(id)) {
            // do api call with comma-separated ids to get all data in one query
          } else {
            var ytGetUrl = 'https://www.googleapis.com/youtube/v3/videos?id=' +
              id
              + '&key=' + apiKeys.yt +
              '&part=snippet,contentDetails';
            /*
             '&fields=items(snippet(title, channelTitle))&part=snippet';
             */
            return $http.get(ytGetUrl)
              .then(function (data) {
                return data.data.items[0];
              });

          }
        }
      }
    };

    return MediaAPI;
  });


