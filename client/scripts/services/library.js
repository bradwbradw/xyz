"use strict";

//noinspection JSUnresolvedVariable
angular.module('xyzApp')

  .service('Library', function ($log, $q, Space) {

    var Library = {

      searchResults: [],
      getSearchResults: function () {

        return Library.searchResults;
      },

      addToSearchResults: function (newItems) {
        Library.searchResults = newItems;
      },

      update: function (id, data) {/*
        $log.warn('** update', data);

       ;*/
      },
      isPlayable: function (item) {
        if(item.error){
          return false;
        }
        if (item && item.kind) {
          return item.kind === 'media';
        } else {
          return false;
        }
      }

    };


    return Library;

  });