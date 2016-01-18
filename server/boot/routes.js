var dsConfig = require('../datasources.json')
request = require('request'),
  logger = require('logger'),
  _ = require('lodash');


module.exports = function (app) {
  var User = app.models.User;

  //verified


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
//  console.log('playhead ', playhead);
    if (playhead >= playlist[0].length) {
      console.log('playhead reached ' + playhead + '. changing songs.');
      console.log('from ' + playlist[0].artist + ' - ' + playlist[0].title);
      playlist.push(playlist[0]);
      playlist = _.rest(playlist);
      console.log('to ' + playlist[0].artist + ' - ' + playlist[0].title);
      playhead = 0;
    }
//  console.log(playhead + ' ' + song.name + '(' + song.playPosition + ') started at ' + song.mixPosition);
  };

  var refreshMix = function () {
    playlist = _.filter(allSongs, 'length');
    mixLength = _.sum(playlist, 'length');

    if (mixLength === 0) return 'no active songs found';

    var outputJson = JSON.stringify({
      newLength: mixLength,
      playlist: playlist
    });

    console.log('refreshed the mix:');// \n ' + outputJson);
    return outputJson;
  };


  var populateAllSongs = function () {

    var apiLocation = 'http://' + app.get('host') + ':' + app.get('port') + app.get('restApiRoot') + '/songs';
    console.log('populate songs: api location:', apiLocation);

    request(apiLocation, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log('sucessfully loaded songs from db');
        allSongs = JSON.parse(body);

        return refreshMix();
      } else {
        console.error('error loading songs: ', error);
        console.error('response:', response);
        return (error);
      }
    });

  };

  var startEverything = function () {

    populateAllSongs();
    var radioTimer = setInterval(incrementStream, 1000);

  }

  app.get('/library', function (request, response) {

    populateAllSongs(function () {
      response.send(allSongs);
    });

  });

  app.get('/bandcampHelper', function (req, res) {


    if (true || _.isUndefined(req.query.url)) {
      console.log('bandcamp helper for nothing');
      return res.status(500).json({error: 'no info provided'});
    }

    console.log('there was a request for bandcampp id of ', req.query.url);

    request(req.query.url, function (error, response, body) {
      if (!body || _.isUndefined(body)) {
        res.status(500).json({error: 'not a bandcamp page'});
      } else {
        var stuff = body.split('<!-- track id ');

        if (!stuff || _.isUndefined(stuff) || stuff.length < 2) {
          res.status(500).json({error: 'not a bandcamp page'});

        } else {
          var id = stuff[1].split(' -->')[0];
          console.log('found the id of bandcamp:', id);
          res.send(id);

        }
      }
    });


  });

  app.get('/playlist', function (req, res) {

    res.send(playlist);

  });
  app.get('/playhead', function (req, res) {

    res.send({'playhead': playhead});

  });

  app.get('/refresh', function (request, response) {
    populateAllSongs();
    response.send('refreshin');
  });

  app.get('/sc_callback', function (request, response) {
    response.sendFile(__dirname + '/sc_callback.html');
  });


  // copy and pasted from the loopback sample user auth github
  // https://github.com/strongloop/loopback-example-user-management

  app.get('/verified', function (req, res) {
    res.render('verified');
  });

  //send an email with instructions to reset an existing user's password
  app.post('/request-password-reset', function (req, res, next) {
    User.resetPassword({
      email: req.body.email
    }, function (err) {
      if (err) return res.status(401).send(err);

      res.render('response', {
        title: 'Password reset requested',
        content: 'Check your email for further instructions',
        redirectTo: '/',
        redirectToLinkText: 'Log in'
      });
    });
  });

  //show password reset form
  app.get('/reset-password', function (req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);
    res.render('password-reset', {
      accessToken: req.accessToken.id
    });
  });

  //reset the user's pasword
  app.post('/reset-password', function (req, res, next) {
    if (!req.accessToken) return res.sendStatus(401);

    //verify passwords match
    if (!req.body.password || !req.body.confirmation ||
      req.body.password !== req.body.confirmation) {
      return res.sendStatus(400, new Error('Passwords do not match'));
    }

    User.findById(req.accessToken.userId, function (err, user) {
      if (err) return res.sendStatus(404);
      user.updateAttribute('password', req.body.password, function (err, user) {
        if (err) return res.sendStatus(404);
        console.log('> password reset processed successfully');
        res.render('response', {
          title: 'Password reset success',
          content: 'Your password has been reset successfully',
          redirectTo: '/',
          redirectToLinkText: 'Log in'
        });
      });
    });
  });
};
