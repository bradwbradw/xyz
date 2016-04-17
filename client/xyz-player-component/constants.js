angular.module('xyzPlayer')
  .constant('serverConfig', {
    apiBaseUrl: 'http://0.0.0.0:5005/',// '/',
    developing: true
  })
  .constant('apiKeys', {
    sc: 'c29e4129f2bba3771a5472a65cad37e4',

    yt: 'AIzaSyAv5-et2TSQ3VsA5eKLviq2KjfExzFLxO8',

    fb_app_id: '1507355422928214'// PROD: '1381485208848570'
  })
  .constant('YT_event', {
    STOP: 0, PLAY: 1, PAUSE: 2, STATUS_CHANGE: 3
  })
  .constant('SC_event', {
    STOP: 10, PLAY: 11, PAUSE: 12, STATUS_CHANGE: 13
  });
