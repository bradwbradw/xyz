"use strict";
angular.module('xyzAdmin')
  .controller('AdminController', function ($scope, user, Dj) {
    $scope.user = user;
    $scope.Dj = Dj;
  });