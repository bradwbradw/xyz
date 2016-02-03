var loopback = require('loopback');

var Space = loopback.getModel('Space');
var Song = loopback.getModel('Song');

module.exports = function (Space) {


  Space.playlist = function (spaceId, cb) {

    Space.findById(spaceId,{include:'songs'},function (err,data) {

      Song.find({})
      console.log(data);

      var response = {
        space: data
      };
      cb(null, response);
    })
  };

  Space.thing = function (cb) {
    var response = 'thingy';
    cb(null, response);
  };

  Space.remoteMethod(
    'playlist',
    {
      http: {path: '/playlist', verb: 'get'},
      accepts: {arg: 'spaceId', type: 'string'},
      returns: {arg: 'playlist', type: 'string'}
    }
  );

  Space.remoteMethod(
    'thing',

    {
      http: {path: '/thing', verb: 'get'},
      returns: {arg: 'thing', type: 'string'}
    }
  )
};