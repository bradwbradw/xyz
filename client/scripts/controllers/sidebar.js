'use strict';

/**
 * @ngdoc function
 * @name xyzApp.controller:SidebarCtrl
 * @description
 * # SidebarCtrl
 * Controller of the xyzApp
 */
angular.module('xyzApp')
    .controller('SidebarCtrl', function ($scope, $timeout, $q, $window, $state, viewer, space, Space, Social, User, Server) {


        $scope.deleteViaConfirm = function (service, object) {
            console.log('...');

            if ($window.confirm('are you sure you want to delete the space?')) {
                return service.destroyById({id: object.id}, _.noop)
                    .$promise
                    .then(User.fetchSpaces)
                    .then(function(){
                        $state.go('base');
                    })
                    .catch(function (err) {
                        return $q.reject(err);
                    });
            }

        };

        $scope.viewer = viewer;
        $scope.space = space;
        $scope.Space = Space;

        $scope.Server = Server;

        $scope.FB = Social.FB
    });
