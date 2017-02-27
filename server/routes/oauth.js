var express = require('express'),
  when = require('when'),
  _ = require('lodash');
var router = express.Router();

var mediaApi = require('../../server/controllers/media-api');

// middleware that is specific to this router
router.use(function (req, res, next) {
  next();
});

// should be /oauth/soundcloud/redirect
router.get('/', mediaApi.oauth.soundcloud.handleRedirect);

// should be /oauth/soundcloud/init
router.get('/init-oauth', mediaApi.oauth.soundcloud.init);


module.exports = router;
