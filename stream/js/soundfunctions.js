// soundfunctions.js
// stuff that directly works with soundmanager
// another version of these functions need to be written for youtube api


//var xyz_youtube;

     function fullBlast(){
//                   clearInterval(fading);

        theID = nowPlaying;
        localID = songByID(theID).local;
        if(songByID(theID).type == 'file') {
          soundManager.setVolume(smSongs[localID].id, 100);
        }
        if(songByID(theID).type == 'sc') {
          soundManager.setVolume(scSongs[localID].id, 100);
        }
        if(songByID(theID).type == 'yt') {
          xyz_youtube.setVolume(100);
          //reduce vol of youtube clip?
        }

     }

          // this is called when a song finishes
     //used by fadeOut - volume is incrementally reduced until it gets to 10, then song stops
     function reduceVol(){
          //debug.prepend('rv-'+currentSong+'<br/>');
//          console.log('reducing vol');
          songByID(currentSong).fadingOut = true;
          localPos = songByID(currentSong).local;
          type = songByID(currentSong).type;
//          console.log('after songbbyID calls');
          if( type == 'file'){

              currentVol = smSongs[localPos].volume;
//              console.log('just checked vol');
             // debug.prepend('vol: '+currentVol+'<br/>');
              if (currentVol>=10){
//                console.log('vol too high to stop song');
//              soundManager.setVolume(smSongs[localPos].id,currentVol-1);
                smSongs[localPos].setVolume(currentVol -1);
//                console.log('just reduced volume by 1');
//                console.log('vol is now '+smSongs[localPos].volume);
            }
              else {
//                   console.log('min vol reached. clearing interval and stopping song');
                   clearInterval(fading);
                   soundManager.stop(smSongs[localPos].id);
//                    soundManager.reboot();
//                   soundManager.stopAll();
                    songByID(currentSong).fadingOut = false;
                   smSongs[localPos].unload();
                   soundManager.setVolume(smSongs[localPos].id,100);
                    return;
              }

          } else if(type=='sc'){

              currentVol = scSongs[localPos].volume;
             // debug.prepend('vol: '+currentVol+'<br/>');
              if (currentVol>=10)
              soundManager.setVolume(scSongs[localPos].id,currentVol-1);
              else {
                   console.log('min vol reached. clearing interval and stopping song');
                   clearInterval(fading);
                   soundManager.stop(scSongs[localPos].id);
                    songByID(currentSong).fadingOut = false;
                    scSongs[localPos].unload();
                   soundManager.setVolume(scSongs[localPos].id,100);
              return;
              }



          }

          else if(type=='yt'){

//              currentVol = xyz_youtube.getVolume();

//              if (currentVol>=10)
//              xyz_youtube.setVolume(currentVol-1);
//              else {
                   console.log('min vol reached. clearing interval and stopping song');
                   xyz_youtube.setVolume(0);
                   clearInterval(fading);
                    songByID(currentSong).fadingOut = false;

      //            xyz_youtube.stopVideo();
                // stopVideo() here needs to happen in order for stopSong(id) to work.
                // the problem is that since xyz_youtube is the same player for all
                // youtube songs, it tends to stop when the fade out is done, 

 
 //                  xyz_youtube.setVolume(100);
              return;
//              }



          }

          console.log('end of reduceVol func');
     }

     function fadeOut(id){
      console.log('initiating fadeout for id '+id);
          currentSong = id;
          chunk = 4;
          fading = setInterval(reduceVol,chunk);
          return;
     }



    function playSong(theID){
          song_now = songByID(theID);
          if (song_now.fadingOut) return false;

//           clearInterval(fading);
           if ((typeof nowPlaying != "undefined")&&(anythingPlaying)){
                     stopSong(nowPlaying);
                }
           anythingPlaying = true;

            song_is_playing = false;

           localArrayID = $('div#song'+theID).attr('name');
                          //.replace(/\D/g,'');
            objID = songByID(theID).local;

            if(songByID(theID).type == 'file') {
                smSongs[objID].play({onfinish:playAnother});
                if (smSongs[objID].playState == 1){
                    song_is_playing = true;
                    nowPlaying = theID;
                }

            $('#video-container').css('bottom','-1000px');
            
            } else
            if (songByID(theID).type == 'yt') {
            //        ytSongs[ytID].playNow(youtube style);
            //    console.log("yooou toob its yoou tubee!");
//            xyz_youtube = document.getElementByID("xyz_youtube_embed");
//            loadTheYoutube(songs[theID].url);

            $('#video-container').css('bottom','10px');


//            xyz_youtube.loadVideoByUrl(songByID(theID).url);
            xyz_youtube.cueVideoByUrl(songByID(theID).url);

            //TODO - check to make sure vid is in 'playing' state
            song_is_playing = true;
           nowPlaying = theID;

            if (!iOS){
              xyz_youtube.playVideo();
            }
        
            } else
            if (songByID(theID).type == 'sc') {
              console.log('playing the soundcloud song id:'+theID);
                scSongs[objID].play({debugMode:true,onfinish:playAnother});

                $('#video-container').css('bottom','-1000px');
                if (scSongs[objID].playState == 1){
                    song_is_playing = true;
                    nowPlaying = theID;
                }
            }


//           setupClicks();


          window.setTimeout(fullBlast,1000);

          return song_is_playing;
     }

     
     function stopSong(theID){
          anythingPlaying = false;
          // assuming it's a soundmanager song..
          fadeOut(theID);


            if (songByID(theID).type == 'yt') {

              xyz_youtube.stopVideo();

            $('#video-container').css('bottom','-1000px');
          }


          //remove all click listeners on all buttons
//          $('span.playbutton').unbind('click');
//          $('span.stopbutton').unbind('click');

          //turn "this" song's button into a playbutton

          //re-set up all the click listeners on all buttons
//          setupClicks();
     }
