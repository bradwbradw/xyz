var gulp = require('gulp');
var loopbackAngular = require('gulp-loopback-sdk-angular');

var bower = require('gulp-bower');
var rename = require("gulp-rename");
var useref = require('gulp-useref');

var gulpIf = require('gulp-if');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');

var uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
var replace = require('gulp-replace');

var del = require('del');
var runSequence = require('run-sequence');

var keys = {
  fb: process.env.FB_APP_ID || '1507355422928214',
  sc: process.env.SC_KEY || 'c29e4129f2bba3771a5472a65cad37e4',
  yt: process.env.YT_KEY || 'AIzaSyAv5-et2TSQ3VsA5eKLviq2KjfExzFLxO8'
};

var apiUrl = process.env.API_URL || 'http://localhost:5005/api';

console.log('api Url is ',apiUrl);

gulp.task('loopback', function () {
	return gulp.src('./server/server.js')
    .pipe(loopbackAngular(
      {
        apiUrl:apiUrl
      }
    ))
    .pipe(rename('lb-services.js'))
    .pipe(gulp.dest('./client/scripts/services'));
});
//lb-ng server/server.js client/scripts/services/lb-services.js -u http://0.0.0.0:3000/api && node docs.js

gulp.task('clean', function() {
  return del.sync('dist');
});

gulp.task('sass', function(){
  return gulp.src('client/scss/**/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('client/css'))

});

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('client/vendor'))
});

gulp.task('copyHtml', function(){
  return gulp.src('client/views/**/*.html')
    .pipe(gulp.dest('dist/views'))
});

gulp.task('useref', function(){
	return gulp.src('client/index.html')

    .pipe(replace('%%%facebookAppId', keys.fb))
    .pipe(replace('%%%scKey', keys.sc))
    .pipe(replace('%%%ytKey', keys.yt))
    .pipe(replace('%%%API_URL', apiUrl))
  	.pipe(useref())
//	.pipe(gulpIf('*.js',uglify()))
  .pipe(gulpIf('*.css', cssnano()))
	.pipe(gulp.dest('dist'))
});

gulp.task('build:production', function (callback) {
  runSequence('clean', 'loopback','sass','bower',
    [ 'useref', 'copyHtml'],
    callback
  )
});






var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var nodemon = require('gulp-nodemon');
var historyApiFallback = require('connect-history-api-fallback');
var browserSync = require('browser-sync');


gulp.task('watch', ['browserSync:client', 'sass'], function(){
	gulp.watch('client/scss/**/*.scss', ['sass']);
	gulp.watch([
    'client/*.html' ,
    'client/css/*.css', // this line is actually not supposed to be here, updated sass should get compiled and injected without reloading
    'client/views/**/*.html',
    'client/scripts/**/*.js',
    ], browserSync.reload);
});

gulp.task('browserSync:client', function() {
  browserSync({
    server: {
      baseDir: 'client',
      index: 'index.html',
      middleware: [ historyApiFallback() ]
    },
    ui:{
      port:9006
    },
    port:9005
  })
});

gulp.task('browserSync:dist', function(){
  browserSync({
    server: {
      baseDir: 'dist',
      index: 'index.html',
      middleware: [ historyApiFallback() ]
    },
    port:9000
  })
});

gulp.task('trybuild', function(callback){
  runSequence('build','browserSync:dist', callback);
});



gulp.task('browserSync:stream', function(){
  browserSync({
    server: {
      baseDir: 'stream',
      index: 'index.html',
      middleware: [ historyApiFallback() ]
    },
    port:9001
  })
});



gulp.task('loopback', function () {
	return gulp.src('./server/server.js')
    .pipe(loopbackAngular(
      {
        apiUrl:apiUrl
      }
    ))
    .pipe(rename('lb-services.js'))
    .pipe(gulp.dest('./client/scripts/services'));
});
//lb-ng server/server.js client/scripts/services/lb-services.js -u http://0.0.0.0:3000/api && node docs.js

gulp.task('clean', function() {
  return del.sync('dist');
});








gulp.task('build', function (callback) {
  runSequence('clean', 'loopback','sass','bower',
    [ 'useref', 'copyHtml'],
    callback
  )
});

gulp.task('default', function (callback) {
  runSequence(['loopback','bower','sass','browserSync:client', 'watch'],
    callback
  )
});








gulp.task('watchStream', ['browserSync:stream', 'sass'], function(){
    gulp.watch('stream/scss/**/*.scss', ['sass']);
    gulp.watch([
        'stream/*.html' ,
        'stream/style.css',
        'stream/views/**/*.html',
        'stream/js/**/*.js',
    ], browserSync.reload);
});


gulp.task('stream', function (callback) {
  runSequence(['browserSync:stream', 'watchStream'],
    callback
  )
});


gulp.task('serveApi', function () {
  nodemon({
    script: 'server/server.js',
   ext: 'js json html jade',
    ignore: 'client/*',
   env: { 'NODE_ENV': 'development' }
  })
});


