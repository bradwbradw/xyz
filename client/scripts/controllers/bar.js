'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:Bar
 * @description
 * # Bar
 * 'hub'-like controller used for importing and saving. Connected to many services
 */
angular.module('xyzApp')
  .controller('BarCtrl', function ($rootScope, $scope, $timeout, $state, User, Spaces, Social, viewer, Utility, UserSettings, Playlister) {

    var settingsIsOpen;

    var closeSettings = function () {
      settingsIsOpen = false;
    };
    var settingsOpen = function () {
      return settingsIsOpen;
    };
    var openSettings = function () {
      settingsIsOpen = true;
    };
    var toggleSettings = function () {

      if (!$state.is('base.space') && $state.includes('base.space')) {
        // we are in a substate of base.space
        $state.go('^');
      }

      if (!settingsOpen()) {
        openSettings();
      } else {
        closeSettings();
      }
    };
    closeSettings();

    var isEditing;
    var stopEditing = function () {
      isEditing = false;
    };
    var userIsEditing = function () {
      return isEditing;
    };
    var startEditing = function () {
      isEditing = true;
    };
    var toggleEditing = function () {
      if (!userIsEditing()) {
        startEditing();
      } else {
        stopEditing();
      }
    };
    stopEditing();

    var title = function () {
      if (Spaces.current()) {
        return _.get(Spaces.current(), 'name', '(untitled)');
      }
      if ($state.is('base.space')) {
        return $state.params;
      }
    };

    var showSignupLoginLink = function () {
      $log.log('state current is ', $state.current);
      return !User.get() && $state.current.indexOf('signup') > -1;
    };

    var showSpaceEditorIcons = function () {
      return User.get() && (viewer === 'owner' || viewer === 'contributor');
    };

    var showInfoButton = function () {
      return (viewer === 'stranger') || (viewer === 'guest');
    };

    var parentStateIfActiveElseGoTo = function (stateName) {

      closeSettings();

      if ($state.is(stateName)) {
        $state.go('^');
      } else {
        $state.go(stateName);
      }

    };

    var saveUserInfo = function (edits) {
      return User.update(edits)
        .catch(Utility.showError);
      // do not call UserEditsForm.$setPristine in here
      // the form controller is not in scope.
    };

    $scope.saveUserInfo = saveUserInfo;
    $scope.showInfoButton = showInfoButton;
    $scope.parentStateIfActiveElseGoTo = parentStateIfActiveElseGoTo;
    $scope.showSpaceEditorIcons = showSpaceEditorIcons;
    $scope.showSignupLoginLink = showSignupLoginLink;
    $scope.Utility = Utility;
    $scope.Playlister = Playlister;

    $scope.title = title;
    $scope.Spaces = Spaces;

    $rootScope.settingsOpen = settingsOpen;
    $scope.UserSettings = UserSettings;
    $scope.userIsEditing = userIsEditing;

    $rootScope.toggleSettings = toggleSettings;
    $scope.toggleEditing = toggleEditing;

    $scope.viewer = viewer;
    $scope.User = User;
    $scope.Social = Social;
  });
