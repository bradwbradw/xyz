'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:Bar
 * @description
 * # Bar
 * 'hub'-like controller used for importing and saving. Connected to many services
 */
angular.module('xyzApp')
  .controller('BarCtrl', function ($scope, User, $state, space, Social) {

    var settingsIsOpen;
    var closeSettings = function(){
        settingsIsOpen = false;
    };
    var settingsOpen = function(){
      return settingsIsOpen;
    };
    var openSettings = function(){
      settingsIsOpen = true;
    };
    var toggleSettings = function(){
      if(!settingsOpen()){
        openSettings();
      } else {
        closeSettings();
      }
    };
    closeSettings();

    var isEditing;
    var stopEditing = function(){
        isEditing = false;
    };
    var userIsEditing = function(){
      return isEditing;
    };
    var startEditing = function(){
      isEditing = true;
    };
    var toggleEditing = function(){
      if(!userIsEditing()){
        startEditing();
      } else {
        stopEditing();
      }
    };
    stopEditing();

    var title = function(){
      if(space){
        return space.name
      }
      if ($state.is('base.space')){
        return $state.params;
      }
    };

    var fixUrl = function(domainOrUrl){
      if (domainOrUrl.indexOf('://') > -1){
        return domainOrUrl;
      } else {
        return 'https://'+domainOrUrl;
      }
    };

    $scope.fixUrl = fixUrl;

    $scope.title = title;
    $scope.settingsOpen = settingsOpen;
    $scope.userIsEditing = userIsEditing;

    $scope.toggleSettings = toggleSettings;
    $scope.toggleEditing = toggleEditing;

    $scope.User = User;
    $scope.Social = Social;
  });
