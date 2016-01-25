// ui.js
// layout functions, playback mechanics



jQuery(document).ready(function(){
	var add_a_song =
     // "<div class='newSongUI' id='upload'><span class=plus>+</span>upload</div>"+
            "<div class='newSongUI' id='addSoundcloud'> <span class=plus>+</span>soundcloud</div>"+
            "<div class='newSongUI' id='addYoutube'> <span class=plus>+</span>youtube</div>";

			$add_dialogue = $('#add_a_song');
      $add_dialogue.html(add_a_song);

if(editable)  {
      $('#area').click(function(){

          console.log('clicked on the area');
          $add_dialogue.html(  add_a_song);
          $add_dialogue.toggle();
          

          $add_dialogue.css('left',mouseX).css('top',mouseY).css('width','102px').css('height','125px');


          targetX = mouseX;
          targetY = mouseY;

          songPopupClicks();

      });
    }

	});

function songPopupClicks(){

uploader_html = '<div id="uploader"><input id="fileupload" type="file" name="files[]" data-url="server/php/" '+
' multiple><div id="progress"><div class="bar" style="width: 0%;"></div></div></div>';

uploader_html = writeTop() + writeBottom();

        $('#upload').click(function(){
        $add_dialogue.empty();
        $add_dialogue.html(uploader_html);


        init_uploader();

      });



        $('#addSoundcloud').click(function(){
        $add_dialogue.empty();
        $add_dialogue.html("paste a soundcloud url:<br/><input type='text' id='soundcloud_input'></input><button id='soundcloud_go' name='soundcloud_go'>add</button>");
        $('#soundcloud_go').click(function(){
          url = $('#soundcloud_input').val();
          newSong(url,'sc');
          $add_dialogue.hide();

        });

      });

        $('#addYoutube').click(function(){
        $add_dialogue.empty();
        $add_dialogue.html("paste a youtube url:<br/><input type='text' id='youtube_input'></input><button id='youtube_go' name='youtube_go'>add</button>");
        $('#youtube_go').click(function(){
          url = $('#youtube_input').val();


          newSong(url,'yt');

        });

      });


}

// pass in the MSong object!
function generateSongHTML(song){

          type = song.type;
          url = song.url;
          mID = song.id;

         //APPEND A NEW SONG TO AREA (the html div)

         if(type!='file'){

         artist_and_title = '<span id=labelartist>'+
                             song.artist+
                                '</span><br/> <span id=labelsong><a href="'+url+'" class=link-'+type+' target="_blank">'+
                              song.title+'</a></span>';
          } else{

         artist_and_title = '<span id=labelartist>'+
                             song.artist+
                                '</span><br/> <span id=labelsong>'+
                              song.title+'</span>';

          }

         objectArrayPos = song.local;
         songHTMLString = '<div class="song '+type+'" id="song'+mID+'" name="'+objectArrayPos+'" >'+
                            '<div id=songlabel>'+artist_and_title +

                            '<br/>' + '<span class=itemButtons>';

                            if(editable) {
                      songHTMLString += ' <!--<span class=editButton>(e)</span>-->'+
                                        '<span class=deleteButton>(x)</span>';
                                      }
                 songHTMLString +=     '</span>'+
                                '</div><span class="playbutton" id="play'+
                              mID+'"><!--play character entity &#9654;--></span>' + '</div>';

          $('#area').after(songHTMLString);
         if(song.image!=''){
          image = 'url("'+song.image+'")';
         } else {
          image = 'url('+no_art_image_path+')';
         }

          $('#song'+mID).css('left',song.x).css('top',song.y).css('background-image',image);


          if (image == 'url(no_art_image_path)'){
          //      $('#song'+mID).append('<div id=noart-label>'+artist_and_title+'</div>');
          
          // ADD IMAGE W/ ARTIST NAME + TITLE
          }
          if(editable){
          $('#song'+mID).draggable({
               stop: doneDragging
          });
        }
          setupClicks();

}
function resetStyle(){

                  // reset item style for playing tracks (there are two at this precise moment)
                  $('span.stopbutton').removeClass('stopbutton').addClass('playbutton');
//                  $('span.playbutton').addClass('playbutton');
                  $('span.playbutton').unbind('click');
                  $('span.playbutton').click( function(){

                      songToPlay = parseForSongID($(this).attr('id'));
                      playButton(songToPlay);
                    });
                  $('.song').removeClass('playing');

}

