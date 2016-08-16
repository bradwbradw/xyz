var Mail = require('../controllers/mail');
var express = require('express'),
  when = require('when');
var router = express.Router();

// middleware that is specific to this router
router.use(function (req, res, next) {
  next();
});

// define the home page route
router.get('/', function (req, res) {
  res.send('Visit the main app at xyz.gs to request a password reset');
});
// define the about route


var sendPasswordEmail = function (req, email) {

  var app = req.app;
  var Dj = app.models.dj;

  return when.promise(function (resolve, reject) {

    Dj.resetPassword({
      email: email
    }, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve('found user');
      }
    });
  });
};

var resetPassword = function (req, password, token) {

  var app = req.app;
  var Dj = app.models.dj;

  return when.promise(function (resolve, reject) {

    Dj.findById(req.accessToken.userId, function (err, dj) {
      if (err) {
        reject(err);
      }
      dj.updateAttribute('password', req.body.password, function (err, dj) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }

      });
    });
  })
};


router.post('/send-request', function (req, res) {

  var email = _.get(req, 'body.email');
  if (!email) {
    res.status(400).json({error: 'expecting JSON containing {email:"example@domain.com"}'});
  } else {

    sendPasswordEmail(req, email)
      .then(function (result) {
        res.json({success: true, email: email});
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json({error: err});
      });
  }
});

router.post('/update', function (req, res) {

  var password = _.get(req, 'body.password');
  var token = _.get(req, 'body.token');
  if (!password || !token) {
    res.status(400).json({error: 'expecting JSON containing password and token properties'});
  } else {
    console.log(password, token);
    res.send('finishing password reset')
  }
});

module.exports = router;