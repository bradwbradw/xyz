"use strict";

angular.module('xyzApp')

  .service('Playlister', function ($log, $q, $rootScope, Spaces) {


    var isPlayable = function(item){
      return _.isUndefined(item.public) || item.public == true;
    };

    var wasNotPlayed = function (item) {
      return isPlayable(item) && !_.get(item, 'didPlay');
    };

    var wasPlayed = function (item) {
      return _.get(item, 'didPlay');
    };


    var Playlister = {
      listMap: {}, // key is spaceid, value is playlist []
      nowPlaying: false,
      setNowPlaying: function (songObj) {
        return Playlister.nowPlaying = songObj;
      },
      getNowPlaying: function () {
        return Playlister.nowPlaying;
      },
      markNowPlayingAsPlayed: function (space) {
        _.set(_.find(_.get(space, 'songs'), {id: Playlister.nowPlaying.id}), 'didPlay', true);
      },
      getList: function (spaceId) {
        if (!spaceId) {
          return Playlister.listMap[Spaces.current().id];
        } else {
          return Playlister.listMap[spaceId];
        }
      },
      setList: function (spaceId, list) {
        Playlister.listMap[spaceId] = list;
      },
      resetAllToUnplayed: function (space) {
        _.each(_.get(space, 'songs'), function (item) {
          _.set(item, 'didPlay', false);
        });
      },
      resetAllIfOneDidPlay: function (space, songId) {
        var item = _.find(_.get(space, 'songs'), {id: songId});
        if (wasPlayed(item)) {
          Playlister.resetAllToUnplayed(space);
        }
      },
      resetAllIfAllDidPlay: function (space) {

        var unplayedItem = _.find(_.get(space, 'songs'), wasNotPlayed);
        if (!unplayedItem) {
          Playlister.setNowPlaying(false);
          Playlister.resetAllToUnplayed(space);
          return Playlister.recompute(space);
        } else {
          return $q.resolve();
        }
      },
      recompute: function (space, playFromSongId) {

        if (!space) {
          space = Spaces.current();
        }
        var deferred = $q.defer();

//        $log.log('recomputing playlist for space: '+ _.get(space,'name'), space);

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

//            $log.debug('starting unvisited set is ', _.map(unvisited,'title'));
            safety++;
            if (safety > 100) {
              return [];
            }
            if (_.size(unvisited) === 0) {
              return;
            }

            sorted = _.concat(sorted, currentNode);

            _.remove(unvisited, {id: _.get(currentNode, 'id')});
//            $log.debug('just removed ', _.get(currentNode,'title'));

            var nextNodeId = _.get(_.first(distancesToOtherItems(currentNode, unvisited)), 'id');
            var nextNode = _.find(unvisited, {id: nextNodeId});
//            $log.debug('next unvisited set is ', _.map(unvisited,'title'));
//            $log.debug('next node is ', _.get(nextNode, 'title'));
//            $log.debug('sorted is ', _.map(sorted, 'title'));

            sort(unvisited, nextNode);
          };

          sort(songs, seed);
//          $log.log('all recursive should be done');

          return sorted;
        };

        var shouldTryToPlay = function (item) {
          return item.provider_id && isPlayable(item) && wasNotPlayed(item);
        };

        var songs = _.filter(_.get(space, 'songs'), shouldTryToPlay);

        songs = _.uniqBy(songs, 'id');

        if (_.size(songs) <= 0) {
          $log.debug('space has no songs: ', space);
          deferred.reject('space has no songs: ', space);
        } else {

          var seedSong;

          var nowPlayingIsInCurrentSpace = function () {
            if ($rootScope.getPlayingSpace() && Spaces.current()) {
              return _.get($rootScope.getPlayingSpace(), 'id') === _.get(Spaces.current(), 'id');
            } else {
              return false;
            }
          };

          if (playFromSongId) {
            // example: user clicks on "play from here" on an item
            seedSong = _.find(songs, {id: playFromSongId});
          } else if (Playlister.getNowPlaying() && nowPlayingIsInCurrentSpace()) {
            // example: if user drags an item while a song is playing
            // (song could be paused and count as playing, though)
            seedSong = Playlister.getNowPlaying();
          } else if (space.firstSong) {
            // example: if user drags an item while a song is not playing
            seedSong = _.find(songs, {id: space.firstSong});
          }

          if (_.isUndefined(seedSong)) {
            seedSong = _.first(_.sortBy(songs, 'date_saved'));
          }

          if (_.size(songs) > 1) {
            Playlister.setList(space.id, sortByNearest(songs, seedSong));
          } else {
            Playlister.setList(space.id, songs);
          }

          $log.debug('computed playlist, first song is : ', _.first(Playlister.getList(space.id)));
          deferred.resolve(Playlister.getList(space.id));
        }

        $rootScope.$broadcast('did_recompute_playlist');
        return deferred.promise

      }
    };

    return Playlister;

  });