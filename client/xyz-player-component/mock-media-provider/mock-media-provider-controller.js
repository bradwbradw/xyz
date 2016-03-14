



angular.module('xyzApp').controller('mockProviderCtrl', function($scope, MockMediaProvider){
  $scope.MockMediaProvider = MockMediaProvider;
  // perhaps this should go in it's on subdirectory, as part of the mock provider ctrl.  perhaps it should not
  // (might find that the other providers need a controller as well
});