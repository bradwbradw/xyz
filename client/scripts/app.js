"use strict";

var xyzApp = angular.module("xyzApp",
  ['ui.router',
    'ngSanitize',
    'ezfb',
    'LocalStorageModule',
//    'ngTouch',
    'ngResource',
    'lbServices',
    'ls.LiveSet',
    'ls.ChangeStream'
  ]);

xyzApp.constant('YT_event', {
  STOP: 0,
  PLAY: 1,
  PAUSE: 2,
  STATUS_CHANGE: 3
});

xyzApp.constant('SC_event', {
  STOP: 10,
  PLAY: 11,
  PAUSE: 12,
  STATUS_CHANGE: 13,
  CUE_AND_PLAY:14
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

  if (_.isObject(err)) {
    var message = _.get(err, 'data.error.message', '') + '\n';
    message += 'status: ' + _.get(err, 'status', '') + '\n';
    message += _.get(err, 'config.url', '') + '\n';
    message += _.get(err, 'statusText', '') + '\n';
  } else {
    var message = err;
  }


  console.error(message);
  alert(message);
};

xyzApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('base', {
      url: '/',
      views: {
        'main@': {
          templateUrl: 'views/main/landing.html',
          controller: 'LandingCtrl'
        },
        'sidebar@': {
          templateUrl: 'views/sidebar/sidebar-container.html',
          controller: 'SidebarCtrl'
        }
      },
      resolve: {
        publicSpaces: function (Space) {

          return Space.find({filter: {include: "owner", where: {public: true}}})


        },
        user: function (User) {

          if (!User.get() && User.loggedIn()) {
            return User.fetchUserInfo()
              .catch(errorAlert);

          } else {
            return User.get();
          }
        },
        viewer: function () {
          return false;
        },
        space: function () {
          return false;
        }
      },


      onEnter: function (Library, User, Social, $q, $log, publicSpaces, localStorageService, Server) {

        if (User.get()) {
          User.fetchSpaces;
        }

        Social.FB.refreshFB();

        var fetchPublicSpacePlaylists = function (spaces) {


          var playlistLoads = [];
          _.each(spaces, function (space) {
            var playlistLoad = Server.getPlaylist(space.id)
              .then(function (result) {
                $log.debug('playlist load complete:', result);
                return result.data;
              }).catch(function (err) {
                $log.error('playlist load failed: ', err);
              });
            playlistLoads.push(playlistLoad)
          });

          return $q.all(playlistLoads);

        };

        fetchPublicSpacePlaylists(publicSpaces)
          .then(function (playlists) {
            $log.log('all playlists loaded:', playlists);
            localStorageService.set('playlists', playlists);
          })
          .catch(function (err) {
            $log.error(err);
          });


      }
    })
    .state('space', {
      parent: 'base',
      url: 'space/:id',
      views: {
        'main@': {
          templateUrl: 'views/xyzspace.html',
          controller: 'SpaceCtrl'
        },
        'sidebar@': {
          templateUrl: 'views/sidebar/sidebar-container.html',
          controller: 'SidebarCtrl'
        },
        'importControls': {
          templateUrl: 'views/sidebar/import/control-search.html'
        },
        'importSelector': {
          templateUrl: 'views/sidebar/import/selector.html'
        }
      },
      resolve: {

        space: function ($stateParams, Space, Library) {
          return Library.fetchSpaceAndSongs($stateParams.id)
            .then(Library.space);
        },
        owner: function (space, Dj) {
          return Dj.findById(
            {
              id: space.ownerId,
              filter: {
                fields: {
                  id: true,
                  name: true,
                  website: true
                }
              }
            }, _.noop)
            .$promise
            .then(function (owner) {
              space.owner = owner;
              return owner;
            });
        },
        viewer: function (owner, user, User) {
          var the_user;

          if (User.get()) {
            the_user = User.get();
          } else {
            the_user = user; // this should be the user from the 'base' state resolve
          }

          if (!the_user) {
            return 'guest';
          } else {

            if (owner.id === the_user.id) {
              return 'owner';
            } else {
              return 'viewer';
            }
          }

        }
      }
    })
    .state('space.search', {

      url: '',
      views: {
        'importControls': {
          templateUrl: 'views/sidebar/import/control-search.html'
        },
        'importSelector': {
          templateUrl: 'views/sidebar/import/selector.html'

        }
      }
    })
    .state('space.url', {

      url: '',
      views: {
        'importControls': {
          templateUrl: 'views/sidebar/import/control-url.html'
        },
        'importSelector': {
          templateUrl: 'views/sidebar/import/selector.html'

        }
      }
    })

    .state('space.explore', {
      url: '',
      views: {
        'importControls': {
          templateUrl: 'views/sidebar/import/control-explore.html'
        },
        'importSelector': {
          templateUrl: 'views/sidebar/import/selector.html'

        }
      }
    })
    .state('list', {
      parent: 'base',
      url: 'list',
      views: {
        'main@': {
          templateUrl: 'views/test/list.html',
          controller: 'listCtrl',
          resolve: {
            songs: function (Library) {
              return Library.fetchSpaceAndSongs();
            }
          }
        }

      }
    })
    .state('stream', {
      parent: 'base',
      url: 'stream',
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

    .state('embeds', {
      parent: 'base',
      url: 'embeds',
      views: {
        'main@': {
          templateUrl: 'views/test/embed-tester.html'
        }
      }
    })
    .state('embeds.youtube', {
      parent: 'base',
      url: 'youtube',
      views: {
        'embed-container': {
          templateUrl: 'views/embeds/youtube.html'
        }
      }
    })
    .state('embeds.soundcloud', {
      url: 'soundcloud',
      views: {
        'embed-container': {
          templateUrl: 'views/embeds/soundcloud.html'
        }
      }
    })
    .state('embeds.bandcamp', {
      url: 'bandcamp',
      views: {
        'embed-container': {
          templateUrl: 'views/embeds/bandcamp.html'
        }
      }
    });

  $urlRouterProvider.otherwise('/');


});
