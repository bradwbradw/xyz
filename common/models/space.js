var loopback = require('loopback');

var Space = loopback.getModel('Space');
var Song = loopback.getModel('Song');

module.exports = function (Space) {

  Space.playlist = function (spaceId, cb) {

    Space.findById(spaceId, {include: 'songs'},
      function (err, data) {

        var response = {
          space: data
        };
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

  Space.observe('after save', function(ctx, next) {
  if (ctx.instance) {
    console.log('Saved %s#%s', ctx.Model.Space, ctx.instance.id);
  } else {
    console.log('Updated %s matching %j',
      ctx.Model.Spaces,
      ctx.where);
  }
  next();
});
};