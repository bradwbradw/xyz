var express = require('express');
var _ = require('lodash'),
  http = require('http'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  morgan = require('morgan'),
  restful = require('node-restful'),
  request = require('request'),
  logger = require('logger'),
  Q = require('q'),
  mongoose = restful.mongoose;

var app = express();
app.set('port', (process.env.PORT || 5000));
app.set('db', process.env.MONGODB_URL || 'mongodb://localhost/resources');
app.set('mode', process.env.MODE || 'development');


app.use(express.static(__dirname + '/client'));
//app.use(express.static(__dirname + 'sc_callback.html'));

console.log('port is %s, mode is %s',app.get('port'), app.get('mode'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  next();
});

mongoose.connect(app.get('db'));

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
  active: Boolean
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




var allSongs = [];
var playlist = [];

var playhead = 0;
var mixLength;

var incrementStream = function () {
  if (_.isEmpty(playlist)) {
    console.log('playlist is empty.  not sure why');
    return;
  }

  playhead += 1;
  console.log('playhead ',playhead);
  if (playhead >= playlist[0].length) {
    console.log('playhead reached '+playhead+'. changing songs.');
    playlist.push(playlist[0]);
    playlist = _.rest(playlist);
    playhead = 0;

  }
//  console.log(playhead + ' ' + song.name + '(' + song.playPosition + ') started at ' + song.mixPosition);
};


var refreshMix = function () {
  playlist = _.filter(allSongs, 'active', true);
  mixLength = _.sum(playlist, 'length');

  if (mixLength === 0) return 'no active songs found';

  var outputJson = JSON.stringify({
    newLength: mixLength,
    playlist: playlist
  });

  console.log('refreshed the mix: \n ' + outputJson);
  return outputJson;
};


var radioTimer = setInterval(incrementStream, 1000);


var populateAllSongs = function () {

  var apiLocation = 'http://localhost:'+app.get('port')+'/songs';
  console.log('api location:',apiLocation);

  request(apiLocation, function(error, response, body){
    if (!error && response.statusCode == 200){
      console.log('sucessfully loaded songs from db');
      allSongs = JSON.parse(body);

      return refreshMix();
    } else {
      console.error('error loading songs: ', error);
      console.error('response:', response);
      return(error);
    }
  });

};

populateAllSongs();

app.get('/library', function (request, response) {

  populateAllSongs(function(){
    response.send(allSongs);
  });

});

app.get('/bandcampHelper', function(req,res){

  console.log('request for bandcamp id of ',req.query.url);

  request(req.query.url, function(error, response, body){

            var stuff = body.split('<!-- track id ');
            var id = stuff[1].split(' -->')[0];
    console.log('found the id of bandcamp:',id);
    res.send(id);
  });

});

app.get('/playlist', function (req, res) {

  res.send( playlist );

});

app.get('/refresh', function (request, response) {
  populateAllSongs();
  response.send('refreshin');
});

app.get('/sc_callback', function(request, response){
  response.sendFile(__dirname + '/sc_callback.html');
});

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'));
});
