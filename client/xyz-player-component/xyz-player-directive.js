"use strict";

angular.module("xyzApp")
  .directive('xyzPlayer', function ($log, $q, $timeout, MockMediaProvider, youTubeApiService, Server) {

    return {
      restrict: "A",

      scope: {},

      templateUrl: 'xyz-player-component/xyz-player.html',


      link: function (scope, element, attrs, $rootScope) { //jshint ignore:line

        var mediaProviders = {
          youtube: {},
          soundcloud: {},
          bandcamp: {},
          mock: {}
        };

        var defaultProviderFunctions = {
          play: {},
          pause: {},
          cueAndPlay:{},
          volume: {},
        };

        var providerInitFunctions = {
          mock: function () {
            $log.debug('xyzPlayer sees MockMediaProvider');
            mediaProviders.mock.play = MockMediaProvider.play;
            mediaProviders.mock.pause = MockMediaProvider.pause;
            mediaProviders.mock.cueAndPlay = function(provider_id){

              return MockMediaProvider.loadSong(provider_id)
                .then(MockMediaProvider.play);

            };
            mediaProviders.mock.loading.resolve();
//                MockMediaProvider.play();
          }
        };

        _.each(mediaProviders, function (provider, index) {
          mediaProviders[index] = defaultProviderFunctions;
          mediaProviders[index].loading = $q.defer();
        });


        MockMediaProvider.onReady(function(){
          providerInitFunctions.mock();
        });

        //TODO turn into actual callbacks after SC, YT providers load.

        mediaProviders.youtube.loading.resolve();
        mediaProviders.soundcloud.loading.resolve();
        mediaProviders.bandcamp.loading.resolve();

        var serviceProvidersLoaded = $q.all(
          [mediaProviders.youtube.loading,
          mediaProviders.soundcloud.loading,
          mediaProviders.bandcamp.loading,
          mediaProviders.mock.loading]
        );

        var loadPlaylist = function (spaceId) {

          if (spaceId === 'mock') {
            return $timeout(mockPlaylist, 700);
          }
          return Server.getPlaylist(spaceId);
        };


        var status = 'initializing';
        var playlist = false;
        var space = false;

        var play = function () {

        };
        var nowPlaying = {};
        var getNowPlaying = function(){
          return nowPlaying;
        };

        var setNowPlaying = function(songObj){
          nowPlaying = songObj;
        };

        var nextSong = function(songObjThatJustFinished){
          if(!songObjThatJustFinished){
            return playlist[0];
          } else {
            var indexOfSongThatJustFinished = _.indexOf(playlist, songObjThatJustFinished);
            if (_.size(playlist) === indexOfSongThatJustFinished + 1){
              return playlist[0];
            } else {
              return playlist[indexOfSongThatJustFinished + 1];
            }
          }

        };

        var go = function(){

          var songToPlay = nextSong(getNowPlaying());

          mediaProviders[songToPlay.provider].cueAndPlay(songToPlay.provider_id)
            .then(function(){
              setNowPlaying(songToPlay);
            })
            .catch(function(err){
              $log.error(err);
            });
        };

        $q.all([loadPlaylist(attrs.space), serviceProvidersLoaded])
          .then(function (results) {
            $log.debug('all media providers and playlist loaded', results);
            playlist = results[0].playlist;
            space = results[0].space;

            var firstSong = playlist[0];


          });


        scope.getNowPlaying = getNowPlaying;
        scope.status = status;
        scope.playlist = playlist;
        scope.space = space;
        scope.nowPlaying = nowPlaying;

        scope.play = play;


        /*              youTubeApiService.onReady(function(){
         $log.debug('xyzPlayer sees youTubeApiService')
         })*/
      }
    }
  });


