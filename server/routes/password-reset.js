var Mail = require('../controllers/mail');
var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function (req, res) {
  res.send('Visit the main app at xyz.gs to request a password reset');
});
// define the about route
router.post('/send-request', function (req, res) {
  Mail.sendMail({
      to: 'brad@xyz.gs',
      body: '<h3>testing</h3>'
    })
    .then(function (result) {
      res.send('result');
    })
    .catch(function (err) {
      console.error(err);
      res.status(500).json({error:err});
    });
});

module.exports = router;