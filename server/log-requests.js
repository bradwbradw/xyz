  var winston = require('winston');
  require('winston-papertrail').Papertrail;

  var winstonPapertrail = new winston.transports.Papertrail({
    host: 'logs5.papertrailapp.com',
    port: 29706
  })

  winstonPapertrail.on('error', function(err) {
    console.error("error in winston: ", err);
  });

  var logger = new winston.Logger({
    transports: [winstonPapertrail]
  });

  logger.info('this is my message');
  
  var logRequests = function(req, res, next){ 
      logger.info("ding");
      next();
  }
 
 
  module.exports = logRequests;
