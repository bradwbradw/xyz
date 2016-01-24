  var video_url_suffix = "?version=3&enablejsapi=1&playerapiid=xyz_youtube&rel=0&fs=1&controls=1";
  var youtube_api_key = "AIzaSyAv5-et2TSQ3VsA5eKLviq2KjfExzFLxO8";
  var video_xml_prefix = "http://gdata.youtube.com/feeds/api/videos/";
  var ytDataHolder;
// DATA API PART ( Key needed )


  // The client id is obtained from the Google APIs Console at https://code.google.com/apis/console
// If you run access this code from a server other than http://localhost, you need to register
// your own client id.
var OAUTH2_CLIENT_ID = '__YOUR_CLIENT_ID__';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube'
];

// This callback is invoked by the Google APIs JS client automatically when it is loaded.
googleApiClientReady = function() {
  gapi.auth.init(function() {
    window.setTimeout(checkAuth, 1);
  });
};

// Attempt the immediate OAuth 2 client flow as soon as the page is loaded.
// If the currently logged in Google Account has previously authorized OAUTH2_CLIENT_ID, then
// it will succeed with no user intervention. Otherwise, it will fail and the user interface
// to prompt for authorization needs to be displayed.
function checkAuth() {
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true
  }, handleAuthResult);
}

// Handles the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
  if (authResult) {
    // Auth was successful; hide the things related to prompting for auth and show the things
    // that should be visible after auth succeeds.
    $('.pre-auth').hide();
    loadAPIClientInterfaces();
  } else {
    // Make the #login-link clickable, and attempt a non-immediate OAuth 2 client flow.
    // The current function will be called when that flow is complete.
    $('#login-link').click(function() {
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: false
        }, handleAuthResult);
    });
  }
}

// Loads the client interface for the YouTube Analytics and Data APIs.
// This is required before using the Google APIs JS client; more info is available at
// http://code.google.com/p/google-api-javascript-client/wiki/GettingStarted#Loading_the_Client
function loadAPIClientInterfaces() {
  gapi.client.load('youtube', 'v3', function() {
    handleAPILoaded();
  });
}



          // this chunk of code parses out the video id from the pasted url
          // does not work for youtu.be URLs
  function parseYoutubeID(url){
          // url format: http://www.youtube.com/v/Az3SHeMHC6c?version=3&enablejsapi=1
          // 
/*chromelss*///          url = "http://www.youtube.com/v/"+video_id+"?version=3&enablejsapi=1";

          var video_id = url.split('v=')[1];
          var ampersandPosition = video_id.indexOf('&');
          if(ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
          }
          return video_id;
        }



// JAVASCRIPT API WIDGET PART (no key needed)

  function getYTData(id){/*
  requestURL =   video_xml_prefix + id;

  $.ajax({
    url:requestURL,
    xhrFields: { withCredentials: true  }
  }).done( function(data) {
    ytDataHolder = data;

  });
*/


}

  function loadTheYoutube(url) {
        /*
        * Simple player embed
        */
        if(!url){
        url = "http://www.youtube.com/v/eqDDd7W4Zmw"+video_url_suffix;
      }
      //  url = '';
        // The video to load.
        // Lets Flash from another domain call JavaScript
        var params = { allowScriptAccess: "always" };
        // The element id of the Flash embed
        var atts = { id: "xyz_youtube_embed" };
        // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
        swfobject.embedSWF(url,
          "videoDiv", "400", "300", "9", null, null, params, atts);

        // FROM DOCS
     }

  function onYouTubePlayerReady(playerId) {
        xyz_youtube = document.getElementById("xyz_youtube_embed");
        xyz_youtube.addEventListener("onError", "onPlayerError");
        xyz_youtube.addEventListener("onStateChange", "onytplayerStateChange");
        $('#video-container').css('bottom','-1000px');

      }

  function onytplayerStateChange(newState) {
//   alert("Player's new state: " + newState);
   if (newState===0) playAnother();
  }





google.load("swfobject", "2.1");
google.setOnLoadCallback(loadTheYoutube(null));


// swfobject.embedSWF(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj)
/*
wfUrlStr - This is the URL of the SWF. Note that we have appended the enablejsapi and playerapiid parameters to the normal YouTube SWF URL to enable JavaScript API calls.
replaceElemIdStr - This is the HTML DIV id to replace with the embed content. In the example above, it is ytapiplayer.
widthStr - Width of the player.
heightStr - Height of the player.
swfVersionStr - The minimum required version for the user to see the content. In this case, version 8 or above is needed. If the user does not have 8 or above, they will see the default line of text in the HTML DIV.
xiSwfUrlStr - (Optional) Specifies the URL of your express install SWF. Not used in this example.
flashVarsObj - (Optional) Specifies your FlashVars in name:value pairs. Not used in this example.
parObj - (Optional) The parameters for the embed object. In this case, we've set allowScriptAccess.
AttObj - (Optional) The attributes for the embed object. In this case, we've set the id to myytplayer.
*/