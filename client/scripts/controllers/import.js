'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:ImportCtrl
 * @description
 * # ImportCtrl
 * 'hub'-like controller used for importing and saving. Connected to many services
 */
angular.module('xyzApp')
  .controller('ImportCtrl', function (Extract, Library, Social, localStorageService, $scope) {

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

    var reDownloadPosts = function(){

      Social.FB.loadPosts()
        .then(Extract.filterOutMusicUrls)
        .then(replaceLocalItems);

    };



    $scope.downloadMorePosts = downloadMorePosts;
    $scope.reDownloadPosts = reDownloadPosts;

  });
