// db.js
// loading and saving from uploaded stuff
// eventually, user configuration


// use this function if somehow the db saving has messed up the css so that some songs are outside the view
// this will happen if you are at a different zoom level than 100% and dragging causes decimal css values
// jquery drops the decimal point for some reason so we end up with very large css values
// uncomment the call in 'saveAll()' below and then refresh to fix.  
// Before rearranging songs, comment out the call again, save, and refresh.
// make sure you're at 100% zoom level


function resetCss(songs) {

    console.log('fixing css of ' + songs);

    for (var i = 0; i < songs.length; i++) {
        if (songs[i].status != 'deleteme') {
            songs[i].x = Math.round(600 + (Math.random() * 60));
            songs[i].y = Math.round(600 + (Math.random() * 60));
        }
    }
    return songs;
}

function saveAll() {
    return true;

//songs = resetCss(songs);

    $.ajax({
        type: "POST",
        url: db_endpoint,
//      url: "./data/db.php",
        data: {action: "saveAll", toSave: songs, user: user}

    }).done(function (data) {
        console.log('done ajax request. data: ');//+data+'<br/>');
    }).fail(function () {
        console.log('saving request failed.');
    });

}


//return the local smSongs array position
function initPlayer(song) {

    // if youtube make a youtube song
    // var ytSong = youtube.createEmbed or something
    // , then ytSongs.push

    // if soundcloud same for soundcloud

// i don't think these are used...
    song.fadingOut = false;
    type = song.type;
    url = song.url;
    if (type == 'yt') {
        // generate youtube object
        // push onto youtube stack
//              loadTheYoutube(song.url);

        youtube_load_url = 'https://www.googleapis.com/youtube/v3/videos?id=' +
            song.serviceID
            + '&key=' + youtube_api_key +
            '&fields=items(snippet(title, channelTitle))&part=snippet';

        url = 'https://www.googleapis.com/youtube/v3/videos?id=' +
            song.serviceID;

        $.ajax({

            url: youtube_load_url
        }).done(function (data) {
            console.log('yt api success. Data:');
            //     console.log(data);


            ytSongs.push(url); //<------ use the youtube object instead of url string
            ytID = ytSongs.length - 1;
            song.local = ytID;
            song.title = data.items[0].snippet.title;
            song.artist = data.items[0].snippet.channelTitle;//'youtube artist '+ytID;
            song.image = "http://img.youtube.com/vi/" + song.serviceID + "/0.jpg";

            generateSongHTML(song);
            song.status = 'good';
//            calculateDistances();
//            saveAll();


            song.doneLoading = true;
            tryInitialize();
            return ytID;


        }).fail(function () {
            console.log('yt api ajax fail: id=' + service_id);
            vid_info.uploader = '??';
            vid_info.title = '??';
        });


    } else if (type == 'sc') {
        var scData;

// some way to process url so that if url is for a soundcloud sound that is clicked on
// from within a set, it will truncate the 'set' part from the url and add the song
        /*if (url === undefined)
         {return false;}

         */


//              var requestURL = 'http://api.soundcloud.com/resolve?url=' + url + '&format=json&consumer_key='+soundcloudKey;
//              console.log("soundcloud api request: "+requestURL);
//              soundcloudXHR = $.getJSON(  requestURL ).done(
//                    function(data){

//              
        SC.get('http://api.soundcloud.com/resolve?url=' + url + '&format=json)', function (sc_data) {

            scData = sc_data;
            sc_id = scData.id;

//                  SC.stream(sc_id, function(sc_sound){
//                    scSong = sc_sound;
//                    scSong.id = 'xyzSong'+song.id;
//                    scSong.url = scData.stream_url;
            //   scData = data;
//                    console.log('***********scdata********');
//                    console.log(scData);
            /*
             $.each(data,function(key, val){
             scSong.push(key,val);
             });
             */

            var scSong = soundManager.createSound({
                id: 'xyzSong' + song.id,
                url: scData.stream_url + '?consumer_key=' + soundcloudKey,
                onload: function () {
                    console.log('sound loaded!', this.id);

                }
            });
            if (scData.artwork_url === null) {
                scData.artwork_url = no_art_image_path;
            }

            // these lines have to happen here (scope issues)
            scSongs.push(scSong);
            scID = scSongs.length - 1;
            song.local = scID;
            song.title = scData.title;
            song.artist = scData.user? scData.user.username : '?';
            song.image = scData.artwork_url;
            generateSongHTML(song);
            song.status = 'good';
//            calculateDistances();
//            saveAll();

            song.doneLoading = true;
            tryInitialize();
            //  });
        });
        /*
         }).fail(function(e){
         console.log('soundcloud API request failed:');
         console.log(e);
         }).always(function(e){

         console.log('soundcloud API request completed:');

         });

         */


    } else if (type === '') {
        console.log('no type found!');
        return false;
    }


}


