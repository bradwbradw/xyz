angular.module('songApp')

  .service('Stream', function ($log, $q, Server, $interval) {

    Stream = {

      currentSong: {
        lastUpdated: '',
        songData: {}
      },
      playlist: [],
      lastUpdated: '',

      reloadPlaylist: function () {
        $log.log('reloading playlist');
        return Server.getPlaylist()
          .then(function(response){
            Stream.playlist = response.data;
            return response.data;
          });
      },

      current: function(){
        return Stream.playlist[0];
      },

      getCurrentSong: function () {
        if (_.isEmpty(Stream.playlist)) {

          return Stream.reloadPlaylist()
            .then(function (response) {
              Stream.playlist = response.data;

              return Stream.playlist[0];
            });
        } else {
          return Stream.playlist[0];
        }
      },
      getNextSong: function () {

        if (_.isEmpty(Stream.playlist)) {

          return Stream.reloadPlaylist()
            .then(function (response) {
              var nextSong = {
                lastUpdated: new Date(),
                songData: response.data
              };

              return nextSong;
            });
        } else if (Stream.playlist.length >1) {
          return Stream.playlist[1];
        } else {
          return false;
        }
      }
    };

    return Stream;




  });