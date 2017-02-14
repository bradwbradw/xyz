var _ = require('lodash');
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
var constants = require('../constants');

var winston = require('winston');

require('winston-papertrail').Papertrail;

var logger;

function initializeLogger() {

  var winstonPapertrail = new winston.transports.Papertrail({
    host: constants.logging.host,
    port: constants.logging.port
  });
  logger = new winston.Logger({
    transports: [winstonPapertrail]
  });


  winstonPapertrail.on('error', function (err) {
    console.error('error in winston: ', err);
  });

}
var messageTemplate = '{{ip}} {{protocol}} {{method}}: {{originalUrl}} {{params}} {{query}}';
var messageFn = _.template(messageTemplate);

var request = function (req, res, next) {

  if (!logger) {
    initializeLogger();
  }

  var dataToLog = _.pick(req, 'ip protocol method originalUrl params query'.split(' '));
  dataToLog.params = JSON.stringify(dataToLog.params);//'donkey'//_(dataToLog.params).value();
  dataToLog.query = JSON.stringify(dataToLog.query);//'donkey'//_(dataToLog.params).value();

  logger.info(messageFn(dataToLog));

  next();
};

var error = function (err, req, res, next) {

  logger.error('REST error:', err);
  next();
};

module.exports = {
  request: request,
  error: error
};
