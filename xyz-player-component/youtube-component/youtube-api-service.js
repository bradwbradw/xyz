"use strict";

angular.module("xyzPlayer")
  .factory("youTubeApiService", function ($q, $log, $window) {

    // borrowed from http://plnkr.co/edit/8lxuN8?p=info


    var apiDeferred = $q.defer();
    var apiReady = apiDeferred.promise;

    $window.onYouTubeIframeAPIReady = function () {
      $log.log('youtube API is ready');
      apiDeferred.resolve();
    };

    var youTubeApiService = {

      apiReady: apiReady
    };

    return youTubeApiService;


  });