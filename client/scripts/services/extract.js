'use strict';

/**
 * @ngdoc service
 * @name xyzApp.Extract
 * @description
 * # Extract
 * Gets the artist, title, id and length from a service song URL
 */
angular.module('xyzApp')
  .service('Extract', function ($timeout, Server, $window) {
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

        if (result) {
          console.log('found result:', result);
          return result;

        } else {
          return false;
        }
      },

      findURL: function (mess) {

      },

      filterOutMusicUrls: function (posts) {
        var found = [];
        var service;

        _.each(posts.data, function (item) {
          _.each(item, function (attribute) {

            if (typeof attribute === 'string') {
              var urlRegex = new RegExp("(^|[ \t\r\n])((|http|https|spotify|itunes):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))", "g");
              var parts = attribute.match(urlRegex); // array of urls in the post body
              if (parts && parts.length > 0) {
                console.log('parts:', parts);
                _.each(parts, function (part) {

                  service = Extract.determineService(part);
                  if (service) {
                    var cleanParts = part.split('\n');
                    var newItem;
                    if (cleanParts.length > 1) {
                      newItem = {service: service, url: cleanParts[1], post_id: item.id};
                    } else {
                      newItem = {service: service, url: part, post_id: item.id};
                    }

                    Extract.getData(newItem.service, newItem.url)
                      .then(function (data) {
                        newItem.data = data;
                      })
                      .catch(function (error) {
                        newItem.data = error;
                      })
                      .finally(function () {
                        found.push(newItem);
                      })

                  }

                });

              }
            }

          })
        });
        return _.unique(found, 'url');


      },

      // input: either a string (url) OR a larger object (FB post)
      getData: function (input) {

        var url;

        if (typeof input === 'string') {
          // should be a url if it's a string
          url = input;
        } else if (input.source && input.link){
          url = input.link;


        }
          var service = Extract.determineService(url);

          if (service === 'youtube') {
            return Extract.getDataFromYoutube(url);
          }

          if (service === 'bandcamp') {
            return Extract.getDataFromBandcamp(url);
          }

          if (service === 'soundcloud') {
            return Extract.getDataFromSoundcloud(url);
          } else {
            // url could still be bandcamp if the artist has a pro account (custom url)
            return Extract.getDataFromBandcamp(url);
          }


      },
      gatDataAsFBPost:function(post){

      },
      getDataFromYoutube: function (url) {

        return $timeout(function () {
          var urlParts, id;

          if (contains(url, 'youtube.com')) {
            // full url - expect "v=" parameter
            urlParts = url.split('?');
            var usefulPart = urlParts[1];
            var idPartAlmost = usefulPart.split('v=');
            id = idPartAlmost[1].substr(0, 11);
            return {provider: 'youtube', provider_id: id};
          } else if (contains(url, 'youtu.be')) {

            urlParts = url.split('youtu.be/');
            id = urlParts[1].substr(0, 11);
            return {provider: 'youtube', provider_id: id};

          }

        });

      },

      getDataFromBandcamp: function (url) {
        return Server.getBandcampId(url)
          .then(function (result) {
            return {provider: 'bandcamp', provider_id: result.data};
          });

      },

      getDataFromSoundcloud: function (url) {
        return $timeout(
          function () {
            return {provider:'soundcloud', provider_id:'228009072'};
          }
        )

      }
    };

    return Extract;
  });
