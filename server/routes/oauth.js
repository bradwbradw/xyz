var express = require('express'),
  when = require('when'),
  _ = require('lodash');
var router = express.Router();

var mediaApi = require('../../server/controllers/media-api');

// middleware that is specific to this router
router.use(function (req, res, next) {
  next();
});

// legacy routes ( wait until new app is active and keys are set )
router.get('/', mediaApi.oauth.soundcloud.handleRedirect);
router.get('/init-oauth', mediaApi.oauth.soundcloud.init);

// new routes
router.get('/soundcloud/init', mediaApi.oauth.soundcloud.init);
router.get('/soundcloud/redirect', mediaApi.oauth.soundcloud.handleRedirect);

module.exports = router;
