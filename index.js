var express = require('express');
var _ = require('lodash'),
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

console.log('DB CONNECT:'+process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL? process.env.MONGODB_URL : 'mongodb://localhost/resources');

var Song = app.resource = restful.model('song', mongoose.Schema({
    name: String,
    length: Number,
    url: String
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




var songs = [
  {name: 'dookie', length: 40, mixPosition: 0, url:'https%3A//api.soundcloud.com/tracks/210507981'},
  {name: 'fred', length: 30, mixPosition: 0, url:'https%3A//api.soundcloud.com/tracks/191682864'}
];

var playhead = 0;
var mixLength;

var incrementStream = function () {
  playhead = (playhead + 1) % mixLength;
  var song = getCurrentSong();
//  console.log(playhead + ' ' + song.name + '(' + song.playPosition + ') started at ' + song.mixPosition);
};

var refreshMix = function () {
  mixLength = _.sum(songs, function (song) {
    return song.length;
  });

  var timeMeasure = 0;
  _.each(songs, function (song) {
    song.mixPosition = timeMeasure;
    timeMeasure = song.length;
  });

  console.log('refreshing the mix. new length: ' + mixLength);
};

var radioTimer = setInterval(incrementStream, 1000);

var getCurrentSong = function () {

  var currentSong;
  _.each(songs, function (song, index) {
    if (song.mixPosition > playhead) {
      currentSong = songs[index - 1];

      currentSong.playPosition = playhead - currentSong.mixPosition;
      return false;
    }
  });

  if (!currentSong) {
    currentSong = _.last(songs);
    currentSong.playPosition = playhead - currentSong.mixPosition;
  }
  return currentSong;
};

refreshMix();

app.get('/currentSong', function (request, response) {
  var song = getCurrentSong();

var soundcloudEmbed = '<iframe width="100%" height="450" scrolling="no" frameborder="no" ' +
  'src="https://w.soundcloud.com/player/?url='+song.url +
  '&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>';

  response.send(song + soundcloudEmbed);


});

app.get('/', function(request,response){
  response.sendFile(__dirname + '/client/index.html');
});



app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'));


});
