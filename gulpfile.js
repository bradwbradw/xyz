var gulp = require('gulp');
var _ = require('lodash');
var when = require('when');
var loopbackAngular = require('gulp-loopback-sdk-angular');

var bower = require('gulp-bower');
var rename = require("gulp-rename");
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var replace = require('gulp-replace');
var buster = require('gulp-buster');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');

var ngAnnotate = require('gulp-ng-annotate');
var annotateOptions = {
  single_quotes: true
};

var docs = require('gulp-ngdocs');
var exec = require('gulp-exec');

var del = require('del');

var constants = require('./constants');

var mongoCreds = constants.mongoCreds;

var keys = constants.keys;

var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var nodemon = require('gulp-nodemon');
var historyApiFallback = require('connect-history-api-fallback');
var browserSync = require('browser-sync').create();
var open = require('gulp-open');

var protractor = require('gulp-angular-protractor');
var karmaServer = require('karma').Server;

var childProcess = require('child_process');

var paths = {
  src: {
    sass: ['client/scss/**/*.scss', 'xyz-player-component/**/*.scss'],
    views: [
      'client/views/**/*.html',
      'client/components/**/*.html',
      'client/components/**/*.svg',
      'xyz-player-component/*.html',
      'client/views/**/*.svg',
      'xyz-player-component/*.svg'
    ],
    adminViews: [
      'admin/**/*.html'
    ],
    adminCss: 'admin/**/*.css',
    scripts: 'client/scripts',
    adminScripts: 'admin/scripts',
    index: 'client/index.html'
  },

  e2eTests: 'test/e2e-tests',
  unitTests: 'test/unit-tests'
};

function templateHeader(appName) {

  return '\'use strict\';' +
    'var app = window.angular.module(\'' + appName + '\');'
    + 'app.run([\'$templateCache\', function($templateCache) {';
}

function reloadBrowsers(done) {
  browserSync.reload();
  done();
}


var reportError = function (error) {
  var message = _.get(error, 'message');
  if (!message) {
    return 'unknown error ';
  } else {
    return message;
  }
};

var apiUrl;
if (process.env.NODE_ENV === 'production') {
  apiUrl = constants.api.path;//'http://'+ constants.api.host+ ':'+ constants.api.port + constants.api.path + '/';
} else {
  apiUrl = 'http://' + constants.domain + constants.api.path;
}
console.log('api Url is ', apiUrl);
console.log('domain is ', constants.domain);

gulp.task('loopback', function () {
  return gulp.src('./server/server.js')
    .pipe(loopbackAngular(
      {
        apiUrl: apiUrl
      }
    ))
    .pipe(rename('lb-services.js'))
    .on("error", notify.onError(reportError))
    .pipe(gulp.dest('./client/scripts/services'));
});
//lb-ng server/server.js client/scripts/services/lb-services.js -u http://0.0.0.0:3000/api && node docs.js

gulp.task('clean', function () {
  return del('dist');
});

gulp.task('reload', reloadBrowsers);

gulp.task('sass:app', function () {

  return gulp.src([
    'client/scss/**/*.scss',
    'xyz-player-component/**/*.scss'
  ])
    .pipe(sass())
    .on("error", notify.onError(reportError))
    .pipe(gulp.dest('client/css'));

});

gulp.task('sass:player', function () {
  return gulp.src('xyz-player-component/**/*.scss')
    .pipe(sass())
    .on("error", notify.onError(reportError))
    .pipe(gulp.dest('xyz-player-component/css'));

});

gulp.task('sass', gulp.parallel('sass:app', 'sass:player'));

gulp.task('bower', function () {
  return bower()
    .on("error", notify.onError(reportError))
    .pipe(gulp.dest('client/vendor'))
});


//TODO: make a task write css that includes xyz-player-component's css, write it to stream/style.css

gulp.task('copyCss:stream', function () {
  return gulp.src('stream/style.css')
    .on("error", notify.onError(reportError))
    .pipe(gulp.dest('stream-dist'))
});


gulp.task('copyCss:admin', function () {
  return gulp.src('admin/admin-style.css')
    .on("error", notify.onError(reportError))
    .pipe(gulp.dest('admin-dist'))
});


gulp.task('copyImages', function () {
  return gulp.src('client/images/**/*')
    .on("error", notify.onError(reportError))
    .pipe(gulp.dest('dist/images'))
});


