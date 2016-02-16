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
    distances = _.sortBy(distances,'distance');

    return distances;
};

module.exports = function (Space) {

    Space.playlist = function (spaceId, cb) {

        Space.findById(spaceId, {include: 'songs'},
            function (err, data) {

                var playlist = [];
                var songs = data.songs();
                var response = {
                    success: true
                }
                if (_.size(songs) <= 0) {
                    var response = {
                        success: false,
                        error: 'there are no songs in this space'
                    }
                } else {
                    _.each(songs, function (song) {
                        song.distances = distancesToOtherItems(song, songs);
                        playlist.push(song);
                    });

                    var firstSong;

                    if (data.firstSong) {
                        firstSong = data.firstSong;
                    } else {
                        var sortedByDate = _.sortBy(data.songs(), 'date_saved');
                        firstSong = sortedByDate[0];
                    }

                    var playlist = [firstSong];

                    _.each(firstSong.distances, function (song) {
                        playlist.push(_.find(songs,'id',song.id));
                    });

                    response.songs = playlist;
                }

                var seconds = [];
                var i = 0;
                _.each(playlist, function(song){
                    var songSeconds = [];
                    _.each(_.range(Math.round(song.length)), function(){
                        songSeconds.push({song:song.id, second:i++});
                    });
                    seconds = seconds.concat(songSeconds);
                });

                response.seconds = seconds;
                cb(null, response);
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