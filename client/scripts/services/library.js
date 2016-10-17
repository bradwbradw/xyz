"use strict";

//noinspection JSUnresolvedVariable
angular.module('xyzApp')

  .service('Library', function ($log, $q, Space) {

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
            return Library.currentSpace;
          })
          .catch(function (err) {
            return $q.reject(err);
          });
      },

      addToSearchResults: function (newItems) {
        Library.searchResults = newItems;
      },

      update: function (id, data) {
        $log.warn('** update', data);

        return Space.songs.updateById({id: Library.space().id, fk: id}, data)
          .$promise
          .catch(function (err) {
            $log.error(err);
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


    return Library;

  });