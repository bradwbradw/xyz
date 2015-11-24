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

    var updateImportView = function (new_) {
      if(_.isArray(new_)){
        $scope.newItems = new_;
        console.log('array results:',new_);
      } else {
        $scope.newItem = new_;
      }
      $scope.fetchingSongData = false;

    };

    var updateArrayOfNewItems = function(arr){
      $scope.newItems = arr;
      $scope.fetchingSongData = false;
    };

    var invalidLink = function () {
      $scope.error = 'This looks like an invalid link.';
      $scope.fetchingSongData = false;

    };

    $scope.examineText = function (text) {
      if (!text) return;
      $scope.fetchingSongData = true;
      Extract.inspectText(text)
        .then(updateImportView, invalidLink)

    };

    $scope.downloadMorePosts = downloadMorePosts;
    $scope.reDownloadPosts = reDownloadPosts;

    $scope.newItem = newItem;

    $scope.Library = Library;
    $scope.Extract = Extract;
  });
