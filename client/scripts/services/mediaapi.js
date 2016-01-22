'use strict';

/**
 * @ngdoc service
 * @name xyzApp.MediaAPI
 * @description
 * # MediaAPI
 * Service in the xyzApp.
 */
angular.module('xyzApp')
  .service('MediaAPI', function ($http, $window, apiKeys, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    $window.SC.initialize({
      client_id: apiKeys.sc,
      redirect_uri: 'http://l.h:8080/sc_callback'
    });


    var MediaAPI = {
      SC: {
        resolve: function (url) {
          return $window.SC.get('/resolve?url=' + url);
        },
        search: function (query, pages) {
          return $q.when($window.SC.get('/tracks?q=' + query + '&linked_partitioning=1'))
            .then(function(data){
              if (data.collection){
                return data.collection;
              } else {
                return data;
              }
            })
              .catch(function(err){
                  console.error(err);
                  return [];
              });
        },
        likes: function(){
          return $window.SC.get('/me/favorites')
            .catch(function (error){
              console.error('media api error ',error);
              return $q.reject( error );
            });
        },
        playlists: function(){
          return $window.SC.get('/me/playlists');
        },
        tracksByUser: function(id){
          return $window.SC.get('/users/'+id+'/tracks', {limit:300})
            .then(function(data){
              if (data.collection){
                return data.collection;
              } else {
                return data;
              }
            });
        }
      },
      YT: {
        search: function (query, limit) {

          var ytSearchUrl = 'https://www.googleapis.com/youtube/v3/search?key=' + apiKeys.yt
            + '&q=' + query
            + '&part=snippet'
            + '&type=video'
            + '&videoEmbeddable=true'
//            + '&videoCategoryId=music'
            + '&maxResults=10';
          return $http.get(ytSearchUrl)
            .then(function (data) {
              return data.data.items;
            })
              .catch(function(response){
                  var error = 'unknown error';
                  if (response.data && response.data.error && response.data.errors && _.isArray(response.data.errors)){
                      error = response.data.errors.join(' , ');
                  } else if(response.data && response.data.error.message){
                      error = response.data.error.message;
                  } else {

                  }
                  console.error('youtube search error: ' , error);
                  return [];
              });

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

// example youtube link w/ age restriction
//https://www.youtube.com/watch?v=HcXNPI-IPPM&index=4&list=PLu-r3IVKTGZizq9ELoSG8AX63zQ8WMMva


