/*jshint esversion: 6 */

const gulp            = require('gulp'),
      sass            = require('gulp-sass'),
      cleanCSS        = require('gulp-clean-css'),
      autoprefixer    = require('gulp-autoprefixer'),
      rename          = require('gulp-rename'),
      inject          = require('gulp-inject'),
      uglify          = require('gulp-uglify'),
      concat          = require('gulp-concat'),
      plumber         = require('gulp-plumber'),
      babel           = require('gulp-babel'),
      browserify      = require('browserify'),          //Import libary (import <x> from 'y';)
      clean           = require('gulp-clean'),
      sourcemaps      = require('gulp-sourcemaps'),
      source          = require('vinyl-source-stream'),
      buffer          = require('vinyl-buffer'),
      pathmodify      = require('pathmodify'),
      babelify        = require('babelify'),
      browserSync     = require('browser-sync');             //Browser Server

const BUILD_DIR       = './build/';

// ############################
// MINIFY/COMPILE SASS
gulp.task('sass', function() {
    gulp.src('./app/components/style/*.sass')
      .pipe(sourcemaps.init())
          .pipe(plumber())                                  //No gulp restart needed if there's a error
          .pipe(sass().on('error', sass.logError))          //Convert Sass into css
          .pipe(autoprefixer())                             //Prefix: -webkit -o ...
          .pipe(cleanCSS())                                 //Minify CSS
          .pipe(concat('stylesheet.css'))
      .pipe(sourcemaps.write('.'))                          //Sourcemap helps to find bugs
      .pipe(gulp.dest(BUILD_DIR + 'assets/css/'))            //Target destination
      .pipe(browserSync.stream());                          //Reload server
});

// ############################
// MINIFY JS
gulp.task('js', function() {
    compile();
});

function compile() {
  var bundler = browserify('app/index.jsx', {
    debug: true,
    transform: [babelify.configure({
      presets: ['es2015', 'react', 'stage-0']
    })],
    extensions: [ '.js', '.jsx', '.json' ]
  });

  function bundle() {
    return bundler
      .bundle()
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(BUILD_DIR))
      .pipe(browserSync.stream());
  }

  return bundle();
}

// ############################
// Define SCRIPT Task
gulp.task('all', ['sass', 'js']);

// ###########################
// WATCH
gulp.task('default', function() {

  browserSync.init({
    server: BUILD_DIR
  });

  gulp.watch(['./app/components/style/*.sass'], ['sass']);
  gulp.watch(['./app/**/*.jsx'], ['js']);
});
