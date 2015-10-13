var express = require('express');
var _ = require('lodash'),
    http = require('http'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;



var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/client'));




app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

//console.log('DB CONNECT:'+process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL? process.env.MONGODB_URL : 'mongodb://localhost/resources');

// should be the same as in client/scripts/service/song.js Songs fields

var Song = app.resource = restful.model('song', mongoose.Schema({
    artist: String,
    title: String,
    length: Number,
    url: String,
    provider: String,
    provider_id: String,
    x: Number,
    y: Number,
  active:Boolean
  }))
  .methods(['get', 'post', 'put', 'delete']);

Song.register(app, '/songs');
/* ^^^ registers these routes:
GET /songs
GET /songs/:id
POST /songs
PUT /songs/:id
DELETE /songs/:id
*/



var songs = [];

var activeSongs = function(){
  return _.filter(songs,'active', true);
};

var playhead = 0;
var mixLength;

var incrementStream = function () {
  playhead = (playhead + 1) % mixLength;
  var song = getCurrentSong();
//  console.log(playhead + ' ' + song.name + '(' + song.playPosition + ') started at ' + song.mixPosition);
};

var refreshMix = function () {
  mixLength = _.sum(activeSongs(), function (song) {
    return song.length;
  });

  if(mixLength === 0) return;

  var timeMeasure = 0;
  _.each(activeSongs(), function (song) {
    song.mixPosition = timeMeasure;
    timeMeasure = song.length;
  });

  console.log('refreshing the mix. new length: ' + mixLength);
  console.log('all active songs :\n ', activeSongs());
};

var radioTimer = setInterval(incrementStream, 1000);

var getCurrentSong = function () {

  var currentSong;
  _.each(activeSongs(), function (song, index) {
    if (song.mixPosition > playhead) {
      currentSong = activeSongs()[index - 1];

      currentSong.playPosition = playhead - currentSong.mixPosition;
      return false;
    }
  });

  if (!currentSong) {
    currentSong = _.last(activeSongs());
    currentSong.playPosition = playhead - currentSong.mixPosition;
  }
  return currentSong;
};


var getSongsLocation = {
  host: 'localhost',
  port: app.get('port'),
  path: '/songs'
};

getSongsCallback = function(response) {
  var str = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    console.log(str);
    songs = JSON.parse(str);
    refreshMix();
  });
};

http.request(getSongsLocation, getSongsCallback).end();

app.get('/currentSong', function (request, response) {
  var song = getCurrentSong();

  response.send(song);


});

app.get('/admin', function(request,response){
  response.sendFile(__dirname + '/client/admin/index.html');
});

app.get('/', function(request,response){
  response.sendFile(__dirname + '/client/admin/index.html');

});

app.get('/refresh', function(request,response){
    refreshMix();

  response.send('refreshing the mix. new length: ' + mixLength +'.  \n all active songs :\n <pre>'+ JSON.stringify(activeSongs()));
});



app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'));


});
