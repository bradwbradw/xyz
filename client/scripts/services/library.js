
  angular.module('xyzApp')

    .service('Library', function ( $log, $q, Server) {


    Library = {
      // should be same as in index.js database model
      fields:[
        'artist',
        'title',
        'length',
        'url',
        'provider',
        'provider_id',
        'x',
        'y',
        'active'

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


      getLibrary: function () {

          return Library.songs;

      },
      loadLibrary: function () {
        $log.log('loading songs');
        return Server.getLibrary()
            .then(function (response) {
              Library.songs = prepareLibrary(response.data);
              return Library.songs;
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
        Library.loadLibrary();
      };
      var reportSuccess = function(response){
        $log.log('success',response);
      };

      var reportError = function(error){
        $log.error('error',error);
        return $q.reject();
      };

      var prepareLibrary = function(rawLibrary){

        var preparedLibrary = [];
        _.each(rawLibrary, function(song){
          preparedLibrary.push(
            {
            id:song._id,
            attrs:song,
            editing:false
          }
          );
        });
        return preparedLibrary;
      };



    return Library;

  });