"use strict";

angular.module('xyzApp')

  .service('Server', function ($rootScope, $http, $q, serverConfig, Dj) {

    var API = serverConfig.apiBaseUrl;

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
/*
        if (resource.$promise.$resolved) {
          return resource.$promise.resolve(resource);
            // or maybe $q.resolve(resource);
        } else {
          return resource.$promise.reject('something bad happened');
            // or maybe $q.reject(resource);
        }*/
      };

      return lbResourceCall({}, data, resPromise).$promise;
    };

    return {

      loopback: {
        Dj: {
          create: function (data) {
            return resCall(Dj.create, data)
              .catch(function (err) {
                return $q.reject(err);
              });
          },
          login: function (data) {
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
      }
      ,

      getPlaylist: function () {
        return get('playlist');
      }
      ,

      getPlayhead: function () {
        return get('playhead');
      }
      ,

      refresh: function () {
        return get('refresh');
      }
      ,

      getLibrary: function () {
        return get('api/songs');
      }
      ,
      addSong: function (song) {
        return post('api/songs', song);
      }
      ,
      updateSong: function (id, data) {
        return put('api/songs/' + id, data);
      }
      ,
      deleteSong: function (id) {
        return restDelete('api/songs/' + id);
      }
      ,

      registerDj: function (data) {
        var theResource = Dj.create({}, data, resPromise);
        return theResource.$promise;
//        return post('api/djs', data);
      }
      ,

      login: function (data) {
        return Dj.login({}, data, resPromise).$promise;
      }
      ,
      logout: function (token) {
        return post('api/djs/logout?access_token=' + token);
      }
      ,
      getUser: function (data) {
        return get('api/djs/' + data.userId + '?access_token=' + data.accessToken);
      }
      ,
      updateUser: function (id, token, data) {
        return put('api/djs/' + id + '/?access_token=' + token, data);
      }


    }
      ;
  });
