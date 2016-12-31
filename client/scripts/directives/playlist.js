angular.module('xyzApp').directive('playlist', function (Playlister) {

  return {
    restrict: 'A',
    templateUrl: 'xyzApp/playlist.html',
    scope: {},
    link: function (scope) {
    	
    	scope.Playlister = Playlister
    
    
		}
	}
}