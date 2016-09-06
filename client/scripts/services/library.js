"use strict";

angular.module('xyzApp')

  .service('Library', function ($log, $q, Space, Server) {

    var Library = {

      /*
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

       ], */

      currentSpace: {}, // set by the 'space' resolve
      space: function () {
        return Library.currentSpace;
      },
      songs: function () {
        return Library.currentSpace.songs;
      },
      localItems: [],//localStorageService.get('localItems') || [],
      getLocalItems: function () {
        // console.warn('getLocalItems: ',Library.localItems);
        return Library.localItems;
      },
      focused: function () {
        if (Library.localItems.length > -1) {
          return Library.localItems.length - 1;
        } else {
          return 0;
        }
      },

      add: function (song) {
        song.date_created = new Date();
        return Space.songs.create({id: Library.space().id}, song)
          .$promise
          .then(function (result) {
            Library.currentSpace.songs.push({
              attrs:result,
              id:result.id
            });
          })
          .catch(function (err) {
            return $q.reject(err);
          });
      },

      addToLocalItems: function (newItems) {
        //  console.log('ADDING ITEMS:',newItems);
//        var newArr = _.isArray(newItems) ? newItems : [newItems];
//        Library.localItems.push(newItems);
        Library.localItems = newItems;
//        localStorageService.set('localItems', Library.localItems);

      },

      fetchSpaceAndSongs: function (spaceId) {
        if (_.isUndefined(spaceId)){
          spaceId = Library.space().id;
        }
        return Space.findById({id: spaceId, filter: {include: ["songs","contributors"]}}, _.noop)
          .$promise
          .then(function (spaceAndSongs) {
            Library.currentSpace = spaceAndSongs;
            Library.currentSpace.songs = prepareLibrary(spaceAndSongs.songs);

            return Library.songs(); // returns just the songs
          })
      }, /*
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
       },*/
      /*
       getLibrary: function () {

       return Library.currentSpace.songs;

       },*/

      update: function (id, data) {
        $log.warn('** update', data);
        return Space.songs.updateById({id: Library.space().id, fk: id}, data)
          .$promise
          .catch(function (err) {
            return $q.reject(err);
          });
      },
      isPlayable: function (item) {
        if (item.attrs && item.attrs.kind) {
          return item.attrs.kind === 'media';
        } else if (item.kind) {
          return item.kind === 'media';
        }
      },

      /*

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
       /!*
       if (_.isEmpty(Library.localItems)){
       return false;
       }
       return Library.localItems[Library.focused];*!/
       },
       */

    };

    var updateView = function (response) {
      reportSuccess(response);
//      $log.log('update view');
      Library.fetchSpaceAndSongs();
    };
    var reportSuccess = function (response) {
//      $log.log('success', response);
    };

    var prepareLibrary = function (rawLibrary) {

      var preparedLibrary = [];
      _.each(rawLibrary, function (song) { //jshint ignore:line
        preparedLibrary.push(
          {
            id: song.id,
            attrs: song,
            editing: false
          }
        );
      });

      return preparedLibrary;
    };


    return Library;

  });