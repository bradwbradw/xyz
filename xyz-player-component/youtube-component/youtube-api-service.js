"use strict";

angular.module("xyzPlayer")
  .factory("youTubeApiService", function ($q, $window) {

    // borrowed from http://plnkr.co/edit/8lxuN8?p=info


    var deferred = $q.defer();
    var apiReady = deferred.promise;

    $window.onYouTubeIframeAPIReady = function () {
      deferred.resolve();
    };

    var youTubeApiService = {

      onReady: function (callback) {
        apiReady.then(callback);
      }

    };

    return youTubeApiService;


  });