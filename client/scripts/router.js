xyzApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

//noinspection JSUnresolvedVariable
  $stateProvider
    .state('base', {
      templateUrl: 'base.html',
      resolve: {
        spacesResolve: function (Spaces, User, user, $window) {
          // depending on user is important, because internally,
          // Spaces checks for user ID from User service
          return Spaces.get()
            .catch(function(){
              User.logout()
                .then(function(){
                  $window.location.reload();
                });
            });
        },
        user: function (User) {
          return User.fetch();
        },
        // defaults: return false so that dependencies are happy
        space: function () {
          return false;
        },
        viewer: function () {
          return false;
        }
      }

    })
    .state('base.about', {
      url: '/about',
      views: {
        'main': {
          templateUrl: 'about.html',
          controller: function ($scope, content) {
            $scope.content = content;
          }
        },
        'bar': {
          templateUrl: 'bar.html'
        }
      },
      resolve: {
        content: function ($log, Content) {
          return Content.fetch()
            .then(function (content) {
              return content;
            })
            .catch(function (err) {
              $log.error(err);
              return {};
            });
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
      /* note - for the moment, this route is only accessed via email password reset link */
      url: '/account',
      views: {
        'main': {
          templateUrl: 'account-change-password.html',
          controller: 'AccountCtrl'
        },
        'bar': {
          templateUrl: 'bar.html',
          controller: 'BarCtrl'
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
      params: {id: {value: null}},
      url: '/space/:id/',
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

        space: function (spaceId, $log, $state, Spaces) {
          return Spaces.getById(spaceId)
            .catch(function (err) {
              $log.error('could not get space by id ' + spaceId, err);
              $state.go('base.landing');
            });
        },
        spaceId: function ($stateParams) {
          return $stateParams.id;
        },
        owner: function (space, Dj) {
          return Dj.findById(
            {
              id: _.get(space, 'owner.id'),
              filter: {
                fields: {
                  id: true,
                  name: true,
                  website: true
                }
              }
            })
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
            return 'stranger';
          } else {

            if (owner.id === the_user.id) {
              return 'owner';
            } else if (_.find(space.contributors, {id: the_user.id})) {
              return 'contributor';
            } else {
              return 'guest';
            }
          }

        },
        contributors: function (space) {
          return _.get(space, 'contributors', []);
        }
      }
    })
    .state('base.space.add', {
      views: {
        'sidebar': {
          templateUrl: 'sidebar/sidebar-add.html',
          controller: 'AddMediaCtrl'
        }
      }
    })
    .state('base.space.edit', {
      views: {
        'sidebar': {
          templateUrl: 'sidebar/sidebar-edit.html',
          controller: 'EditSpaceCtrl'
        }
      }
    })
    .state('base.space.info', {
      views: {
        'sidebar': {
          templateUrl: 'sidebar/sidebar-info.html',
          controller: 'EditSpaceCtrl'
        }
      }
    })
    .state('error', {
      template: '<h4>error</h4>'
    });
  $urlRouterProvider.otherwise('/');


});
