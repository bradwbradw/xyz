'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:Bar
 * @description
 * # Bar
 * 'hub'-like controller used for importing and saving. Connected to many services
 */
angular.module('xyzApp')
  .controller('BarCtrl', function ($scope, User, $state, space) {

    var editingUser;

    var deactivateEditing = function(){
        editingUser = false;
    };

    var isEditing = function(){
      return editingUser;
    };

    var setEditing = function(){
      editingUser = true;
    };

    var toggleEditing = function(){
      if(!isEditing()){
        setEditing();
      } else {
        deactivateEditing();
      }
    };

    deactivateEditing();

    var title = function(){
      if(space){
        return space.name
      }
      if ($state.is('base.space')){
        return $state.params;
      }
    };

    $scope.title = title;
    $scope.isEditing = isEditing;

    $scope.toggleEditing = toggleEditing;

    $scope.User = User;
  });
