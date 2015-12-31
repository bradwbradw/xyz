"use strict";

angular.module('xyzApp')

  .service('Server', function ($rootScope, $http, serverConfig) {

    var API = serverConfig.apiBaseUrl;

    var resetErrors = function(){
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

    return {

      getBandcampId: function (url) {
        return get('bandcampHelper?url=' + url);
      },

      getPlaylist: function () {
        return get('playlist');
      },

      getPlayhead: function () {
        return get('playhead');
      },

      refresh: function () {
        return get('refresh');
      },

      getLibrary: function () {
        return get('songs');
      },
      addSong: function (song) {
        return post('songs', song);
      },
      updateSong: function (id, data) {
        return put('songs/' + id, data);
      },
      deleteSong: function (id) {
        return restDelete('songs/' + id);
      },

      register: function(data){
        return post('api/djs', data);
      },

      login: function(data){
        return post('api/djs/login',data);
      },
      logout: function(token){
        return post('api/djs/logout?access_token='+token);
      },
      getUser: function(data){
        return get('api/djs/'+data.userId+'?access_token='+data.accessToken);
      },
      updateUser: function(id, token, data){
        return put('api/djs/'+id+'/?access_token='+token, data);
      }

    };
  });
