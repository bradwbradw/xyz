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
                if(_.first(djs).email){
                  return true
                } else {
                  return false;
                }
              }).catch(function (err) {
                $log.error(err);
                return $q.reject(err);
            });
          },
          user: function (Dj, isAdmin) {
            if (isAdmin) {
              return Dj.getCurrent();
            }
          }
        },
        onEnter: function ($window, $http, isAdmin, user, serverConfig) {
          if (isAdmin) {
            $http.get(serverConfig.apiBaseUrl + 'admin/auth');
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
      });
    $urlRouterProvider.otherwise('/');
  });