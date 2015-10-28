"use strict";

angular.module("xyzApp")
  .factory("youTubeApiService", function($q, $window) {

    // borrowed from http://plnkr.co/edit/8lxuN8?p=info

  var deferred = $q.defer();
  var apiReady = deferred.promise;

  $window.onYouTubeIframeAPIReady = function() {
    deferred.resolve();
  };

  return {
    onReady: function(callback) {
      apiReady.then(callback);
    }
  };

});