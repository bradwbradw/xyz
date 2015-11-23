'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:ImportCtrl
 * @description
 * # ImportCtrl
 * 'hub'-like controller used for importing and saving. Connected to many services
 */
angular.module('xyzApp')
  .controller('ImportCtrl', function ($timeout, Extract, Library, Social, localStorageService, $scope, $log, $q) {


    var newItem = '';

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

    var updateNewItemInfo = function (newItem) {
      $scope.newItem = newItem;
      $scope.fetchingSongData = false;

    };

    var invalidLink = function () {
      $scope.error = 'This looks like an invalid link.';
      $scope.fetchingSongData = false;

    };

    $scope.examineUrl = function (url) {
      if (!url) return;
      $scope.fetchingSongData = true;
      Extract.inspectUrl(url)
        .then(updateNewItemInfo, invalidLink)

    };

    $scope.downloadMorePosts = downloadMorePosts;
    $scope.reDownloadPosts = reDownloadPosts;

    $scope.newItem = newItem;

    $scope.Library = Library;
    $scope.Extract = Extract;
  });
