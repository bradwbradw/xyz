
  angular.module('songApp')

    .service('Stream', function ($log, $q, Server) {

      return {

        currentSong: {
          lastUpdated:'',
          songData:{}
        },

        getCurrentSong: function(){
          return Server.getCurrentSong()
            .then(function(response){
              var currentSong = {
                lastUpdated:new Date(),
                songData:response.data
              };

              return currentSong;
            } );
        }
      }



    });