"use strict";

var xyzApp = angular.module("xyzApp",
  ['ui.router',
    'ngSanitize',
    'ezfb',
    'LocalStorageModule',
    'ngTouch',
    'ngResource',
    'lbServices']);

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

var errorAlert = function (err) {
  alert('error:   ' + JSON.stringify(err));
};

xyzApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(false);

  $stateProvider
    .state('base', {
      url: '',
      views: {
        'main@': {
          templateUrl: 'views/main/landing.html',
          controller: 'LandingCtrl'
        },
        'sidebar@': {
          templateUrl: 'views/sidebar/sidebar-container.html'
        }
      },
      resolve: {
        allSpaces: function (Space) {

          return Space.find({filter:{include:"owner"}});
        },
        user: function (User) {

          if (!User.get() && User.loggedIn()) {
            return User.fetchUserInfo()
              .catch(errorAlert);

          } else {
            return User.get();
          }
        }
      },


      onEnter: function (Library, User) {
        var libProm = Library.loadLibrary();

        if (User.get()) {
          User.fetchSpaces;
        }

      }
    })
    .state('space', {
      parent: 'base',
      url: '/space/:id',
      views: {
        'main@': {
          templateUrl: 'views/xyzspace.html',
          controller: 'SpaceCtrl'
        },
        'sidebar@': {
          templateUrl: 'views/sidebar/sidebar-container.html',
          controller: 'SidebarCtrl'
        }/*
        'importControls': {
          templateUrl: 'views/sidebar/import/control-search.html'
        },
        'importSelector': {
          templateUrl: 'views/sidebar/import/selector.html'
        }*/
      },
      resolve: {

        space: function ($stateParams, Space, Library) {
          return Space.findById({id: $stateParams.id,filter:{include:"Songs"} }, _.noop)
            .$promise
            .then(function(space){
              Library.currentSpace = space;
              return space;
            });
        },
        owner: function (space, Dj) {
          return Dj.findById({id: space.ownerId}, _.noop)
            .$promise;
        },
        viewer:function(owner, user, User){
          var the_user;

          if(User.get()){
            the_user = User.get();
          } else {
            the_user = user; // this should be the user from the 'base' state resolve
          }

          if(!the_user){
            return 'guest';
          } else {
            if( owner.id === the_user.id){
              return 'owner';
            } else {
              return 'user';
            }
          }

        }
      }
    })/*
    .state('import', {
      parent: 'base',
      url: '/import',
      views: {
        'main@': {
          controller: 'SpaceCtrl',
          templateUrl: 'views/xyzspace.html'
        },
        'preview': {
          template: 'views/test/stream.html'
        }
      }

    })

    .state('import.search', {
      url: '/search',
      views: {
        'importControls': {
          templateUrl: 'views/sidebar/import/control-search.html'
        },
        'importSelector': {
          templateUrl: 'views/sidebar/import/selector.html'

        }
      }
    })

    .state('import.explore', {
      url: '/explore',
      views: {
        'importControls': {
          templateUrl: 'views/sidebar/import/control-explore.html'
        },
        'importSelector': {
          templateUrl: 'views/sidebar/import/selector.html'

        }
      }
    })
*/
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
