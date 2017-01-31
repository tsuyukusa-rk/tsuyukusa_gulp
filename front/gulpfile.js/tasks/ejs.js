const gulp = require('gulp');
const ejs = require('gulp-ejs');
const CONFIG = require('../config.js');
const plumber = require('gulp-plumber');

gulp.task('ejsTemp', function() {
  gulp.src(CONFIG.ejs.assets)
    .pipe(plumber())
    .pipe(ejs({}, {ext: '.html'}))
    .pipe(gulp.dest(CONFIG.ejs.dest));
});