gulp.task('useref:main', function () {
  return gulp.src('client/index.html')
    .pipe(replace('%%%facebookAppId', keys.public.fb))
    .pipe(replace('%%%scKey', keys.public.sc))
    .pipe(replace('%%%ytKey', keys.public.yt))
    .pipe(replace('%%%API_URL', apiUrl))
    .pipe(useref())
    .pipe(gulpIf('*.js', ngAnnotate(annotateOptions)))
    .on("error", notify.onError(reportError))
    .pipe(gulpIf('*.js', rev()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulpIf('*.css', rev()))
    .pipe(revReplace())
    .on("error", notify.onError(reportError))
    .pipe(gulp.dest('dist'))
});

gulp.task('useref:stream', function () {
  return gulp.src('stream/index.html')

    .pipe(replace('%%%facebookAppId', keys.public.fb))
    .pipe(replace('%%%scKey', keys.public.sc))
    .pipe(replace('%%%ytKey', keys.public.yt))
    .pipe(replace('%%%API_URL', apiUrl))
    .pipe(useref())
    .pipe(gulpIf('*.js', ngAnnotate(annotateOptions)))
    .pipe(gulpIf('*.js', rev()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulpIf('*.css', rev()))
    .pipe(revReplace())
    .on("error", notify.onError(reportError))
    .pipe(gulp.dest('stream-dist'))
});


gulp.task('useref:admin', function () {
  return gulp.src('admin/index.html')

    .pipe(replace('%%%API_URL', apiUrl))
    .pipe(useref())
    .pipe(gulpIf('*.js', ngAnnotate(annotateOptions)))
    .pipe(gulpIf('*.js', rev()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulpIf('*.css', rev()))
    .pipe(revReplace())
    .on("error", notify.onError(reportError))
    .pipe(gulp.dest('admin-dist'))
});


gulp.task('browserSync:client', function (done) {
  browserSync.init({
    server: {
      baseDir: 'client',
      index: 'index.html',
      middleware: [historyApiFallback()],
      routes: {
        "/xyz-player-component": "xyz-player-component",
        "/client": "client",
        "/stream/xyz-player-component": "xyz-player-component",
        "/stream/xyz-player-component/css": "xyz-player-component/css",
        "/stream": "stream",
        "/admin": "admin"
      }

    },
    injectChanges: true,
    logConnections: true,
    ghostMode: false,
    notify: false,
    browser: 'chrome',
    ui: {
      port: 9006
    },
    port: 9005
  });
  done();
});


gulp.task('browserSync:admin', function (done) {
  browserSync.init({
    server: {
      baseDir: 'admin',
      index: 'index.html',
      middleware: [historyApiFallback()],
      routes: {
        "/client": "client",
        "/admin/vendor": "client/vendor",
        "/admin": "admin"
      }

    },
    injectChanges: true,
    logConnections: true,
    ghostMode: false,
    notify: false,
    browser: 'chrome',
    ui: {
      port: 9006
    },
    port: 9005
  });
  done();
});

gulp.task('browserSync:dist', function (done) {
  browserSync.init({
    server: {
      baseDir: 'dist',
      index: 'index.html',
      middleware: [historyApiFallback()]
    },
    ghostMode: false,
    notify: false,
    reloadDelay: 500,
    port: 9000
  });
  done();
});

// is this needed? 
gulp.task('browserSync:stream', function (done) {
  browserSync.init({
    server: {
      baseDir: 'stream',
      index: 'index.html',
      middleware: [historyApiFallback()],
      routes: {
        "/xyz-player-component": "xyz-player-component",
        "/stream": "stream"
      }
    },
    ghostMode: false,
    notify: false,
    reloadDelay: 500,
    port: 9001
  });
  done();
});


gulp.task('templates', function () {

  var templateCache = require('gulp-angular-templatecache');

  return gulp.src(paths.src.views)
    .pipe(templateCache({templateHeader: templateHeader('xyzApp')}))
    .on("error", notify.onError(reportError))
    .pipe(gulp.dest(paths.src.scripts));
});
gulp.task('templates:admin', function () {

  var templateCache = require('gulp-angular-templatecache');

  return gulp.src(paths.src.adminViews)
    .pipe(templateCache({templateHeader: templateHeader('xyzAdmin')}))
    .on("error", notify.onError(reportError))
    .pipe(gulp.dest(paths.src.adminScripts));
});

gulp.task('watch:styles', function (done) {
  gulp.watch(paths.src.sass)
    .on('change', gulp.series('sass', reloadBrowsers));
  done();
});

gulp.task('watch:adminCss', function (done) {
  gulp.watch(paths.src.adminCss)
    .on('change', gulp.series('build:admin'));
  done();
});

gulp.task('watch:views', function (done) {
  gulp.watch([
    paths.src.adminViews, paths.src.views], gulp.parallel('templates', 'templates:admin'));
  done();
});

gulp.task('watch:adminCode', function (done) {

  gulp.watch([
    paths.src.adminScripts
  ]).on('change', gulp.parallel('useref:admin'));
  done();
});

gulp.task('watch:code', function (done) {

  gulp.watch([
    paths.src.index,
    paths.src.scripts + '/**/*.js',
    'xyz-player-component/**/*.js',
    'xyz-player-component/**/*.html'
  ])
    .on('change', gulp.series('useref:main', 'copyImages', reloadBrowsers));
  done();
});

gulp.task('watch',
  gulp.parallel('watch:styles', 'watch:views', 'watch:code', 'watch:adminCode', 'watch:adminCss'));

gulp.task('build:admin', gulp.series(
  'templates:admin',
  gulp.parallel('useref:admin', 'copyCss:admin'))
);

gulp.task('build',
  gulp.series('clean', 'loopback', 'sass', 'bower', 'templates', 'build:admin',
    gulp.parallel('useref:main', 'copyImages'),
    gulp.parallel('useref:stream', 'copyCss:stream'))
);

gulp.task('serve', gulp.parallel('loopback', 'bower', 'sass', 'browserSync:client', 'watch'));

gulp.task('default', gulp.parallel('build', 'serve'));

/*

 gulp.task('watchStream', gulp.parallel(['browserSync:stream', 'sass']), function () {
 gulp.watch('stream/scss/!**!/!*.scss', gulp.series(['sass']));
 gulp.watch([
 'stream/!*.html',
 'stream/style.css',
 'stream/views/!**!/!*.html',
 'stream/js/!**!/!*.js'
 ], browserSync.reload);
 });
 */

/*
 gulp.task('stream', function (callback) {
 gulp.series(
 gulp.parallel('browserSync:stream', 'watchStream'),
 callback
 )
 });*/


gulp.task('serveApi', function () {
  nodemon({
    script: 'server/server.js',
    ext: 'js json html jade',
    ignore: 'client/*',
    env: {'NODE_ENV': 'development'}
  })
});


gulp.task('generate-docs', function () {

  var options = {
    scripts: [
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js',
      'http://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-animate.min.js'
    ]
  };

  return gulp.src(['./client/scripts/services/lb-services.js'])
    .pipe(docs.process(options))
    .pipe(gulp.dest('./docs'));

});

gulp.task('serve-docs', function (done) {
  connect.server({
    root: 'docs',
    livereload: false,
    fallback: 'docs/index.html',
    port: 8888
  });
  done();
});

gulp.task('docs', gulp.series('loopback', 'generate-docs', 'serve-docs'));


gulp.task('save-db', function (done) {
    var hostColonPort = [mongoCreds.hosts[0].host, mongoCreds.hosts[0].port].join(':');
    var command = 'mongodump -h ' + hostColonPort + ' -d ' + mongoCreds.database + ' -u ' + mongoCreds.username + ' -p ' + mongoCreds.password + ' -o xyzDbDump';

    require('child_process')
      .exec(command, function cb(err, stdout, stderr) {
        console.log(stdout); // outputs the normal messages
        console.log(stderr); // outputs the error messages
        done(err);
      })
  }
);

gulp.task('overwrite-db-local', function (done) {
  var command = 'mongorestore --drop --host=127.0.0.1:27017 -d xyz xyzDbDump/' + mongoCreds.database;

  require('child_process')
    .exec(command, function cb(err, stdout, stderr) {
        console.log(stdout); // outputs the normal messages
        console.log(stderr); // outputs the error messages
        done(err);
      }
    )
});

var collections = 'AccessToken dj Role RoleMapping Song Space Spacedj SpaceSong'.split(' ');

gulp.task('overwrite-db-local-json', function (done) {
  var all = _.map(collections, function (name) {
    return when.promise(function (resolve, reject) {
      var command = `mongoimport --drop --host 127.0.0.1 --port 27017 --db xyz-restore-test -c ${name} backups/clean-sample/${name}.json`;
      console.log(`restoring ${name}...`)
      require('child_process')
        .exec(command, function (err, stdout, stderr) {
          console.log(stdout); // outputs the normal messages
          console.log(stderr); // outputs the error messages
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log('done restoring ', name);
            resolve(err);
          }
        })
    })
  });

  when.all(all)
    .then(function(results){
      done();
    })
});

gulp.task('copy-staging-db', gulp.series('save-db', 'overwrite-db-local'));

gulp.task('webdriver', function (done) {
  var updateCmd = './node_modules/protractor/bin/webdriver-manager update';
  var startCmd = './node_modules/protractor/bin/webdriver-manager start';

  var proc = childProcess.exec(updateCmd + ' && ' + startCmd);
  proc.stdout.on('data', function (data) {
    console.log(data);
  });
  proc.stderr.on('data', function (error) {
    console.log(error);
  });

//  proc.on('ready', done);

  proc.on('close', function (code) {
    console.log('child process exited with code ', code);
    done();
  });

  return proc;

});

gulp.task('e2e-test', function () {

  return gulp.src(paths.e2eTests + '/spec/**/*.js')
    .pipe(protractor({
      'configFile': paths.e2eTests + '/protractor-config.js',
      'args': ['--baseUrl', 'http://' + constants.domain],
      'autoStartStopServer': false,
      'debug': false
    }))
    .on('error', function (e) {
      throw e
    });
});

gulp.task('unit-test', function (done) {
  new karmaServer({
    configFile: __dirname + '/' + paths.unitTests + '/karma.conf.js',
    singleRun: true
  }, done)
    .start();

});

gulp.task('test', gulp.series(['build', 'e2e-test']));

gulp.task('restore-mongo', function (done) {
  var MongoClient = require('mongodb').MongoClient;
  console.log(mongoCreds);
  done()
//  collectionPromise = MongoClient.connect(mongoUrl)

});