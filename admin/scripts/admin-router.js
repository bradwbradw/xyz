"use strict";

angular.module('xyzAdmin')
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

//noinspection JSUnresolvedVariable
    $stateProvider
      .state('base', {
        url: '/',
        views: {
          '': {
            templateUrl: 'base.html',
            controller: 'AdminController'
          }
        },
        resolve: {
          /*users: function (Spaces, Dj) {
           return Dj.get();
           }, */
          isAdmin: function ($log, $q, Dj) {
            // determined by presence of email in DJ.find() result
            return Dj.find().$promise
              .then(function (djs) {
                return !!_.first(djs).email;
              }).catch(function (err) {
                $log.error(err);
                return false;
            });
          },
          user: function (Dj, isAdmin) {
            if (isAdmin) {
              return Dj.getCurrent();
            }
          }
        },
        onEnter: function ($window, isAdmin) {
          if (isAdmin) {
          } else {
            $window.alert('Welcome to XYZ! Redirecting to the app');
            $window.location.assign('/');
          }
        }

      })
      .state('base.users', {
        url: 'users',
        views: {
          'main': {
            templateUrl: 'components/users.html',
            controller: 'UsersController'
          }
        },
        resolve: {
          users: function (Dj) {
            return Dj.find().$promise
          }
        }
      })



    .state('base.spaces',{
      url:'spaces',
      views:{
        main:{
          templateUrl: 'components/spaces.html', 
          controller:'SpacesController'
        }
      }, 
      resolve: {
          users: function (Dj) {
            return Dj.find().$promise;
          }, 
          spaces: function (Space) {
            return Space.find({filter:{include:['owner','contributors']}}).$promise;
          }
        }
    });

;
    $urlRouterProvider.otherwise('/');
  });
