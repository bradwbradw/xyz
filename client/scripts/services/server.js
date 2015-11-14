"use strict";

angular.module('xyzApp')

  .service('Server', function ($http, serverConfig) {

    var API = serverConfig.apiBaseUrl || 'http://l.h:5000/';

    var get = function(item){
      return $http.get(API+item);
    };

    var post = function(place,item){
      return $http.post(API+place,item);

    };

    var put = function(place,item){
      return $http.put(API+place,item);
      };

      var restDelete = function(item){
      return $http.delete(API+item);
    };

    return {

      getBandcampId: function(url){
        return get('bandcampHelper?url='+url);
      },

      getPlaylist: function(){
        return get('playlist');
      },

      refresh: function(){
        return get('refresh');
      },

      getLibrary: function () {
        return get('songs');
      },
      addSong: function (song) {
        return post('songs', song);
      },
      updateSong: function (id, data) {
        return put('songs/' + id, data);
      },
      deleteSong: function(id){
        return restDelete('songs/'+id);
      }


    };
  });
