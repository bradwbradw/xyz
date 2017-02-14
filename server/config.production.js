var constants = require('../constants');

module.exports = {

  "restApiRoot": constants.api.path,
  "host": constants.api.host,
  "port": constants.api.port,

  "remoting": {
    "errorHandler": {
      "disableStackTrace": true,
      handler: require('./remote-log').error
    }
  }
};


