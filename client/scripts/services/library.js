"use strict";

//noinspection JSUnresolvedVariable
angular.module('xyzApp')

  .service('Library', function ($log, $q, Space, Server, Utility, Playlister) {

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
      Spaces:{
        map:{},
        getSync:function(){
          return Library.Spaces.map;
        },
        get: function(){
          if( _.size(Library.Spaces.map) > 0){
            return $q.resolve(Library.Spaces.getSync());
          } else {
            return Library.Spaces.downloadAll()
              .then(Library.Spaces.makeMap)
              .then(Library.Spaces.set);
          }
        },
        getById:function(id){
          var found = _.find(Library.Spaces.map, {id:id});
          if(found){
            return $q.resolve(found);
          } else {
            return Library.Spaces.downloadOne(id)
              .then(Library.Spaces.addToMap);
          }
        },
        set: function(data){
          Library.Spaces.map = data;
          return data;
        },
        makeMap: function(list){
          return _.keyBy(list, 'id');
        },
        addToMap: function(newOne){
          _.set(Library.Spaces.map, newOne.id, newOne);
          return newOne;
        },
        downloadAll: function(){
          return Space.find({filter: {include: ["owner", "songs"], where: {public: true}}})
            .$promise;
        },
        downloadOne: function(id){
          return Space.findOne({filter: {include: ["owner", "songs", "contributors"], where: {id:id}}})
            .$promise;
        }
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
        return Library.Spaces.getById(spaceId)
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
        _.unset(song, 'original_data');
        preparedLibrary.push(song);
      });

      return preparedLibrary;
    };


    return Library;

  });