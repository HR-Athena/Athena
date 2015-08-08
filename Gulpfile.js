/*
This Gulpfile was created based on this tutorial:
http://mindthecode.com/lets-build-an-angularjs-app-with-browserify-and-gulp/
*/

'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'); // not necessary, but adds prefixes for all browsers


var paths = {
    scripts: ['client/**/*.js', '!client/lib/**/*,js'],
    styles: ['./client/assets/**/*.css', './client/assets/**/*.scss'],
    index: './client/index.html',
    partials: ['client/app/**/*.html', '!client/index.html']
    // distDev: './dist.dev',
    // distProd: './dist.prod',
    // distScriptsProd: './dist.prod/scripts',
    // scriptsDevServer: 'devServer/**/*.js'
};


// JSHint task
gulp.task('lint', function() {
  gulp.src('./client/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
  gulp.src(['./client/app.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  // Bundle to a single file
  .pipe(concat('app-bundle.js'))
  // Output it to the dist folder
  .pipe(gulp.dest('public/scripts'));
});


// Views task
gulp.task('views', function() {
  // Get index.html
  gulp.src(paths.index)
  // Put it in the dist folder
  .pipe(gulp.dest('public/'));

  // Any other view files from app/views
  gulp.src(paths.partials)
  // Will be put in the public/views folder
  .pipe(gulp.dest('public/views/'));
});

gulp.task('styles', function() {
  gulp.src(paths.styles)
  // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
  .pipe(sass({onError: function(e) { console.log(e); } }))
  // Optionally add autoprefixer
  .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
  .pipe(gulp.dest('public/styles/'));
});


gulp.task('watch', ['lint'], function() {
  // When script files change — run lint and browserify
  gulp.watch([paths.scripts],[
    'lint',
    'browserify'
  ]);
  gulp.watch([paths.index, paths.partials], [
    'views'
  ]);
  gulp.watch([paths.styles], [
    'styles'
  ]);
});

gulp.task('default', ['watch']);
