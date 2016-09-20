"use strict";

angular.module('xyzApp')

  .service('Library', function ($log, $q, Space, Server, Playlister) {

    var Library = {

      currentSpace: {},
      space: function () {
        return Library.currentSpace;
      },
      songs: function () {
        return Library.currentSpace.songs;
      },
      searchResults: [],
      getSearchResults: function () {

        return Library.searchResults;
      },

      add: function (song) {
        song.date_created = new Date();
        return Space.songs.create({id: Library.space().id}, song)
          .$promise
          .then(function (result) {
            Library.currentSpace.songs.push(result);
          })
          .catch(function (err) {
            return $q.reject(err);
          });
      },

      addToSearchResults: function (newItems) {
        Library.searchResults = newItems;
      },

      fetchSpaceAndSongs: function (spaceId) {
        if (_.isUndefined(spaceId)){
          spaceId = Library.space().id;
        }
        return Space.findById({id: spaceId, filter: {include: ["songs","contributors"]}})
          .$promise
          .then(function (spaceAndSongs) {
            Library.currentSpace = spaceAndSongs;
            Library.currentSpace.songs = prepareLibrary(spaceAndSongs.songs);

            return Library.songs(); // returns just the songs
          })
      },

      update: function (id, data) {
        $log.warn('** update', data);

        Playlister.recompute(Library.currentSpace);

        return Space.songs.updateById({id: Library.space().id, fk: id}, data)
          .$promise
          .catch(function (err) {
            return $q.reject(err);
          });
      },
      isPlayable: function (item) {
        if (item && item.kind) {
          return item.kind === 'media';
        } else {
          return false;
        }
      }

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
        song.editing = false;
        preparedLibrary.push(song);
      });

      return preparedLibrary;
    };


    return Library;

  });