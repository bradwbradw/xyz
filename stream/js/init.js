// initialization setup and stuff
          var songs = [];
          var num;// init vars
          var smSongs = []; //soundmanager (physical files) songs
          var ytSongs = []; //youtube songs
          var scSongs = []; //soundcloud songs
          
          var currentSong;
          var strictness = 50;
          var blacklist = [];
          
          
          var fading; // this is the id of the setInterval object
          var nowPlaying;
          var anythingPlaying = false;
          var soundcloudKey = 'bbb313c3d63dc49cd5acc9343dada433';
          var iOS;
          var android;
              distances = [];
          var played = [];
          
          var greatestID;
          var dbSongs;
          
          var mouseX = 0;
          var mouseY = 0;

          var targetX = 800;
          var targetY = 800;

          mouseDown = false;


var db_endpoint = xyz_root_dir+"data/db.php";
var upload_endpoint = xyz_root_dir+'data/upload.php';
//window.history.pushState("","","/"+user);

soundManager.setup({

    // location: path to SWF files, as needed (SWF file name is appended later.)

    url: 'includes/sm/swf/',
    preferFlash: false,
    debugMode: true,
    useHTML5Audio: true,

    // optional: version of SM2 flash audio API to use (8 or 9; default is 8 if omitted, OK for most use cases.)
    // flashVersion: 9,

    // use soundmanager2-nodebug-jsmin.js, or disable debug mode (enabled by default) after development/testing
    // debugMode: false,

    onready: function() {

         //    loadAll();
         // other services?




     $('#closeButton').click(function(){
          target = '#'+$(this).attr('name');
          $(target).hide();
      });

      $('#popupButton').click(function(){

          popup.toggle();
      });
      debug = $('#debug');

     // function for loading songs from sidebar into main area
     // TODO make appear in a random place
     // TODO disable the listener for ones already loaded
     // TODO add delete button to boxes
     $('.available').click(function(){

         // CREATE SONG STRUCTURE
          $(this).css('background-color','white');
          //id = $(this).attr('id');
          url = $(this).html();

          newSong(url, 'file');

     });

     $('#scLoad').click(function(){
        url = $('#scInput').val();
        newSong(url, 'sc');
     });


     $('button#load').click(function(){
        loadAll();
     });

      $('button#clear').click(function(){
        deleteDB();
      });


      $('#hidePanel').click( function(){
        $('#sidebar').toggle();
        $('button.navButton').toggle();
        $(this).show();
      });

      $('#filespanel').click(function(){
        $('.panel').hide();
        $('div#files').show();
      });

      $('#scpanel').click(function(){
        $('.panel').hide();
        $('div#soundcloud').show();
      });


loadAll(user);

          
    },

      // optional: ontimeout() callback for handling start-up failure

    ontimeout: function() {
        // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
        // See the flashblock demo when you want to start getting fancy.
    }
});

jQuery(document).ready(function(){
  $(window).scrollLeft(500);
  $(window).scrollTop(500);
             $(document).mousemove(function(e){
              mouseX = e.pageX;// + $(window).scrollLeft();
              mouseY = e.pageY;// + $(window).scrollTop();
             });
             $(document).mousedown(function(f){
              mouseDown = true;
             });
             
             $(document).mouseup(function(g){
              mouseDown = false;
             });
             
android = false;
iOS = false,
    p = navigator.platform;

if( p === 'iPad' || p === 'iPhone' || p === 'iPod' ){
    iOS = true;
}

if( p === 'android'){
  android = true;
}
          });



