'use strict';

/**
 * @ngdoc service
 * @name xyzApp.Extract
 * @description
 * # Extract
 * Gets the artist, title, id and length from a service song URL
 */
angular.module('xyzApp')
  .service('Extract', function ($timeout, Server, $log, MediaAPI, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var recognizedServices = [
      {name: 'soundcloud', domains: ['soundcloud.com', 'www.soundcloud.com']},
      {name: 'youtube', domains: ['youtube.com', 'www.youtube.com', 'youtu.be', 'y2u.be', 'youtube-nocookie.com']},
      {name: 'bandcamp', domains: ['bandcamp.com', 'www.bandcamp.com']}
    ];


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
        // text is not a URL!

          var ytSearch = MediaAPI.YT.search(text);
          var scSearch = MediaAPI.SC.search(text);

          return $q.all([ytSearch, scSearch]).
            then(function(ytResults, scResults){
              var returnArr= [];
              _.each(ytResults, function(ytResult){
                returnArr.push(ytResult);
              });
              _.each(scResults, function(scResult){
                returnArr.push(scResult);
              });
              return returnArr;
            });
        }
        // text is a URL!
        var inspectPromise = Extract.getData(text);

        inspectPromise
          .then(function (result) {
            console.log('inspectUrl done. result:', result);
            return result;

          })
          .catch(function (error) {
            console.error('inspectUrl failed: ', error);
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
              var parts = getAllUrlsFromString(attribute);

              if (parts) {
                console.log('parts:', parts);
                _.each(parts, function (part) {

                  service = determineService(part);
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
        } else if (input.source && input.link) {
          url = input.link;
        }

        var service = determineService(url);

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
      gatDataAsFBPost: function (post) {

      },
      getDataFromYoutube: function (url) {
        var cleanYTData = function (raw) {

          //PT#M#S
          var dur_string = raw.contentDetails.duration;
          var formattedTime = dur_string.replace("PT", "").replace("H", ":").replace("M", ":").replace("S", "");
          var hms_arr = formattedTime.split(':');
          var seconds = parseFloat(hms_arr.pop());
          if (hms_arr.length > 0) {
            seconds += parseFloat(hms_arr.pop()) * 60;  // minutes
          }
          if (hms_arr.length > 0) {
            seconds += parseFloat(hms_arr.pop()) * 60 * 60; // hours
          }

          var cleanData =
          {
            provider: 'youtube',
            provider_id: raw.id,
            artist: raw.snippet.channelTitle,
            title: raw.snippet.title,
            length: seconds,
            pic: "http://img.youtube.com/vi/" + raw.id + "/0.jpg",
            date_saved: new Date(),
            original_data: raw

          };
          console.log(cleanData);
          return cleanData;
        };

        var urlParts, id;

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
          .then(cleanYTData);

      },

      getDataFromBandcamp: function (url) {
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

        var cleanSCData = function (track) {
          return {
            provider: 'soundcloud',
            provider_id: track.id,
            artist: track.user.username,
            title: track.title,
            length: track.duration / 1000,
            url: track.permalink_url,
            stream: track.stream_url,
            pic: track.artwork_url,
            date_saved: new Date(),
            original_data: track

          }
        };
        return MediaAPI.SC.resolve(url)
          .then(cleanSCData);

        /*$q.all(
         [ ,
         $timeout(test,1500),
         $timeout(test, 2000)]
         );
         */

      }
    };

    return Extract;
  });
