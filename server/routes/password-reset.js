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

var resetPassword = function (req, password) {

  var app = req.app;
  var Dj = app.models.dj;

  return when.promise(function (resolve, reject) {

    Dj.findById(req.accessToken.userId, function (err, dj) {
      if (err) {
        reject(err);
      }
      dj.updateAttribute('password', password, function (err, dj) {
        if (err) {
          console.error('setting password failed for '+dj.email+': ', err);
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
    console.error('expecting JSON containing {email:"example@domain.com"}. received:', req.body);
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
  var token = req.accessToken;
  if (!password || !token) {
    res.status(400).json({error: 'expecting authenticated request, with JSON containing password'});
  } else {
    resetPassword(req, password)
      .then(function () {
        res.json({});
      })
      .catch(function(err){
        console.error('resetting password failed', JSON.stringify(err, null, 2));
        res.status(505).json({error:'resetting password failed'});
      })
  }
});

module.exports = router;