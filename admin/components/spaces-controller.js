angular.module('xyzAdmin')
  .controller('SpacesController', function ($scope, $window, spaces, users, Space) {

    var setOwner = function (space, user) {

      if ($window.confirm('overwrite space "'+space.name+'"\'s owner with user "' + user.name + '" (' + user.email + ') ? ')) {
        space.owner = null;
        space.ownerId = user.id;
        space.$save();
      }

    };

    $scope.setOwner = setOwner;
    $scope.spaces = spaces;
    $scope.users = users;
  });
