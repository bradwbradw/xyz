xyzApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('base', {
      templateUrl: 'base.html',
      resolve: {
        publicSpaces: function (Space) {
          return Space.find({filter: {include: ["owner", "songs"], where: {public: true}}})
            .$promise;

        },
        user: function (User) {

          if (!User.get() && User.loggedIn()) {
            return User.fetchUserInfo()
              .catch(User.logout);

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
      }

    })
    .state('base.signup-login', {
      url: '/signup-login',
      views: {
        'main': {
          templateUrl: 'signup.html',
          controller: 'AccountCtrl'
        },
        'bar': {
          templateUrl: 'bar.html',
          controller: 'BarCtrl'
        }
      }
    })
    .state('base.account', {
      url: '/account',
      views: {
        'main': {
          templateUrl: 'account.html',
          controller: 'AccountCtrl'
        },
        'bar': {
          templateUrl: 'bar.html',
          controller: 'BarCtrl'
        }
      },
      resolve: {
        user: function (User) {
          return User.download()
            .catch(function () {
              return false;
            });
        }
      }
    })
    .state('base.landing', {
      url: '/',
      views: {
        'main': {
          templateUrl: 'landing.html',
          controller: 'LandingCtrl'
        },
        'bar': {
          templateUrl: 'bar.html',
          controller: 'BarCtrl'
        }

      }

    })

    .state('base.space', {
      params: {id: {value: 'defaultId'}},
      url: '/space/:id',
      views: {
        'main': {
          templateUrl: 'space.html',
          controller: 'SpaceCtrl'
        },
        'bar': {
          templateUrl: 'bar.html',
          controller: 'BarCtrl'
        }
      },
      resolve: {

        space: function ($stateParams, $log, $state, Space, Library) {
          return Library.fetchSpaceAndSongs($stateParams.id)
            .then(Library.space)
            .catch(function (err) {
              $log.error(err);
              $state.go('base.landing');
            });
        },
        spaceId: function ($stateParams) {
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

            if (owner.id === the_user.id) {
              return 'owner';
            } else if (_.find(space.contributors, {id: the_user.id})) {
              return 'contributor';
            } else {
              return 'viewer';
            }
          }

        },
        contributors: function () {
          return [];
        }
      }
    })
    .state('base.space.add', {

      url: '/add',
      views: {
        'sidebar':{
          templateUrl: 'sidebar/sidebar-add.html',
          controller: 'AddMediaCtrl'
        }
      }
    })
    .state('base.space.edit', {

      url: '/edit',
      views: {
        'sidebar': {
          templateUrl: 'sidebar/sidebar-edit.html',
          controller:'EditSpaceCtrl'
        }
      }
    })
    .state('base.space.info', {

      url: '/info',
      views: {
        'sidebar': {
          templateUrl: 'sidebar/sidebar-info.html'
        }
      }
    })
    .state('error', {
      template: '<h4>error</h4>'
    });
  $urlRouterProvider.otherwise('/');


});
