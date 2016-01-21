// TODO - when / if moving to external API, need to parse out host and port from URL


module.exports= {
  "restApiRoot": process.env.API_URL || '/api',
  "host": "0.0.0.0",
  "port": 80,

  "remoting": {
    "errorHandler": {
      "disableStackTrace": true
    }
  }
};


