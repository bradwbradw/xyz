'use strict';

module.exports = {
  api: {
    host: process.env.API_HOST || '',
    path: process.env.API_URL || '/api',
    port: process.env.PORT || 5005
  },
  keys: {
    fb: process.env.FB_APP_ID || '1507355422928214',
    sc: process.env.SC_KEY || 'c29e4129f2bba3771a5472a65cad37e4',
    yt: process.env.YT_KEY || 'AIzaSyAv5-et2TSQ3VsA5eKLviq2KjfExzFLxO8'
  },
  mongoUrl: process.env.MONGODB_URL || 'mongodb://heroku_cc7gbkr1:rusl214k9b95o5d7evobgufue6@ds059135.mongolab.com:59135/heroku_cc7gbkr1'

};