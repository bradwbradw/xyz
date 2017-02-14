"use strict";

//noinspection JSUnresolvedVariable
angular.module('xyzApp')

  .service('Content', function ($http, $q, $log, serverConfig) {

    var contentMap = null;
    var Content = {

      get: function () {
        return contentMap;
      },
      fetch: function () {
        if (Content.get()) {
          return $q.resolve(Content.get());
        } else {
          return Content.download()
            .then(Content.save);
        }
      },
      save: function (newContent) {
        contentMap = newContent;
        return contentMap;
      },
      download: function () {
        return $http.get(serverConfig.cmsUrl + 'api/content')
          .then(function (result) {
            return result.data;
          })
          .catch(function (err) {
            $log.error(err);
            return $q.reject(err);
          })
      }

    };


    return Content;

  });