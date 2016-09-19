var dsConfig = require('../datasources.json')
request = require('request'),
  logger = require('logger'),
  loopback = require('loopback'),
  _ = require('lodash');


module.exports = function (app) {


  var User = app.models.User;

  app.get('/bandcampHelper', function (req, res) {

    if (true || _.isUndefined(req.query.url)) {
      console.log('bandcamp helper for nothing');
      return res.status(500).json({error: 'no info provided'});
    }
    console.log('there was a request for bandcamp id of ', req.query.url);

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

  app.get('/sc_callback', function (request, response) {
    response.sendFile(__dirname + '/sc_callback.html');
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
