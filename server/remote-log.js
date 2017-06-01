var _ = require('lodash');
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
var constants = require('../constants');

var winston = require('winston');

require('winston-papertrail').Papertrail;

var logger;

var levels = [
//  'info',
  'log',
//  'warn',
//  'error'
];

function initializeLogger() {

  var winstonPapertrail = new winston.transports.Papertrail({
    host: constants.logging.host,
    port: constants.logging.port,
    hostname: constants.domain
  });
  logger = new winston.Logger({
    transports: [winstonPapertrail]
  });


  winstonPapertrail.on('error', function (err) {
    console.error('error in winston: ', err);
  });

}

if (!logger) {
  initializeLogger();
}

var messageTemplate = '{{ip}} {{protocol}} {{method}}: {{originalUrl}} {{params}} {{query}}';
var messageFn = _.template(messageTemplate);

var request = function (req, res, next) {

  var dataToLog = _.pick(req, 'ip protocol method originalUrl params query'.split(' '));
  dataToLog.params = JSON.stringify(dataToLog.params);
  dataToLog.query = JSON.stringify(dataToLog.query);

  logger.info(messageFn(dataToLog));

  next();
};

var log = function(message){
  logger.info(message, _.drop(arguments));
  console.log(message, _.drop(arguments));
};

var error = function (err, req, res, next) {

  logger.error('REST error:', err);
  next();
};

module.exports = {
  request: request,
  log: log,
  error: error
};
/*
_.each(levels, level => {
  module.exports[level] = function () {

    if (_.isFunction(console[level]) && console[level].apply) {
      console[level].apply(null, arguments);
    }
    if (_.isFunction(logger[level]) && logger[level].apply) {
      logger[level].apply(null, arguments);
    }
  }
})*/

