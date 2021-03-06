var loopback = require('loopback');

var Space = loopback.getModel('Space');
var Song = loopback.getModel('Song');

var _ = require('lodash');

// http://localhost:5005/api/spaces/playlist?spaceId=56b913aa4a900c6892df06cb

var distanceBetweenItems = function (song1, song2) {

  if (!song1.x || !song1.y || !song2.x || !song2.y) {
    return false;
  }

  // get euclidian distance between two songs
  xLength = Math.abs(song1.x - song2.x);
  yLength = Math.abs(song1.y - song2.y);

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

module.exports = function (Space) {

  Space.playlist = function (spaceId, cb) {

    Space.findById(spaceId, {include: 'songs'},
      function (err, data) {

        var playlist = [];
        var songs = data && _.isFunction(data.songs)? data.songs() : [];

        songs = _.filter(songs, function(song){
          return _.isUndefined(song.public) || song.public == true;
        });

        var response = {};
        if (_.size(songs) <= 0) {
          response = {
            success: false,
            error: 'there are no available songs in this space'
          };

          cb(null, {space:data,playlist:response});
          return;
        } else {
          _.each(songs, function (song) {
            song.distances = distancesToOtherItems(song, songs);
            playlist.push(song);
          });

          var seedSong;

          if (data.seedSong) {
            seedSong = data.seedSong;
          } else {
            var sortedByDate = _.sortBy(data.songs(), 'date_saved');
            seedSong = sortedByDate[0];
          }

          playlist = [seedSong];

          _.each(seedSong.distances, function (song) {
            playlist.push(_.find(songs, 'id', song.id));
          });

        }

        var seconds = [];
        var i = 0;
        _.each(playlist, function (song) {
          var songSeconds = [];
          _.each(_.range(Math.round(song.length)), function () {
            songSeconds.push({song: song.id, second: i++});
          });
          seconds = seconds.concat(songSeconds);
        });
        var totalLength = i;

        if (!data.startTime) {
          response = playlist;
        } else {

          var now = new Date();
          var started = new Date(data.startTime);
          var playhead = Math.round((now - started) / 1000) % totalLength;

          var currentIndex = false;
          if (seconds[playhead]) {
            currentIndex = _.findIndex(playlist, 'id', seconds[playhead].song);
            var current = playlist[currentIndex];
          } else {
            console.error('could not get song at playhead ', playhead);
          }

          if (!currentIndex) {
            console.error('could not find song at playhead ', playhead);
            console.error('here is the seconds: ', seconds);
            cb(null, {space:data,playlist:response});
            return;
          } else {

            var newPlaylist1 = _.slice(playlist, 0, currentIndex);
            var newPlaylist2 = _.slice(playlist, currentIndex);

            response = newPlaylist2.concat(newPlaylist1);

          }


        }


        cb(null, {space:data,playlist:response, totalLength: totalLength});


      })
  };


  Space.remoteMethod(
    'playlist',
    {
      http: {path: '/playlist', verb: 'get'},
      accepts: {arg: 'spaceId', type: 'string'},
      returns: {arg: 'playlist', type: 'string'}
    }
  );

  /*
   Space.observe('after save', function(ctx, next) {
   if (ctx.instance) {
   console.log('Saved %s#%s', ctx.Model.Space, ctx.instance.id);
   } else {
   console.log('Updated %s matching %j',
   ctx.Model.Spaces,
   ctx.where);
   }
   next();
   });*/
};