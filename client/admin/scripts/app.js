
  var SongApp = angular.module("songApp", ['ui.router']);


  SongApp.config(function ($stateProvider, $urlRouterProvider) {


    $stateProvider
        .state('songs', {
          url: '/',
          views: {
            'main': {
              templateUrl: 'views/song.html',
              controller: 'songsCtrl',
              resolve:{
                songs: function(Songs){
                  console.log('songs resolve');
                  return Songs.getSongs();
                }
              }
            }
          }
        });

    $urlRouterProvider.otherwise('/');


  });
