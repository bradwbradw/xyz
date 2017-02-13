var constants = require('../constants');

module.exports = {

  "restApiRoot": constants.api.path,
  "host": constants.api.host,
  "port": constants.api.port,
  remoting:{
    errorHandler:{
      handler: require('./remote-log').error
    }
  }

};


