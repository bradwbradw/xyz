// functions.js
// for deep codey functions that don't affect UI like array traversal, math helpers, etc


Array.prototype.sum = function(){
    var sum = 0;
    this.map(function(item){
        sum += item;
    });
    return sum;
};

function parseForSongID(str){
  return str.replace(/\D/g,'');
}

function makeStruct(names) {
  var _names = names.split(' ');
  var count = _names.length;
  function constructor() {
      for (var i=0; i< count; i++){
          this[_names[i]] = arguments[i];
      }
  }
  return constructor;

}

function songByID(id){

  for (var x = 0; x < songs.length; x++){
    if(songs[x].id == id) return songs[x];
  }
  return null;
}
 // these array helper functions expect a 2D array
 // (2 X num) where num is number of songs
 function findMaxIndex(array){
      len = array.length;
      maxSoFar = -1;
      theIndex = 0;
      for(i=0; i < len; i++){
           if( array[i].distance > maxSoFar ){
                maxSoFar = array[i].distance;
                theIndex = i;
           }
      }
      return theIndex;
 }

 // returns 2D array with old index,val (descending order)
 function makeSortedVersion(array){

      // this is a really inefficient sorting algorithm
      // should replace this with a better one

      len = array.length;

      var sorted = [];

      for(t = 0; t< len; t++){
           maxIndex = findMaxIndex(array);
           songIDWithMaxVal = array[maxIndex].song;
           maxVal = array[maxIndex].distance;

           sorted.push({
            song:songIDWithMaxVal,
            distance:maxVal
          });

           array[maxIndex].distance = -1;

      }

      return sorted;

 }

      // this just powers all the inverse distances by a very high number
     // TODO change this into a gaussian type function to better
     // exaggerate closeness measure (far items should have virtually
     // no change of getting played.  Could also truncate to 5 closest
     // songs instead
     function exaggerate(arr, power){
          for(n = 0; n< arr.length; n++){
               arr[n][1] = Math.pow(arr[n][1], power);
          }
          normalize(arr);
     }

          function normalize(array){
          theTotal = 0;

          for(i = 0; i<array.length; i++){
               theTotal = theTotal + array[i][1];
          }

          for(i = 0; i<array.length; i++){
               array[i][1] = array[i][1]/theTotal;
          }

    //      console.log('normalized: '+ array);
     }



     // TODO - optimize by adding 'changed' flag - only update distances between items whose locations have changed
     //	since the last distance calculation

      function calculateDistances(){
        //  num = songs.length;
          num = $('.song').length;
          index = 0;
//          distances = new Array(num);
          distances = [];

          // first update coordinates
          $('.song').each(function(){
          //     distances[index++] = new Array(num);

                    thisX = $(this).css('left').replace(/\D/g,'');
                    thisY = $(this).css('top').replace(/\D/g,'');

                    thisID = $(this).attr('id').replace(/\D/g,'');
                    thisID = parseInt(thisID,10);

                    songByID(thisID).x = thisX;
                    songByID(thisID).y = thisY;

          });



          for(i=0 ; i<songs.length; i++){
               for(j=0 ; j<songs.length; j++){
                    // if i=j then distance of song to itself (doesn't make sense)

                    if(songs[i].status!="deleteme"){ // if .x is null then the song has been removed
                      if(i!=j ){
                      // get euclidian distance between two songs
                           xLength = Math.abs(songs[i].x - songs[j].x);
                           yLength = Math.abs(songs[i].y - songs[j].y);
                 //     distances[j][i] = Math.sqrt((xLength*xLength)+(yLength*yLength));
                      a_distance = Math.sqrt((xLength*xLength)+(yLength*yLength));
                      distance_obj = {
                          id1:songs[i].id,
                          id2:songs[j].id,
                          distance:a_distance
                        };
                      distances.push(distance_obj);
                      //debug.prepend('j:'+j+'<br/>i:'+i+'<br/>dist:'+distances[j][i]+'<br/>');
         //             console.log('distance between song# '+distance_obj.id1+' and song# '+distance_obj.id2+' is '+distance_obj.distance);
                      }
                      else{
//                           distances[j][i] = -1;
                      }
                  }
               }
          }

     }

