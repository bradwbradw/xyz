angular.module('songApp')

  .service('Server', function ($http, $log, $q) {

    var API = 'http://l.h:5000/';

    var get = function(item){
      return $http.get(API+item)
    };

    var post = function(place,item){
      return $http.post(API+place,item)

    };

    var put = function(place,item){
      return $http.put(API+place,item);
      };

      var restDelete = function(item){
      return $http.delete(API+item);
    };

    return {

      getPlaylist: function(){
        return get('playlist');
      },

      refresh: function(){
        return get('refresh');
      },

      getSongs: function () {
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



    }
  });
