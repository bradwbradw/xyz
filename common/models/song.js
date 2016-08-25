

var MediaApi = require('../../server/controllers/media-api.js');

module.exports = function (Song) {


  Song.observe('before save', function (ctx, next) {

//    console.log('context: ', ctx);
    if (ctx.instance) {
      var song = ctx.instance;
      MediaApi.checkForAvailability(song)
        .then(function(available){
          console.log(song.title+' available? ', available);
          song.public = available;
        })
        .finally(next);
    } else {
      console.log('Updated %s matching %j',
        ctx.Model.songs,
        ctx.where);

        next();
    }


  });

  /*
   Song.afterRemote( 'save', function( ctx, next) {
   console.log('*** after creating ***');
   console.log('request: ',ctx.req);
   console.log();
   console.log('result: ',ctx.result);
   console.log();

   next();
   });*/


};
