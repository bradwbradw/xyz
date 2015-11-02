'use strict';

/**
 * @ngdoc service
 * @name xyzApp.Extract
 * @description
 * # Extract
 * Gets the artist, title, id and length from a service song URL
 */
angular.module('xyzApp')
  .service('Extract', function ($timeout, Server) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var recognizedServices = [
      {name: 'soundcloud', domains: ['soundcloud.com', 'www.soundcloud.com']},
      {name: 'youtube', domains: ['youtube.com', 'www.youtube.com', 'youtu.be', 'y2u.be']},
      {name: 'bandcamp', domains: ['bandcamp.com', 'www.bandcamp.com']}
    ];


    function contains(string, substring) {
      return string.indexOf(substring) > -1;
    }

    var Extract = {

      determineService: function (url) {


        var givenUrlParts = url.split('/');
        var result = false;

        _.each(recognizedServices, function (service) {

          if (!result) {
            _.each(service.domains, function (domain) {

              if (!result) {
                _.each(givenUrlParts, function (urlPart) {

                  if (!result && contains('.' + urlPart, domain)) {
                    result = service.name;
                  }
                });
              }
            });

          }


        });

        console.log('found result:', result);
        return result;
      },
      getData: function (service, url) {
        if (service === 'youtube') {
          return Extract.getDataFromYoutube(url);
        }

        if (service === 'bandcamp') {
          return Extract.getDataFromBandcamp(url);
        }

        if (service === 'soundcloud') {
          return Extract.getDataFromSoundcloud(url);
        }

      },
      getDataFromYoutube: function (url) {

        return $timeout(function () {
          var urlParts,id;

          if (contains(url, 'youtube.com')) {
            // full url - expect "v=" parameter
            urlParts = url.split('?');
            var usefulPart = urlParts[1];
            var idPartAlmost = usefulPart.split('v=');
            id = idPartAlmost[1].substr(0, 11);
            return {provider:'youtube',  provider_id:id };
          } else if (contains(url, 'youtu.be')) {

            urlParts = url.split('youtu.be/');
            id = urlParts[1].substr(0, 11);
            return {provider:'youtube',  provider_id:id };

          }

        });

      },

      getDataFromBandcamp: function(url){
          return Server.getBandcampId(url)
            .then(function (result) {
              return {provider:'bandcamp',provider_id: result.data};
            });

      }
    };

    return Extract;
  });
