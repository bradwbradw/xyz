"use strict";

angular.module('xyzApp')

  .service('Playlister', function ($log, $q, Space, Server) {

    var Playlister = {
      list: [],
      getList: function(){
        return Playlister.list;
      },
      recompute: function (space) {

        $log.log('recomputing playlist for space ', space);

        var distanceBetweenItems = function (song1, song2) {

          if (!song1.x || !song1.y || !song2.x || !song2.y) {
            return false;
          }

          // get euclidian distance between two songs
          var xLength = Math.abs(song1.x - song2.x);
          var yLength = Math.abs(song1.y - song2.y);

          return Math.sqrt((xLength * xLength) + (yLength * yLength));

        };

        var distancesToOtherItems = function (song, otherSongs) {

          var distances = {};
          _.each(otherSongs, function (otherSong) {
            if (otherSong.id === song.id) {
              return true;
            }
            distances[otherSong.id] = {
              distance: distanceBetweenItems(song, otherSong),
              id: otherSong.id
            };
          });
          distances = _.sortBy(distances, 'distance');

          return distances;
        };


        var playlist = [];

        var songs = _.filter(space.songs, function (song) {
          return _.isUndefined(song.public) || song.public == true;
        });

        if (_.size(songs) <= 0) {
          $log.debug('space has no songs: ', space);
          return [];
        } else {
          _.each(songs, function (song) {
            song.distances = distancesToOtherItems(song, songs);
            playlist.push(song);
          });

          var seedSong;

          if (space.firstSong) {
            seedSong = _.find(songs, {id: space.firstSong});
          }

          if (_.isUndefined(seedSong)) {
            seedSong = _.first(_.sortBy(songs, 'date_saved'));
          }

          playlist = [seedSong];

          _.each(seedSong.distances, function (song) {
            playlist.push(_.find(songs, 'id', song.id));
          });

          Playlister.list = _.uniqBy(playlist,'id');
          
          $log.debug('computed playlist: ', playlist);
          return playlist;
        }

      }
    };

    return Playlister;

  });