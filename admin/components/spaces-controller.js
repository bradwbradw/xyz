angular.module('xyzAdmin')
  .controller('SpacesController', function ($scope, $window, users, Dj) {

    var setOwner = function (space, user) {

      if ($window.confirm('overwrite space '+space.name+' owner with user ' + user.name + ' (' + user.email + ') ? ')) {
      
      }

    };

    $scope.setOwner = setOwner;
    $scope.spaces = spaces
    $scope.users = users;
  });
