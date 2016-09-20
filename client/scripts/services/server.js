"use strict";

angular.module('xyzApp')

  .service('Server', function ($rootScope, $http, $q, $log, serverConfig, Dj, Space) {

    var API = serverConfig.apiBaseUrl;
    $log.debug('api url is', API);
    var domain = API.replace('api/', '');

    var resetErrors = function () {
      $rootScope.error = '';
    };

    var get = function (item) {
      resetErrors();
      return $http.get(API + item);
    };

    var post = function (place, item) {
      resetErrors();
      return $http.post(API + place, item);
    };

    var put = function (place, item) {
      resetErrors();
      return $http.put(API + place, item);
    };

    var restDelete = function (item) {
      resetErrors();
      return $http.delete(API + item);
    };

    var resCall = function (lbResourceCall, data) {

      var resPromise = function (resource) {
        if (!resource) {
          return $q.reject('no resource provided');
        }

        if (!resource.$promise) {
          return $q.reject('no promise found in resource');
        }
      };

      return lbResourceCall({}, data, resPromise).$promise;
    };

    var Server = {

      updateSpace: function (spaceId, attrs) {
        return Space.prototype$updateAttributes({id: spaceId}, attrs).$promise;

      },

      loopback: {
        Dj: {
          create: function (data) {
            return resCall(Dj.create, data)
              .catch(function (err) {
                return $q.reject(err);
              });
          }, login: function (data) {
            return resCall(Dj.login, data)
              .catch(function (err) {
                return $q.reject(err);
              });
          }
          // ... and so on...
          // fixme: make more generic, somehow
          //  so that
        }


      },

      getBandcampId: function (url) {
        return get('bandcampHelper?url=' + url);
      },

      searchUsers: function (query) {
        var regexp = '/' + query + '/i';
        var filter = {
          filter: {
            "where": {
              "name": {
                "regexp": regexp
              }
            }
          }
        };

        return Dj.find(filter).$promise
          .then(function (result) {
            return result;
          })
          .catch(function (err) {
            return $q.reject(err);
          });
      },

      addContributorToSpace: function (spaceId, djId) {

        var url = 'spaces/' + spaceId + '/contributors/rel/' + djId;
        return put(url)
          .then(function (result) {
            return result.data;
          });

      },

      // sends the email with a temp access token
      resetPassword: function (email) {
        if (!email) {
          return $q.reject('please enter the email address you used to sign up');
        } else {
          return $http.post(domain + 'password-reset/send-request', {email: email})
            .catch(function (response) {
              $log.error(_.get(response, 'data'));
              return $q.reject(_.get(response, 'data'));
            });

        }
      },
      // updates the password
      updatePassword: function (newPassword, token) {
        return $http.post(
          domain + 'password-reset/update',
          {password: newPassword},
          {headers: {'Authorization': token}})
      }


    };

    return Server;
  });
