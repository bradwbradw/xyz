const loopback = require('loopback'),
  boot = require('loopback-boot'),
  path = require('path'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  morgan = require('morgan');

const config = require('../constants');

const logger = require('./remote-log');

const PasswordReset = require('./routes/password-reset.js');

const app = module.exports = loopback();

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/stream', loopback.static(path.resolve(__dirname, '../stream-dist')));
app.use('/images', loopback.static(path.resolve(__dirname, '../images')));
app.use('/admin', loopback.static(path.resolve(__dirname, '../admin-dist')));
app.use('/admin/spaces', loopback.static(path.resolve(__dirname, '../admin-dist')));
app.use('/admin/users', loopback.static(path.resolve(__dirname, '../admin-dist')));
app.use('/space*', loopback.static(path.resolve(__dirname, '../dist')));
app.use('/xyz-player-component', loopback.static(path.resolve(__dirname, '../xyz-player-component')));
app.use('/stream/xyz-player-component', loopback.static(path.resolve(__dirname, '../xyz-player-component')));
app.use('/sc', loopback.static(path.resolve(__dirname, '../stream/scWidget.html')));

app.use(loopback.token());

app.use('/password-reset', PasswordReset);

const manifest = fs.readFileSync(path.resolve(__dirname, '../manifest.json'), 'utf8');

app.get('/manifest.json', function (req, res) {
  res.send(manifest);
});


//app.use(morgan('combined'));
app.use(logger.request);


app.start = function () {
  // start the web server
  return app.listen(function () {
    console.log('--- xyz app on port ' + config.api.port + '-----');
    app.emit('started');
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      logger.log('Browse your REST API at ' + explorerPath)
    }
  });
};


// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();

});

