'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:ImportCtrl
 * @description
 * # ImportCtrl
 * 'hub'-like controller used for importing and saving. Connected to many services
 */
angular.module('xyzApp')
  .controller('ImportCtrl', function ($timeout, Extract, Library, Social, localStorageService, $scope, $q) {



    var lastInspection;

    var inspectUrl = function (url) {

      var inspectPromise = Extract.getDataFromSoundcloud(url);

      inspectPromise
        .then(function (result) {
          console.log('resolve then - set the result to ', result);
          $scope.inspectionResult = result;

        })
        .catch(function(error){
          console.error(error);
        });

      lastInspection = inspectPromise;
    };

    var inspectionResult = false;


    var addToLocalItems = function (newItems) {
      Library.localItems = Library.localItems.concat(newItems);
      localStorageService.set('localItems', Library.localItems);
    };

    var replaceLocalItems = function (newItems) {
      Library.localItems = newItems;
      localStorageService.set('localItems', Library.localItems);
    };

    var downloadMorePosts = function () {

      Social.FB.loadPosts()
        .then(Extract.filterOutMusicUrls)
        .then(addToLocalItems);
    };

    var reDownloadPosts = function () {

      Social.FB.loadPosts()
        .then(Extract.filterOutMusicUrls)
        .then(replaceLocalItems);

    };


    $scope.downloadMorePosts = downloadMorePosts;
    $scope.reDownloadPosts = reDownloadPosts;

    $scope.inspectUrl = inspectUrl;
    $scope.inspectionResult = inspectionResult;

  });
