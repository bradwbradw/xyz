var winston = require('winston');
var _ = require('lodash');

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
require('winston-papertrail').Papertrail;

var constants = require('../constants');

var winstonPapertrail = new winston.transports.Papertrail({
  host: constants.logging.host,
  port: constants.logging.port
});

winstonPapertrail.on('error', function (err) {
  console.error('error in winston: ', err);
});

var logger = new winston.Logger({
  transports: [winstonPapertrail]
});

var messageTemplate = '{{ip}} {{protocol}} {{method}}: {{originalUrl}} {{params}} {{query}}';
var messageFn = _.template(messageTemplate);

var request = function (req, res, next) {

  var dataToLog = _.pick(req, 'ip protocol method originalUrl params query'.split(' '));
  dataToLog.params = JSON.stringify(dataToLog.params);//'donkey'//_(dataToLog.params).value();
  dataToLog.query = JSON.stringify(dataToLog.query);//'donkey'//_(dataToLog.params).value();

  logger.info(messageFn(dataToLog));

  next();
};

var error = function(err, req, res, next){

  logger.error('REST error:', err);
  next();
};

module.exports = {
  request:request,
  error:error
};
