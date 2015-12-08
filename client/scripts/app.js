"use strict";

var xyzApp = angular.module("xyzApp",
  ['ui.router',
    'ngSanitize',
    'ezfb',
    'LocalStorageModule',
  'ngTouch']);

xyzApp.constant('YT_event', {
  STOP: 0,
  PLAY: 1,
  PAUSE: 2,
  STATUS_CHANGE: 3
});

xyzApp.config(function ($httpProvider) {// jshint ignore:line
  /*
   $httpProvider.defaults.useXDomain = true;
   $httpProvider.defaults.withCredentials = true;
   delete $httpProvider.defaults.headers.common["X-Requested-With"];
   $httpProvider.defaults.headers.common["Accept"] = "application/json";
   $httpProvider.defaults.headers.common["Content-Type"] = "application/json";*/
});

xyzApp.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setStorageCookieDomain('');
});

xyzApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(false);

  $stateProvider
    .state('base', {
      url: '',
      views: {
        'main@': {
          templateUrl: 'views/main/landing.html'
        },
        'sidebar@': {
          templateUrl: 'views/sidebar.html'
        }
      },

      onEnter: function (Library) {
        var libProm = Library.loadLibrary();
      }
    })
    .state('mine', {
      parent: 'base',
      url: '/mine',
      views: {
        'main@': {
          controller: 'SpaceCtrl',
          templateUrl: 'views/xyzspace.html'
        },
        'preview@main':{
          template:'hello in mine state'
        },
        'sidebar@': {
          templateUrl: 'views/sidebar.html'
        }
      }
    })
    .state('import', {
      parent: 'base',
      url: '/import',
      views: {
        'main@': {
          controller: 'SpaceCtrl',
          templateUrl: 'views/xyzspace.html'
        },
        'preview':{
          template:'views/test/stream.html'
        },
        'sidebar@': {
          templateUrl: 'views/import/container.html',
          controller: 'ImportCtrl'
        },
        'importControls@sidebar': {
          templateUrl: 'views/import/control-search.html'
        },
        'importSelector@sidebar': {
          templateUrl: 'views/import/selector.html'
        }
      }

    })

    .state('import.search', {
      url: '/search',
      views: {
        'importControls': {
          templateUrl: 'views/import/control-search.html'
        },
        'importSelector': {
          templateUrl: 'views/import/selector.html'

        }
      }
    })

    .state('import.explore', {
      url: '/explore',
      views: {
        'importControls': {
          templateUrl: 'views/import/control-explore.html'
        },
        'importSelector': {
          templateUrl: 'views/import/selector.html'

        }
      }
    })

    .state('list', {
      parent: 'base',
      url: '/list',
      views: {
        'main@': {
          templateUrl: 'views/test/list.html',
          controller: 'listCtrl',
          resolve: {
            songs: function (Library) {
              return Library.loadLibrary();
            }
          }
        }

      }
    })
    .state('stream', {
      parent: 'base',
      url: '/stream',
      views: {
        'main@': {
          templateUrl: 'views/test/stream.html',
          controller: 'streamCtrl as stream'
        }
      },
      resolve: {
        playlist: function (Stream, Server) {
          return Server.refresh().then(function () {

            return Stream.reloadPlaylist();
          });
        }
      }

    })
    .state('social', {
      parent: 'base',
      url: '/social',
      views: {
        'main@': {
          templateUrl: 'views/test/social.html',
          controller: 'SocialTestCtrl'
        }
      }

    })

    .state('embeds', {
      parent: 'base',
      url: '/embeds',
      views: {
        'main@': {
          templateUrl: 'views/test/embed-tester.html'
        }
      }
    })
    .state('embeds.youtube', {
      parent: 'base',
      url: '/youtube',
      views: {
        'embed-container': {
          templateUrl: 'views/embeds/youtube.html'
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
    });

  $urlRouterProvider.otherwise('/');


});
