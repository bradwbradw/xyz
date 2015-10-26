var xyzApp = angular.module("xyzApp", ['ui.router', 'ngSanitize']);

xyzApp.constant('YT_event', {
  STOP: 0,
  PLAY: 1,
  PAUSE: 2,
  STATUS_CHANGE: 3
});


xyzApp.config(function ($stateProvider, $urlRouterProvider) {


  $stateProvider
    .state('list', {
      url: '/list',
      views: {
        'main': {
          templateUrl: 'views/song-table.html',
          controller: 'songTableCtrl',
          resolve: {
            songs: function (Library) {
              console.log('songs resolve');
              return Library.loadLibrary();
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
        playlist: function(Stream){
          console.log('stream resolve?');
          return Stream.reloadPlaylist();
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
          templateUrl: 'views/embeds/bandcamp.html'
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
