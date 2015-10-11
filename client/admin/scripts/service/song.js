
  angular.module('songApp')

    .service('Songs', function ( $log, $q, Server) {


    Songs = {
      // should be same as in index.js database model
      fields:[
        'artist',
        'title',
        'length',
        'url',
        'provider',
        'provider_id',
        'x',
        'y'
      ],/* after test
      fields:[

        'artist',
        'title',
        'provider',
        'url',
        'x',
        'y',
        'z',

      ],*/
      songs: [],


      /*

GET /songs
GET /songs/:id
POST /songs
PUT /songs/:id
DELETE /songs/:id

*/


      getSongs: function () {

          return Songs.songs;

      },
      loadSongs: function () {
        $log.log('loading songs');
        return Server.getSongs()
            .then(function (response) {
              Songs.songs = prepareSongs(response.data);
              return Songs.songs;
            })
            .catch(function (error) {
              $log.error(error);
            })
      },


      add: function (song) {
        Server.addSong(song)
            .then( updateView )
            .catch(reportError);
      },
      update:function(id, data){
        $log.log('update',data);
        Server.updateSong(id, data )
          .then( updateView )
          .catch(reportError)
          .finally( updateView)
      },
      remove: function(id){
        Server.deleteSong(id)
          .then(updateView)
          .catch(reportError)
      }
    };

      var updateView = function(response){
        reportSuccess(response);
        Songs.loadSongs();
      };
      var reportSuccess = function(response){
        $log.log('success',response);
      };

      var reportError = function(error){
        $log.error('error',error);
        return $q.reject();
      };

      var prepareSongs = function(rawSongs){

        var preparedSongs = [];
        _.each(rawSongs, function(song){
          preparedSongs.push(
            {
            id:song._id,
            attrs:song,
            editing:false
          }
          );
        });
        return preparedSongs;
      };

    return Songs;

  });