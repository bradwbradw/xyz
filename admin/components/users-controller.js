angular.module('xyzAdmin')
  .controller('UsersController', function ($scope, $window, users, Dj) {

    var deleteUser = function (user) {

      if ($window.confirm('delete user with email ' + user.email + '? ')) {
        Dj.destroyById({id: user.id});
      }

    };

    $scope.deleteUser = deleteUser;

    $scope.users = users;
  });