// it gets called from upload ui elements
function newSong(url, type, data) {
    console.log('newSong data from upload.php:');
    console.log(data);
    num = songs.length;
    new_id = ++greatestID;

// first, assume these aren't available, then set inside IF blocks
    artist = '';
    title = '';
    image = '';
    service_id = null;

    if (type == "yt") {
        service_id = parseYoutubeID(url);
        /*BASIC*/
        video_url = "http://www.youtube.com/v/" + service_id + video_url_suffix;
        console.log('youtube url should be ' + video_url);
        url = video_url;
    }

    if (type == "file") {
        artist = data.id3_artist;
        title = data.id3_title;
        if (data.id3_art_filename != '') {
            image = ALBUM_ART_DIR + data.id3_art_filename;
        } else {
            image = '';
        }
    }
    //        var MSong = new Item( new_id , targetX , targetY , url, type, null, service_id );
    //        songs.push(MSong);

    var xyzSong = {
        id: new_id,
        x: targetX,
        y: targetY,
        url: url,
        type: type,
        local: null,
        serviceID: service_id,
        artist: artist,
        title: title,
        image: image
    };

    songs.push(xyzSong);


    // songs is the generic song collection (can include youtube, soundcloud, etc)

    // ABOUT ID numbers: "msong" id inside the smSong object corresponds with the "master" id
    // from the MSong object (which can also include yt songs, sc songs, etc...)
    // inside the smSongs array, it's a different id, corresponding to the objects
    // that are loaded into the area.
    // For this prototype, it is coincidental that songs and smSongs match up
    // In the future, app calls to different song items by id should first check the songs
    // array to get the corresponding id in the specific arrays (and to find out which array to
    // get it from)


    // TODO - add check for (if local song file)..
    if (initPlayer(xyzSong) !== false) {

        songByID(new_id).status = 'good';
    } else {

        songByID(new_id).status = 'bad';
    }

    console.log(xyzSong.id + " Created");

}


function loadSong(song) {
//    var Item = makeStruct("id x y url type local status serviceID");
//    var MSong = new Item( id, x, y, url, type, null, status, serviceID);


    var xyzSong = {
        id: song.id,
        x: song.x,
        y: song.y,
        url: song.url.replace('https','http'),
        type: song.provider === 'youtube' ? 'yt' : 'sc',
        local: null,
        serviceID: song.provider_id,
        artist: song.artist,
        title: song.title,
        image: song.pic,
        status: 'good'
    };

    songs.push(xyzSong);
    initPlayer(xyzSong);
    console.log(xyzSong.id + " Loaded: " + xyzSong.url);
//    generateSongHTML(MSong);
}

function loadAll() {

    $.ajax({
        type: "GET",
        url: xyz_root_dir,
        success: function (data) {
            console.log('loading songs done - success!');
            _.each(data.playlist.songs, loadSong);

        }
    }).done(function () {


    }).fail(function () {
        //popup.load('db.php');
        console.log('failed loading songs from ' + db_endpoint + ' for user ' + user);
    }).always(function () {
        // always do stuff...
    });

// don't add anything else here (asynchronous)
// put further code in done(function) place

}


function deleteDB() {

    $.ajax({
        type: "POST",
        url: "./data/db.php",
        data: {action: "clear"}

    }).done(function () {
        console.log('deleted all');

    }).fail(function () {
        //popup.load('db.php');
        console.log('failed');
    }).always(function () {
        // always do stuff...
    });
}

