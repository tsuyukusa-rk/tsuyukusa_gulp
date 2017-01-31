const gulp = require('gulp');
const stylus = require('gulp-stylus');
const CONFIG = require('../config.js');
const plumber = require('gulp-plumber');

gulp.task('css', ()=> {
  gulp.src(CONFIG.stylus.assets)
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest(CONFIG.stylus.dest));
});
