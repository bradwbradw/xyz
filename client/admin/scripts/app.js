var SongApp = angular.module("songApp", ['ui.router', 'ngSanitize']);

SongApp.constant('YT_event', {
  STOP: 0,
  PLAY: 1,
  PAUSE: 2,
  STATUS_CHANGE: 3
});


SongApp.config(function ($stateProvider, $urlRouterProvider) {


  $stateProvider
    .state('list', {
      url: '/list',
      views: {
        'main': {
          templateUrl: 'views/song-table.html',
          controller: 'songTableCtrl',
          resolve: {
            songs: function (Songs) {
              console.log('songs resolve');
              return Songs.loadSongs();
            }
          }
        }
      }
    })
    .state('stream', {
      url: '/stream',
      views: {
        'main': {
          templateUrl: 'views/stream.html',
          controller: 'streamCtrl as stream'
        }
      },
      resolve:{
        currentSong: function(Stream){
          return Stream.getCurrentSong();
        },
        nextSong: function(Stream){
          return Stream.getNextSong();
        }
      }

    })
    .state('embeds', {
      url:'/embeds',
      views: {
        'main':{
          templateUrl: 'views/embed-tester.html'
        }
      }

    })
    .state('embeds.youtube', {
      url: '/youtube',
      views: {
        'embed-container': {
          templateUrl: 'views/embeds/youtube.html'
        },
        onEnter: function (Player) {

        }

      }

    })
    .state('embeds.soundcloud', {
      url: '/soundcloud',
      views: {
        'embed-container': {
          templateUrl: 'views/embeds/soundcloud.html'
        }

      }


    })
    .state('embeds.bandcamp', {
      url: '/bandcamp',
      views: {
        'embed-container': {
          templateUrl: 'views/embeds/bandcamp.html',
          controller:'bancampHackAutoplay'
        }

      }


    })
    .state('xyzSpace', {
      url: '/space',
      views: {
        'main': {
          templateUrl: 'views/xyzspa'
        }
      }
    });

  $urlRouterProvider.otherwise('/');


});
