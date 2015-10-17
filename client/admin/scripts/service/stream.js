angular.module('songApp')

  .service('Stream', function ($log, $q, Server) {

    Stream = {

      currentSong: {
        lastUpdated: '',
        songData: {}
      },
      playlist: [],
      lastUpdated: '',

      reloadPlaylist: function () {
        return Server.getPlaylist();
      },

      getCurrentSong: function () {
        if (_.isEmpty(playlist)) {

          return Stream.reloadPlaylist()
            .then(function (response) {
              Stream.playlist = response.data();

              return Stream.playlist[0];
            });
        } else {
          return playlist[0];
        }
      },
      getNextSong: function () {

        if (_.isEmpty(playlist)) {

          return Stream.reloadPlaylist()
            .then(function (response) {
              var nextSong = {
                lastUpdated: new Date(),
                songData: response.data
              };

              return nextSong;
            });
        } else if (playlist.length >1) {
          return playlist[1];
        } else {
          return false;
        }
      }
    };

    return Stream;


  });