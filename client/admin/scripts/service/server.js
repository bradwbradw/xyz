angular.module('songApp')

  .service('Server', function ($http, $log, $q) {

    return {


      getPlaylist: function(){
        return $http.get('/playlist');
      },

      refresh: function(){
        return $http.get('/refresh');
      },



      getSongs: function () {
        return $http.get('/songs');
      },
      addSong: function (song) {
        return $http.post('/songs', song);
      },
      updateSong: function (id, data) {

        return $http.put('/songs/' + id, data);
      },
      deleteSong: function(id){
        return $http.delete('/songs/'+id);
      }



    }
  });
