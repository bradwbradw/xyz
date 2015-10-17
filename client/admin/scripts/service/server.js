angular.module('songApp')

  .service('Server', function ($http, $log, $q) {

    return {


      getPlaylist: function(){
        return $http.get('/playlist');
      },



      getSongs: function () {
        return $http.get('/library');
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
