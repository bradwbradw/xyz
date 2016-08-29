var loopback = require('loopback'),
  _ = require('lodash'),
  when = require('when');

module.exports = function (app) {

  var refreshUpdated = function () {

    var Song = app.models.Song;
    Song.find({})
      .then(function (songs) {
        _.each(songs, function (song) {
          song.save();
        })
      })


  };

  refreshUpdated();

  setInterval(refreshUpdated, 6*60*60*1000);

};