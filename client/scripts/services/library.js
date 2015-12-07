"use strict";

angular.module('xyzApp')

  .service('Library', function ($log, $q, Server, Social, Extract, localStorageService) {


    var Library = {
      // should be same as in index.js database model
      fields: [
        'artist',
        'title',
        'length',
        'url',
        'provider',
        'provider_id',
        'pic',
        'date_saved',
        'original_data',
        'description',
        'x',
        'y',
        'kind',
        'active'

      ], /* after test
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
      localItems: [],//localStorageService.get('localItems') || [],
      getLocalItems: function () {
        return Library.localItems;
      },
      focused: function () {
        if (Library.localItems.length > -1) {
          return Library.localItems.length - 1;
        } else {
          return 0;
        }
      },
      focusLeft: function () {
        Library.focused = Library.focused - 1;
      },
      focusRight: function () {
        Library.focused = Library.focused + 1;
      },
      latestFocused: function () {
        return Library.focused === Library.localItems.length - 1;
      },
      getFocusedLocalItemGroup: function () {
      return Library.getLocalItems();
      /*
        if (_.isEmpty(Library.localItems)){
          return false;
        }
        return Library.localItems[Library.focused];*/
      },


      addToLocalItems: function (newItems) {
        console.log('ADDING ITEMS:',newItems);
//        var newArr = _.isArray(newItems) ? newItems : [newItems];
//        Library.localItems.push(newItems);
        Library.localItems = newItems;
//        localStorageService.set('localItems', Library.localItems);

      },


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
            return false;
          });
      },

      // example song object:

      add: function (song) {
        return Server.addSong(song)
          .then(function (result) {
            updateView(result);
            return result;
          })
          .catch(reportError);
      },
      update: function (id, data) {
//        $log.log('update', data);
        Server.updateSong(id, data)

          .then(updateView)
          .catch(reportError)
          .finally(updateView);
      },
      remove: function (id) {
        Server.deleteSong(id)
          .then(updateView)
          .catch(reportError);
      },
      isPlayable: function(item){
        if(item.attrs && item.attrs.kind){
          return item.attrs.kind === 'media';
        } else if(item.kind) {
          return item.kind === 'media';
        }
      }

    };

    var updateView = function (response) {
      reportSuccess(response);
//      $log.log('update view');
      Library.loadLibrary();
    };
    var reportSuccess = function (response) {
//      $log.log('success', response);
    };

    var reportError = function (error) {
      $log.error('error', error);
      return $q.reject();
    };

    var prepareLibrary = function (rawLibrary) {

      var preparedLibrary = [];
      _.each(rawLibrary, function (song) { //jshint ignore:line
        preparedLibrary.push(
          {
            id: song._id,
            attrs: song,
            editing: false
          }
        );
      });

      return preparedLibrary;
    };


    return Library;

  });