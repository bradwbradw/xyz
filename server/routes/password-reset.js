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


var resetForEmail = function (req, email) {

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
router.post('/send-request', function (req, res) {

  var email = _.get(req, 'body.email');
  if (!email) {
    res.status(400).json({error: 'expecting JSON containing {email:"bla@bla.com"}'});
  } else {

    resetForEmail(req, email)
      .then(function (result) {
        res.json({success: true, email: email});
      })
      .catch(function (err) {
        console.error(err);
        res.status(500).json({error: err});
      });
  }
});

router.get('/update', function(req, res){

  res.send('finishing password reset')
});

module.exports = router;