
  var SongApp = angular.module("songApp", ['ui.router']);


  SongApp.config(function ($stateProvider, $urlRouterProvider) {


    $stateProvider
        .state('list', {
          url: '/list',
          views: {
            'main': {
              templateUrl: 'views/song-table.html',
              controller: 'songListCtrl',
              resolve:{
                songs: function(Songs){
                  console.log('songs resolve');
                  return Songs.getSongs();
                }
              }
            }
          }
        })
      .state('embeds', {
        url: '/embeds',
        views: {
          'main':{
            templateUrl: 'views/embed-tester.html',
            controller: 'embedTesterCtrl',
            resolve:{

            }
          }
        }

    })
      .state('embeds.youtube',{
        url: '/youtube',
        views: {
          'embed-container':{
            templateUrl:'views/embeds/youtube.html'
          },
          onEnter:function(Player){

          }

        }

      })
      .state('embeds.soundcloud',{
        url: '/soundcloud',
        views: {
          'embed-container':{
            templateUrl:'views/embeds/soundcloud.html'
          }

        }


      })
      .state('embeds.bandcamp',{
        url: '/bandcamp',
        views: {
          'embed-container':{
            templateUrl:'views/embeds/bandcamp.html'
          }

        }


      })
      .state('xyzSpace',{
        url:'/space',
        views: {
          'main':{
            templateUrl: 'views/xyzspa'
          }
        }
      });

    $urlRouterProvider.otherwise('/');


  });
