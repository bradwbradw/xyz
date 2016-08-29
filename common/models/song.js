

var MediaApi = require('../../server/controllers/media-api.js');

module.exports = function (Song) {


  Song.observe('before save', function (context, next) {

    // what is context.instance and context.data?
    // https://docs.strongloop.com/display/APIC/Operation+hooks#Operationhooks-Operationhookcontextobject

    var item = context.instance || context.data;
    if (item) {
      MediaApi.checkForAvailability(item)
        .then(function(available){
          console.log(item.title+' available? ', available);
          item.public = available;
        })
        .finally(next);
    } else {
      console.error('Song before save hook error: no item found ');

        next();
    }


  });

  /*
   Song.afterRemote( 'save', function( context, next) {
   console.log('*** after creating ***');
   console.log('request: ',context.req);
   console.log();
   console.log('result: ',context.result);
   console.log();

   next();
   });*/


};