var mockPlaylist = function () {
  return {
    space: {
      id: "0",
      name: "mock space",
      ownerId: "mockerson",
      public: true,
      songs: []
    },
    playlist: [{
      "artist": "an artist",
      "title": "mock media 5 seconds",
      "url": "https://mock.url",
      "provider": "mock",
      "provider_id": "5",
      // provider id for mock playlist corresponds to the length of the song
      "pic": "https://i.ytimg.com/vi/Hphwfq1wLJs/hqdefault.jpg",
      "description": "Watch the official music video for Rod Stewart's \"Do Ya Think I'm Sexy?\" from his album 'Blondes Have More Fun' The song was released as a single in late ...",
      "date_saved": "2016-03-11T16:17:17.894Z",
      "original_data": {
        "kind": "youtube#searchResult",
        "etag": "\"q5k97EMVGxODeKcDgp8gnMu79wM/2BEtiXfTPigIUpk2TusIUnGqSxs\"",
        "id": {
          "kind": "youtube#video",
          "videoId": "Hphwfq1wLJs"
        },
        "snippet": {
          "publishedAt": "2009-10-29T21:26:44.000Z",
          "channelId": "UCWEtnEiVwUy7mwFeshyAWLA",
          "title": "Rod Stewart - Da Ya Think I'm Sexy? (Official Video)",
          "description": "Watch the official music video for Rod Stewart's \"Do Ya Think I'm Sexy?\" from his album 'Blondes Have More Fun' The song was released as a single in late ...",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/Hphwfq1wLJs/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/Hphwfq1wLJs/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/Hphwfq1wLJs/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "channelTitle": "RhinoEntertainment",
          "liveBroadcastContent": "none"
        }
      },
      "x": 123,
      "y": 91,
      "kind": "media",
      "id": "0",
      "date_created": "2016-03-11T16:17:21.209Z",
      "distances": [
        {
          "distance": 226.6142096162551,
          "id": "56e5c5b395da6211f41e204f"
        },
        {
          "distance": 279.5943490129942,
          "id": "56e5c5b495da6211f41e2051"
        },
        {
          "distance": 291.247317584214,
          "id": "56e2efa7ff13560481f347d4"
        },
        {
          "distance": 311.8108400937979,
          "id": "56e5c5b295da6211f41e204d"
        }
      ]

    },
      {
        "artist": "another artist",
        "title": "mock media 10 seconds",
        "url": "https://mock.url",
        "provider": "mock",
        "provider_id": "10",
        "pic": "https://i.ytimg.com/vi/Hphwfq1wLJs/hqdefault.jpg",
        "description": "Watch the official music video for Rod Stewart's \"Do Ya Think I'm Sexy?\" from his album 'Blondes Have More Fun' The song was released as a single in late ...",
        "date_saved": "2016-03-11T16:17:17.894Z",
        "original_data": {
          "kind": "youtube#searchResult",
          "etag": "\"q5k97EMVGxODeKcDgp8gnMu79wM/2BEtiXfTPigIUpk2TusIUnGqSxs\"",
          "id": {
            "kind": "youtube#video",
            "videoId": "Hphwfq1wLJs"
          },
          "snippet": {
            "publishedAt": "2009-10-29T21:26:44.000Z",
            "channelId": "UCWEtnEiVwUy7mwFeshyAWLA",
            "title": "Rod Stewart - Da Ya Think I'm Sexy? (Official Video)",
            "description": "Watch the official music video for Rod Stewart's \"Do Ya Think I'm Sexy?\" from his album 'Blondes Have More Fun' The song was released as a single in late ...",
            "thumbnails": {
              "default": {
                "url": "https://i.ytimg.com/vi/Hphwfq1wLJs/default.jpg",
                "width": 120,
                "height": 90
              },
              "medium": {
                "url": "https://i.ytimg.com/vi/Hphwfq1wLJs/mqdefault.jpg",
                "width": 320,
                "height": 180
              },
              "high": {
                "url": "https://i.ytimg.com/vi/Hphwfq1wLJs/hqdefault.jpg",
                "width": 480,
                "height": 360
              }
            },
            "channelTitle": "RhinoEntertainment",
            "liveBroadcastContent": "none"
          }
        },
        "x": 123,
        "y": 91,
        "kind": "media",
        "id": "0",
        "date_created": "2016-03-11T16:17:21.209Z",
        "distances": [
          {
            "distance": 226.6142096162551,
            "id": "56e5c5b395da6211f41e204f"
          },
          {
            "distance": 279.5943490129942,
            "id": "56e5c5b495da6211f41e2051"
          },
          {
            "distance": 291.247317584214,
            "id": "56e2efa7ff13560481f347d4"
          },
          {
            "distance": 311.8108400937979,
            "id": "56e5c5b295da6211f41e204d"
          }
        ]
      }
    ]
  };
};
