angular.module('songApp')

  .service('Server', function ($http, $log, $q) {

    return {


      getCurrentSong: function(){
        return $http.get('/currentSong');
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
