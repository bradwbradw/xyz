var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');
var replace = require('gulp-replace');
var connect = require('gulp-connect');
var nodemon = require('gulp-nodemon');
var bower = require('gulp-bower');
var rename = require("gulp-rename");
var loopbackAngular = require('gulp-loopback-sdk-angular');

var del = require('del');

var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var runSequence = require('run-sequence');

var keys = {
  fb: process.env.FB_APP_ID || '1507355422928214',
  sc: process.env.SC_KEY || 'c29e4129f2bba3771a5472a65cad37e4',
  yt: process.env.YT_KEY || 'AIzaSyAv5-et2TSQ3VsA5eKLviq2KjfExzFLxO8'
};

var apiUrl = process.env.API_URL || 'http://localhost:3000/api';

gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('client/vendor'))
});


/*
gulp.task('name', function(){
	// stuff
})
*/

gulp.task('useref', function(){
	return gulp.src('client/index.html')

    .pipe(replace('%%%facebookAppId', keys.fb))
    .pipe(replace('%%%scKey', keys.sc))
    .pipe(replace('%%%ytKey', keys.yt))
    .pipe(replace('%%%API_URL', apiUrl))
	.pipe(useref())
	.pipe(gulpIf('*.js',uglify()))
  .pipe(gulpIf('*.css', cssnano()))
	.pipe(gulp.dest('dist'))
});

gulp.task('sass', function(){
  return gulp.src('client/scss/**/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(gulp.dest('client/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass'], function(){
	gulp.watch('client/scss/**/*.scss', ['sass']);
	gulp.watch([
    'client/*.html' ,
    'client/views/**/*.html',
    'client/scripts/**/*.js',
    ], browserSync.reload);
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'client',

    },
    ui:{
      port:9001

    },
    port:9000,

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
  runSequence('clean', 'loopback',
    ['bower','sass', 'useref'],
    callback
  )
});

gulp.task('default', function (callback) {
  runSequence(['loopback','bower','sass','browserSync', 'watch'],
    callback
  )
});




















/*



gulp.task('index', function(){


  gulp.src(['client/index-source.html'])
    .pipe(replace('%%%facebookAppId', keys.fb))
    .pipe(replace('%%%scKey', keys.sc))
    .pipe(replace('%%%ytKey', keys.yt))
    .pipe(rename('client/index.html'))
    .pipe(gulp.dest('client'));
});

gulp.task('js', function () {
   return gulp.src('client/scripts/!**!/!*.js')
//      .pipe(jshint())
//      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('scriptsconcat.js'))
      .pipe(gulp.dest(buildDest));
});

gulp.task('copy',function(){
  return gulp.src([
    'client/!**!/!*','!'+indexHtml])
    .pipe(gulp.dest(buildDest));
})

gulp.task('serveBuild', function() {
    connect.server({
      root: 'build/',
      port: 9000,
      host:'0.0.0.0',
      fallback: 'build/index.html',
      livereload: true
    });
// maybe could also set up to run api server at the same time
/!*    connect.server({
      root: buildDest,
      port: 9000,
      host:'0.0.0.0',
      fallback: buildDest+'/index.html',
      livereload: true
    });*!/

  gulp.src('client/!**!/!*').pipe(connect.reload());
});

gulp.task('serveApi', function () {
  nodemon({
    script: 'server/server.js',
   ext: 'js json html jade',
    ignore: 'client/!*',
   env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('build',['js','copy', 'overwriteconfig']);

gulp.task('default',['js','copy', 'bower','config','serveBuild']);*/