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
app.use(express.static(__dirname + '/client'));


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

//console.log('DB CONNECT:'+process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL ? process.env.MONGODB_URL : 'mongodb://localhost/resources');

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

  request('http://l.h:5000/songs', function(error, response, body){
    if (!error && response.statusCode == 200){
      console.log('sucessfully loaded songs from db');
      allSongs = JSON.parse(body);

      return refreshMix();
    } else {
      console.log('error loading songs:', error);
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

app.get('/playlist', function (req, res) {

  res.send( playlist );

});

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/client/admin/index.html');

});

app.get('/refresh', function (request, response) {
  populateAllSongs();
  response.send('refreshin');
});

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'));
});
