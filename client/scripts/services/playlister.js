"use strict";

angular.module('xyzApp')

  .service('Playlister', function ($log, $q, Space, Server) {

    var Playlister = {
      list: [],
      getList: function () {
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
              id: otherSong.id,
              x: otherSong.x,
              y: otherSong.y,
              name: otherSong.title
            };
          });
          distances = _.sortBy(distances, 'distance');

          return distances;
        };

        // returns an array that sorts the songs into
        // a list sorted using "nearestNeighbour"

        var sortByNearest = function (songs, seed) {

          var sorted = [];
          var safety = 0;

          var sort = function (unvisited, currentNode) {

            $log.debug('starting unvisited set is ', _.map(unvisited,'title'));
            safety++;
            if (safety > 100) {
              return [];
            }
            if (_.size(unvisited) === 0) {
              return;
            }

            sorted = _.concat(sorted, currentNode);

            _.remove(unvisited, {id: currentNode.id});
            $log.debug('just removed ', _.get(currentNode,'title'));

            var nextNodeId = _.get(_.first(distancesToOtherItems(currentNode, unvisited)), 'id');
            var nextNode = _.find(unvisited, {id: nextNodeId});
            $log.debug('next unvisited set is ', _.map(unvisited,'title'));
            $log.debug('next node is ', _.get(nextNode, 'title'));
            $log.debug('sorted is ', _.map(sorted, 'title'));

            sort(unvisited, nextNode);
          };

          sort(songs, seed);
          $log.log('all recursive should be donw');

          return sorted;
        };

        var songs = _.filter(space.songs, function (song) {
          return song.provider_id && (_.isUndefined(song.public) || song.public == true);
        });

        songs = _.uniqBy(songs, 'id');

        if (_.size(songs) <= 0) {
          $log.debug('space has no songs: ', space);
          return [];
        } else {

          var seedSong;

          if (space.firstSong) {
            seedSong = _.find(songs, {id: space.firstSong});
          }

          if (_.isUndefined(seedSong)) {
            seedSong = _.first(_.sortBy(songs, 'date_saved'));
          }

          Playlister.list = sortByNearest(songs, seedSong);

          $log.debug('computed playlist: ', Playlister.list);
          return Playlister.list;
        }

      }
    };

    return Playlister;

  });