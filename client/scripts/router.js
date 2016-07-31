xyzApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('base', {
      templateUrl: 'views/base.html',
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
      }/*,
       views:{
       'xyzPlayer': {
       template: '<div xyz-player ',
       controller: function(){

       }
       }
       }
       */

    })
    .state('base.landing', {
      url: '/',
      views: {
        'main': {
          templateUrl: 'views/landing.html',
          controller: 'LandingCtrl'
        },
        'bar': {
          templateUrl: 'views/bar.html',
          controller: 'BarCtrl'
        }

      },
      onEnter: function (Library, User, Social, $q, $log, publicSpaces, localStorageService, Server) {

        Social.FB.refreshFB();

        var fetchSpacePlaylists = function (spaces) {

          var playlistLoads = [];
          _.each(spaces, function (space) {
            var playlistLoad = Server.getPlaylist(space.id)
              .then(function (result) {
//                $log.debug('playlist load complete:', result);

                _.set(_.find(publicSpaces, {id: result.space.id}), 'playlist', result.playlist);
                _.set(_.find(User.getSpaces().own, {id: result.space.id}), 'playlist', result.playlist);
                _.set(_.find(User.getSpaces().editable, {id: result.space.id}), 'playlist', result.playlist);
                return result.playlist;
              }).catch(function (err) {
                $log.error('playlist load failed: ', err);
              });
            playlistLoads.push(playlistLoad)
          });

          return $q.all(playlistLoads);

        };


        fetchSpacePlaylists(_.union(publicSpaces, User.getSpaces().own, User.getSpaces().editable ))
          .then(function (playlists) {
            $log.log('all playlists loaded:', playlists);
            localStorageService.set('playlists', playlists);
            _.each(playlists, function (playlist) {

            })
          })
          .catch(function (err) {
            $log.error(err);
          });


      }

    })

    .state('base.space', {
      url: '/space/:id',
      views: {
        'main': {
          templateUrl: 'views/space.html',
          controller: 'SpaceCtrl'
        },
        'bar': {
          templateUrl: 'views/bar.html',
          controller: 'BarCtrl'
        },
        'sidebar': {
          templateUrl: 'views/sidebar/sidebar-container.html',
          controller: 'SidebarCtrl'
        },
        'importControls': {
          templateUrl: 'views/sidebar/sidebar-add.html'
        },
        'importSelector': {
          templateUrl: 'views/sidebar/selector.html',
          controller: 'SidebarCtrl'
        }
      },
      resolve: {

        space: function ($stateParams, $log, $state, Space, Library) {
          return Library.fetchSpaceAndSongs($stateParams.id)
            .then(Library.space)
            .catch(function(err){
              $log.error(err);
              $state.go('base.landing');
            });
        },
        spaceId: function($stateParams){
          return $stateParams.id;
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
        viewer: function (owner, user, User, space) {
          var the_user;

          if (User.get()) {
            the_user = User.get();
          } else {
            the_user = user; // this should be the user from the 'landing' state resolve
          }

          if (!the_user) {
            return 'guest';
          } else {

            if (owner.id === the_user.id || _.find(space.contributors, {id:the_user.id})) {
              return 'owner';
            } else {
              return 'viewer';
            }
          }

        },
        contributors: function(){
          return [];
        }
      }
    })
    .state('base.space.add', {

      url: '',
      views: {
        'importControls': {
          templateUrl: 'views/sidebar/sidebar-add.html'
        },
        'importSelector': {
          templateUrl: 'views/sidebar/selector.html'

        }
      }
    })
    .state('base.space.edit', {

      url: '',
      views: {
        'editSpace': {
          templateUrl: 'views/sidebar/sidebar-edit.html'
        }
      }
    })
    .state('error',{
    template: '<h4>error</h4>'
  });
  $urlRouterProvider.otherwise('/');


});
