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

    function convertFromYTEmbedUrl(embedUrl) {
      // example: https://www.youtube.com/embed/xmSEhUwGd4Q?autoplay=1
      var parts = embedUrl.split('embed/');
      parts = parts[1].split('?');

      return 'https://youtube.com/watch?v=' + parts[0];

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
//        console.log('found result:'+result+' ('+url+')');
        return result;
      } else {
        return false;
      }
    }

    var Extract = {

      inspectText: function (text, filters) {
        if (!getAllUrlsFromString(text)) {
          // text is not a URL! so search

          var searchPromises = [];
          _.each(filters, function (active, providerName) {
            if (active) {
              searchPromises.push(MediaAPI[providerName].search(text, 15));
            } else {
              searchPromises.push($q.resolve([]));
            }
          });

          return $q.all(searchPromises).then(function (resultLists) {

            var allResults = [];
            _.each(['youtube', 'soundcloud'], function (provider) {

              var providerResults = _.get(_.find(resultLists, {provider: provider}),'results',[]);

              var cleanResults = _.map(providerResults, Utility.clean[provider].mediaItem);
              allResults = _.concat(allResults, cleanResults);

            });

              // TODO sort by relevency
              // ( ie. how close to original search text, and possible other params)
            return allResults;
          });
        }
        // text is a URL!
        var inspectPromise = Extract.getData(text);

        inspectPromise
          .then(function (result) {
            result.urlResult = true;
            return result;

          })
          .catch(function (error) {
            console.error('inspectText failed: ', error);
          });

        return inspectPromise;
      },

      filterOutMusicUrls: function (posts) {
        var found = [];
        var service;

        _.each(posts.data, function (item) {
          _.each(item, function (attribute) {

            if (typeof attribute === 'string') {
              var urls = getAllUrlsFromString(attribute);

              if (urls) {
//                console.log('urls:', urls);

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
        return _.uniq(found);


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
            .catch(function (error) {

              $log.error('getDataFromYoutube failed for url ' + url + ' error:' + error);
              return $q.resolve({error: 'invalid youtube url:' + url, url: url});
            });
        }

        if (service === 'bandcamp') {
          return Extract.getDataFromBandcamp(url)
            .catch(function (error) {
              $log.error('getDataFromBandcamp failed for url ' + url + ' error:' + error);
              return $q.resolve({error: 'invalid bandcamp url:' + url, url: url});
            });
        }

        if (service === 'soundcloud') {
          return Extract.getDataFromSoundcloud(url)
            .catch(function (error) {
              $log.error('getDataFromSoundcloud failed for url ' + url + ' error:', error);
              return $q.resolve({error: 'invalid soundcloud url:' + url, url: url});
            });
        } else {
          // url could still be bandcamp if the artist has a pro account (custom url)
          return Extract.getDataFromBandcamp(url)
            .catch(function (error) {
              $log.error('getDataFromBandcamp failed for url ' + url + ' error:' + error);
              return $q.resolve({error: 'invalid bandcamp url:' + url, url: url});
            });
        }


      },

      getDataFromYoutube: function (url) {

        var urlParts, id;

        // check to see if it's an embed
        // if so, convert into standard youtube link
        if (url.indexOf('embed') > -1) {
          url = convertFromYTEmbedUrl(url);
        }
        if (contains(url, 'youtube.com')) {
          // full url - expect "v=" parameter2
          urlParts = url.split('?');
          if (!_.isArray(urlParts) || urlParts.length < 2) {

            console.warn('weird youtube url ' + url);
            return $q.reject('youtube url has no ? params');
          }
          var usefulPart = urlParts[1];
          var idPartAlmost = usefulPart.split('v=');
          if (!_.isArray(idPartAlmost) || idPartAlmost.length < 2) {

            console.warn('weird youtube url ' + url);
            return $q.reject('youtube url has no id');
          }
          id = idPartAlmost[1].substr(0, 11);

        } else if (contains(url, 'youtu.be')) {

          urlParts = url.split('youtu.be/');
          id = urlParts[1].substr(0, 11);
        }
        return MediaAPI.youtube.get(id)
          .then(function (result) {
            $log.log('youtube get result:', result);
            return result;
          })
          .then(Utility.clean.youtube.mediaItem);

      },

      getDataFromBandcamp: function (url) {

        if (url.indexOf('Embedded') > -1) {
          // example: "https://bandcamp.com/EmbeddedPlayer/v=2/track=1190798612/size=large/tracklist=false/artwork=small/ref=http%3A%2F%2Ffacebook.com%2F/"
          var parts = url.split('track=');

          if (!_.isArray(parts) || parts.length < 2) {
            console.warn('weird bandcamp url ' + url);
            return $q.reject('bandcamp confused: url is ' + url);
          }
          parts = parts[1].split('/');
          var id = parts[0];

          return $q.resolve({provider: 'bandcamp', provider_id: id, url: url, kind: 'media'});
        }

        if (url.indexOf('/track/') < 0) {
          // url is not for a track (could be album, artist, merch...)
          var kind = Utility.clean.BC.parseUrlForType(url);
          return $q.resolve({provider: 'bandcamp', url: url, kind: kind})
        }
        return Server.getBandcampId(url)
          .then(function (result) {
            return {provider: 'bandcamp', provider_id: result.data, url: url, kind: 'media'};
          });

      },

      getDataFromSoundcloud: function (url) {
        var test = function () {
          console.log('test done');
          return 3;
//            return {provider: 'soundcloud', provider_id: '228009072'};
        };

        return MediaAPI.soundcloud.resolve(url)
          .then(function (result) {

            return Utility.clean.SC[result.kind](result);

          });

      }
    };

    return Extract;
  });