function applyPlayingStyle(id){

                 $('div#song'+id).addClass('playing');
                  $('span#play'+id).removeClass('playbutton');
                  $('span#play'+id).addClass('stopbutton');
                  console.log('just set style to stop button for id '+id);
}

function playButton(id){
              console.log('play button clicked id '+id);
              if (playSong(id)){
                  resetStyle();
                  applyPlayingStyle(id);


                  // apply style to playing item

                  $('span#play'+id).unbind('click');
                  $('span#play'+id).click(function(){stopButton(id);});
                  console.log('just set binding for stop button for id '+id);
              }

}

function stopButton(id){
              console.log('stop button clicked id '+id);

              stopSong(id);
              $('span#play'+id).removeClass('stopbutton');
              $('span#play'+id).addClass('playbutton');
              $('div#song'+id).removeClass('playing');
              console.log('just set style to play button for id '+id);
              $('span#play'+id).unbind('click');
              $('span#play'+id).click(function(){playButton(id)});
              console.log('just set binding for play button for id '+id);


}

function setupClicks(){
          console.log('setup clicks');
         $('span.playbutton').unbind('click');
         $('span.stopbutton').unbind('click');
         $('span.playbutton').click(function(){
              songToPlay = parseForSongID($(this).attr('id'));
              playButton(songToPlay);
         });

         $('span.stopbutton').click(function(){
              songToStop = parseForSongID($(this).attr('id'));
              stopButton(songToStop);
         });

          $('.song').unbind('click');
          $('.song').click( function(){
              $('#add_a_song').hide();
              songnum = parseForSongID($(this).attr('id'));
              $('.song').children().hide();
              $('.song').removeClass('selected');
              $(this).addClass('selected');
    //          $('.innersong').css('z-index',10);
    //          $('.innersong'+songnum).css('z-index', 1000);
              $(this).children().show();


        });

          $('span.deleteButton').unbind('click');
          $('span.deleteButton').click(function(){

              $target_xyz_item = $(this).parent().parent().parent();

                songIDtoDelete = $target_xyz_item.attr('id');

                songToDelete = parseForSongID(songIDtoDelete);

                confirmation_element = '<span class=deleteConfirmation id=deleteConfirmation'+songToDelete+' > remove?</span>';

                $(this).hide().after(confirmation_element);

                $('#deleteConfirmation'+songToDelete).click(function(){

//                      songToDelete = parseForSongID(songIDtoDelete);
//                      songIDtoDelete = $(this).parent().parent().attr('id');
//                      stopSong(songIDToDelete);


                      songToDelete = parseForSongID($(this).attr('id'));
                      stopSong(songToDelete)
                        $target_xyz_item.remove();
                      console.log('delete song #'+songToDelete);
                      songByID(songToDelete).status = 'deleteme';

                      calculateDistances();
                      saveAll();
                });
                      
          });
     }

     function doneDragging(){
          calculateDistances();
          saveAll();
     }
     function playAnother(){

          console.log('blacklist:');
          console.log(blacklist);
          console.log('songs:');
          console.log(songs);
          console.log('nowPlaying:');
          console.log(nowPlaying);
          console.log('songToPlay:');

          blacklist.push(nowPlaying);
          songToPlay = nextSong(nowPlaying);


         console.log(songToPlay);

          if(songToPlay <= -1){
               return;
          }
          resetStyle();
          playSong(songToPlay);
          applyPlayingStyle(songToPlay);

     }

     // check to see if a song is blacklisted
     // blacklisted means it has finished playing
     // songs that were stopped manually are not 
     // blacklisted
     function blacklisted(songID){
          for(i=0;i<blacklist.length; i++){
               if (blacklist[i] == songID) return true;
          }
          return false;

     }

     function blacklisted(songID){
        for(i=0;i<blacklist.length; i++){
               if (blacklist[i] == songID) {
                console.log(songID + 'found in the blacklist');
                return true;
              }
          
        }

        console.log(songID + 'not found in the blacklist');

          return false;

     }


     // figures out what the next song should be based on current song id
     // 
     function nextSong(currentSong){
         console.log('play next from ',currentSong);

          debug.prepend('<br/><br/>');
         var currentSongIndex = _.findIndex(songs,['id',currentSong]);

         if(_.last(songs).id === currentSong){
             return songs[0].id;
         } else {
             return songs[currentSongIndex + 1].id;
         }
        //num = songs.length;
          num = $('.song').length;
         var  songDistances = [];


//          if (num>2){
               // construct 2D array with distances to each other song and the id of the song

                for(var x=0; x < distances.length; x++){
                    if (  ( currentSong == distances[x].id1 ) && !blacklisted(distances[x].id2)  ){
                      songDistances.push({
                        distance: (1 / distances[x].distance),
                        song: distances[x].id2
                      });
                    } /*else if ( ( currentSong == distances[x].id2 ) && !blacklisted(distances[x].id1) ){
                      songDistances.push({
                        distance: distances[x].distance,
                        song: distances[x].id1
                      });
                    }*/
                        
                }

              var num_candidates = songDistances.length;
              // if this array only has one element, just play that one!
              if (num_candidates == 1){
                  return songDistances[0].song;
              }

              // if this array has no elements, no more songs to play
              // -1 causes playback to stop
              if (num_candidates <= 0){

                  return -1;
              }

              sortedDistances = [];

              // get a sorted version with old indeces preserved
              sortedDistances = makeSortedVersion(songDistances);

              return sortedDistances[0].song;

              /*



               total = 0;
               for(q = 0; q < num ; q++){

        //            if((distances[currentSong][q] >= 0) & (!blacklisted(q))){
        //            songDistances.push([q,distances[currentSong][q]]);
        //            total = total + distances[currentSong][q];
        //            }

                    total += songDistances[q].distance;

               }

               // invert each distance ( total - distance ) then square to exaggerate
               // TODO change to a gaussian type evaluation

               total2 = 0;
               for(i = 0; i < songDistances.length; i++){
                    songDistances[i].distance =  total - songDistances[i].distance;
                    total2 = total2 + songDistances[i].distance;
               }

               // normalize
        //       normalize(songDistances);
        //       exaggerate(songDistances,strictness);

        //       console.log('normalized song distances: '+songDistances);

               // get a random number between 0 and 1
        //       randy = Math.random();

               sortedDistances = [];

               // get a sorted version with old indeces preserved
               sortedDistances = makeSortedVersion(songDistances);

               //keep only 6 closest songs

               // convert to a cumulative version and lazily compare against randy
               // analogous to dart throwing in a region
               c = 0;

      //         UNCOMMENT IF WANT TO RANDOMIZE
      //         for(i = 0; i < sortedDistances.length; i++){
      //              sortedDistances[i][1] = c + sortedDistances[i][1];
      //              c = sortedDistances[i][1];
      //              if(randy < c){
      //                   return sortedDistances[i][0];
      //              }
      //         }
      //
               return sortedDistances[0].song;

*/
 /*         }
          // there are 2 or less songs, so just play the other one
          else if (currentSong === 0){
               return 1;
          } else if (currentSong ==1){
               return 0;
          } else return 0;
*/

     }