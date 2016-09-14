'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:Bar
 * @description
 * # Bar
 * 'hub'-like controller used for importing and saving. Connected to many services
 */
angular.module('xyzApp')
  .controller('BarCtrl', function ($scope, User, $state, space, Social, Utility) {

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

    var showSignupLoginLink = function(){
      $log.log('state current is ', $state.current);
      return !User.get() && $state.current.indexOf('signup') > -1;
    };

    $scope.showSignupLoginLink = showSignupLoginLink;
    $scope.Utility = Utility;

    $scope.title = title;
    $scope.space = space;

    $scope.settingsOpen = settingsOpen;
    $scope.userIsEditing = userIsEditing;

    $scope.toggleSettings = toggleSettings;
    $scope.toggleEditing = toggleEditing;

    $scope.User = User;
    $scope.Social = Social;
  });
