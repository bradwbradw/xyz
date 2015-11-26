'use strict';

/**
 * @ngdoc service
 * @name xyzApp.Extract
 * @description
 * # Extract
 * Gets the artist, title, id and length from a service song URL
 */
angular.module('xyzApp')
  .service('Extract', function ($timeout, Server, Utility, $log, MediaAPI, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var recognizedServices = [
      {name: 'soundcloud', domains: ['soundcloud.com', 'www.soundcloud.com']},
      {name: 'youtube', domains: ['youtube.com', 'www.youtube.com', 'youtu.be', 'y2u.be', 'youtube-nocookie.com']},
      {name: 'bandcamp', domains: ['bandcamp.com', 'www.bandcamp.com']}
    ];

    function convertFromYTEmbedUrl(embedUrl){
          // example: https://www.youtube.com/embed/xmSEhUwGd4Q?autoplay=1
      var parts = embedUrl.split('embed/');
      parts = parts[1].split('?');
      var standardUrl = 'https://youtube.com/watch?v='+parts[0];
      return standardUrl;

    }

    function contains(string, substring) {
      return string.indexOf(substring) > -1;
    }

    // returns array containing all URLS found in the string
    function getAllUrlsFromString(string) {
      var urlRegex = new RegExp("(^|[ \t\r\n])((|http|https|spotify|itunes):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))", "g");
      var urls = string.match(urlRegex); // array of urls in the post body
      if (urls && urls.length > 0) {
        return urls;
      } else {
        return false;
      }
    }


    function determineService(url) {
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
    }

    var Extract = {


      inspectText: function (text) {
        if (!getAllUrlsFromString(text)) {
          // text is not a URL! so search

          var ytSearch = MediaAPI.YT.search(text);
          var scSearch = MediaAPI.SC.search(text);

          return $q.all([ytSearch, scSearch]).
            then(function (results) {
              var ytResults = results[0];
              var scResults = results[1];

              var returnArr = [];
              _.each(ytResults, function (ytResult) {
                returnArr = returnArr.concat(Utility.clean.YT.video(ytResult));
              });
              _.each(scResults, function (scResult) {
                returnArr = returnArr.concat(Utility.clean.SC.track(scResult));
              });
              return returnArr;
            });
        }
        // text is a URL!
        var inspectPromise = Extract.getData(text);

        inspectPromise
          .then(function (result) {
            console.log('inspectText done. result:', result);
            return result;

          })
          .catch(function (error) {
            console.error('inspectText failed: ', error);
          });

        return inspectPromise;
      },

      findURL: function (mess) {

      },

      filterOutMusicUrls: function (posts) {
        var found = [];
        var service;

        _.each(posts.data, function (item) {
          _.each(item, function (attribute) {

            if (typeof attribute === 'string') {
              var urls = getAllUrlsFromString(attribute);

              if (urls) {
                console.log('urls:', urls);

                _.each(urls, function (url) {

                  service = determineService(url);
                  // TODO - at this point, also determine the Type of resource
                  //    (artist, playlist, etc.)
                  // TODO - at this point, there may be some urls that are actually
                  //    embeds.  Convert these to
                  if (service) {
                    var cleanParts = url.split('\n');
                    var cleanUrl;
                    if (cleanParts.length > 1) {
                      cleanUrl = cleanParts[1];
                      //newItem = {service: service, url: cleanParts[1], post_id: item.id};
                    } else {
                      cleanUrl = url;
                      //newItem = {service: service, url: url, post_id: item.id};
                    }

                    found.push(cleanUrl);
/*
                    Extract.getData(newItem.service, newItem.url)
                      .then(function (data) {
                        newItem.data = data;
                      })
                      .catch(function (error) {
                        newItem.data = error;
                      })
                      .finally(function () {
                        found.push(newItem);
                      })*/

                  }

                });


              }
            }

          })
        });
        return _.unique( found );


      },

      // input: either a string (url) OR a larger object (FB post)
      getData: function (input) {

        var url;

        if (typeof input === 'string') {
          // should be a url if it's a string
          url = input;
        } else if (input.source && input.link) {
          url = input.link;
        }

        var service = determineService(url);

        if (service === 'youtube') {
          return Extract.getDataFromYoutube(url)
            .catch(function(error){
              $log.error('getDataFromYoutube failed for url '+url+' error:'+error);
            });
        }

        if (service === 'bandcamp') {
          return Extract.getDataFromBandcamp(url)
            .catch(function(error){
              $log.error('getDataFromBandcamp failed for url '+url+' error:'+error);
            });
        }

        if (service === 'soundcloud') {
          return Extract.getDataFromSoundcloud(url)
            .catch(function(error){
              $log.error('getDataFromSoundcloud failed for url '+url+' error:', error);
              return $q.resolve('invalid soundcloud url');
            });
        } else {
          // url could still be bandcamp if the artist has a pro account (custom url)
          return Extract.getDataFromBandcamp(url)
            .catch(function(error){
              $log.error('getDataFromBandcamp failed for url '+url+' error:'+error);
            });
        }


      },
      gatDataAsFBPost: function (post) {

      },
      getDataFromYoutube: function (url) {

        var urlParts, id;

        // check to see if it's an embed
        // if so, convert into standard youtube link
        if( url.indexOf( 'embed') > -1){
          url = convertFromYTEmbedUrl(url);
        }
        if (contains(url, 'youtube.com')) {
          // full url - expect "v=" parameter2
          urlParts = url.split('?');
          var usefulPart = urlParts[1];
          var idPartAlmost = usefulPart.split('v=');
          id = idPartAlmost[1].substr(0, 11);

        } else if (contains(url, 'youtu.be')) {

          urlParts = url.split('youtu.be/');
          id = urlParts[1].substr(0, 11);
        }
        return MediaAPI.YT.get(id)
          .then(Utility.clean.YT.video);

      },

      getDataFromBandcamp: function (url) {

        if(url.indexOf( 'Embedded') >-1){
          // example: "https://bandcamp.com/EmbeddedPlayer/v=2/track=1190798612/size=large/tracklist=false/artwork=small/ref=http%3A%2F%2Ffacebook.com%2F/"
          var parts = url.split('track=');
          parts = parts[1].split('/');
          var id = parts[0];

          return $q.resolve({provider:'bandcamp', provider_id:id});
        }
        return Server.getBandcampId(url)
          .then(function (result) {
            return {provider: 'bandcamp', provider_id: result.data};
          });

      },

      getDataFromSoundcloud: function (url) {
        var test = function () {
          console.log('test done');
          return 3;
//            return {provider: 'soundcloud', provider_id: '228009072'};
        };

        return MediaAPI.SC.resolve(url)
          .then(function(result){
            console.log('soundcloud url resolves to:',JSON.stringify(result));

            return Utility.clean.SC[result.kind](result);

          });

      }
    };

    return Extract;
  });
