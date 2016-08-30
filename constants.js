'use strict';
var mongoDbUriTool = require('mongodb-uri');

var mongoUrl = process.env.MONGODB_URL || 'mongodb://heroku_cc7gbkr1:rusl214k9b95o5d7evobgufue6@ds059135.mongolab.com:59135/heroku_cc7gbkr1';

var mongoCreds = mongoDbUriTool.parse(mongoUrl);
/* example creds object:
 { scheme: 'mongodb',
 username: 'heroku_cc7gbkr1',
 password: 'rusl214k9b95o5d7evobgufue6',
 database: 'heroku_cc7gbkr1',
 hosts: [ { host: 'ds059135.mongolab.com', port: 59135 } ]
 }
 */


module.exports = {
  api: {
    host: process.env.API_HOST || '',
    path: process.env.API_URL || '/api/',
    port: process.env.PORT || 5005
  },
  keys: {
    public: {
      fb: process.env.FB_APP_ID || '1507355422928214',
      sc: process.env.SC_CLIENT_ID || 'cb16ad8471c6da3d93dc120fb8160b89',
      yt: process.env.YT_KEY || 'AIzaSyAv5-et2TSQ3VsA5eKLviq2KjfExzFLxO8'
    },
    private: {
      sc: process.env.SC_CLIENT_SECRET || 'f0c019c1b13ede7f5458d955e6c92f2a'

    }
  },
  mail: {
    key: process.env.MAILGUN_KEY || 'key-57050be36fbfd2a9d17776fd5d771eb5',
    domain: process.env.MAILGUN_DOMAIN || 'sandbox40b84ff8fde34d70bbfc5f2c1e109cd3.mailgun.org'
  },
  mongoUrl: mongoUrl,
  mongoCreds: mongoCreds,
  domain: process.env.DOMAIN || 'localhost:5005'

};