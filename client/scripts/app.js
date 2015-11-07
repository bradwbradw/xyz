"use strict";

var xyzApp = angular.module("xyzApp",
  ['ui.router',
    'ngSanitize',
  'ezfb',
  'LocalStorageModule']);

xyzApp.constant('YT_event', {
  STOP: 0,
  PLAY: 1,
  PAUSE: 2,
  STATUS_CHANGE: 3
});

xyzApp.config(function($httpProvider){// jshint ignore:line
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

xyzApp.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('list', {
      url: '/list',
      views: {
        'main': {
          templateUrl: 'views/list.html',
          controller: 'listCtrl',
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
        playlist: function(Stream, Server){
          console.log('stream resolve?');
          return Server.refresh().then(function(){

            return Stream.reloadPlaylist();
          });
        }
      }

    })
    .state('social', {
      url:'/social',
      views: {
        'main':{
          templateUrl: 'views/social.html',
          controller:'SocialTestCtrl'
        }
      }

    })
    .state('xyzSpace', {
      url: '/space',
      views: {
        'main': {
          templateUrl: 'views/xyzspace.html'
        }
      }
    })
    .state('import', {
      url: '/import',
      views: {
        'top': {
          templateUrl: 'views/import.html',
          controller:'ImportCtrl'
        },
        'main': {
          templateUrl: 'views/localItems.html',
          controller:'LocalItemsCtrl'
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
