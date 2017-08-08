'use strict';
var mongoDbUriTool = require('mongodb-uri');
var _ = require('lodash');

var mongoUrl = process.env.MONGODB_URL || process.env.MONGO_URL || 'mongodb://localhost:27017/xyz';

var mongoCreds = mongoDbUriTool.parse(mongoUrl);
/* example creds object:
 { scheme: 'mongodb',
 username: 'heroku_cc7gbkr1',
 password: 'rusl214k9b95o5d7evobgufue6',
 database: 'heroku_cc7gbkr1',
 hosts: [ { host: 'ds059135.mongolab.com', port: 59135 } ]
 }
 */
mongoCreds.host = mongoCreds.hosts[0].host;
mongoCreds.port = mongoCreds.hosts[0].port;

var port = process.env.PORT || 5005;
var ip = process.env.IP || 'localhost';
console.log('app ip will be ', ip);
console.log('the api and the minified version of the app will be available on port ', port);

var loggingUrl = process.env.LOGGING_URL;// || 'logs5.papertrailapp.com:29706';
var loggingHost = loggingUrl? _.first(loggingUrl.split(':')) : null;
var loggingPort = loggingUrl? _.last(loggingUrl.split(':'))*1 : null;

module.exports = {
  api: {
    host: process.env.API_HOST || '',
    path: process.env.API_URL || '/api/',
    port: port
  },
  keys: {
    public: {
      fb: process.env.FB_APP_ID || 0,//'1507355422928214',
      sc: process.env.SC_CLIENT_ID || 'cb16ad8471c6da3d93dc120fb8160b89',
      yt: process.env.YT_KEY || 'AIzaSyBxKs-kfPHtRL1boRrsOtSvoauIFJJLC4A'
    },
    private: {
      sc: process.env.SC_CLIENT_SECRET || 'f0c019c1b13ede7f5458d955e6c92f2a'

    }
  },
  mail: {
    key: process.env.MAILGUN_KEY || 'key-57050be36fbfd2a9d17776fd5d771eb5',
    domain: process.env.MAILGUN_DOMAIN || 'staging-mg.xyz.gs'
  },
  logging:{
    host: loggingHost,
    port: loggingPort

  },
  mongoUrl: mongoUrl,
  mongoCreds: mongoCreds,
  domain: process.env.DOMAIN || ip +':'+ port

};
