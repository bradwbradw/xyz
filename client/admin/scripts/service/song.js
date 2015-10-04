
  angular.module('songApp')

    .service('Songs', function ($http, $log, $q) {


    Songs = {
      // should be same as in index.js database model
      fields:[
        'name',
        'length',
        'url',
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
        if(_.isEmpty(Songs.songs) ){
          return Songs.loadSongs();
        } else {
          return Songs.songs;
        }
      },
      loadSongs: function () {
        $log.log('loading songs');
        return $http.get('/songs')
            .then(function (response) {
              Songs.songs = prepareSongs(response.data);
              return Songs.songs;
            })
            .catch(function (error) {
              $log.error(error);
            })
      },

      add: function (song) {
        $http.post('/songs',song)
            .then( updateView )
            .catch(reportError);
      },
      update:function(id, data){
        $log.log('update',data);
        $http.put('/songs/'+id, data )
          .then( updateView )
          .catch(reportError)
          .finally( updateView)
      },
      remove: function(id){
        $http.delete('/songs/'+id)
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
      }

    return Songs;

  });