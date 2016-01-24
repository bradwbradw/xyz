/*
 * Chromeless player has no controls.
 */

// Update a particular HTML element with a new value
function updateHTML(elmId, value) {
  document.getElementById(elmId).innerHTML = value;
}

// This function is called when an error is thrown by the player
function onPlayerError(errorCode) {
  alert("An error occured of type:" + errorCode);
}

// This function is called when the player changes state
function onPlayerStateChange(newState) {
  updateHTML("playerState", newState);
}

// Display information about the current state of the player
function updatePlayerInfo() {
  // Also check that at least one function exists since when IE unloads the
  // page, it will destroy the SWF before clearing the interval.
  if(xyz_youtube && xyz_youtube.getDuration) {
    updateHTML("videoDuration", xyz_youtube.getDuration());
    updateHTML("videoCurrentTime", xyz_youtube.getCurrentTime());
    updateHTML("bytesTotal", xyz_youtube.getVideoBytesTotal());
    updateHTML("startBytes", xyz_youtube.getVideoStartBytes());
    updateHTML("bytesLoaded", xyz_youtube.getVideoBytesLoaded());
    updateHTML("volume", xyz_youtube.getVolume());
  }
}

// Allow the user to set the volume from 0-100
function setVideoVolume() {
  var volume = parseInt(document.getElementById("volumeSetting").value);
  if(isNaN(volume) || volume < 0 || volume > 100) {
    alert("Please enter a valid volume between 0 and 100.");
  }
  else if(xyz_youtube){
    xyz_youtube.setVolume(volume);
  }
}

function playVideo() {
  if (xyz_youtube) {
    xyz_youtube.playVideo();
  }
}

function pauseVideo() {
  if (xyz_youtube) {
    xyz_youtube.pauseVideo();
  }
}

function muteVideo() {
  if(xyz_youtube) {
    xyz_youtube.mute();
  }
}

function unMuteVideo() {
  if(xyz_youtube) {
    xyz_youtube.unMute();
  }
}


// This function is automatically called by the player once it loads
function onYouTubePlayerReady(playerId) {
  xyz_youtube = document.getElementById("xyz_youtube_embed");
  // This causes the updatePlayerInfo function to be called every 250ms to
  // get fresh data from the player
  setInterval(updatePlayerInfo, 250);
  updatePlayerInfo();
  xyz_youtube.addEventListener("onStateChange", "onPlayerStateChange");
  xyz_youtube.addEventListener("onError", "onPlayerError");
  //Load an initial video into the player
  xyz_youtube.cueVideoById("ylLzyHk54Z0");
}

// The "main method" of this sample. Called when someone clicks "Run".
function loadPlayer() {
  // Lets Flash from another domain call JavaScript
  var params = { allowScriptAccess: "always" };
  // The element id of the Flash embed
  var atts = { id: "xyz_youtube_embed" };
  // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
  swfobject.embedSWF("http://www.youtube.com/apiplayer?" +
                     "version=3&enablejsapi=1&playerapiid=player1", 
                     "videoDiv", "480", "295", "9", null, null, params, atts);
}​