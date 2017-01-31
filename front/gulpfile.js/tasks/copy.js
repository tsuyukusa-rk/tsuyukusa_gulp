const gulp = require('gulp');
const stylus = require('gulp-stylus');
const CONFIG = require('../config.js');
const ms = require('merge-stream');
const _ = require('lodash');

gulp.task('copy', ()=> {
  var stream = ms();
  _.forEach(CONFIG.copy,(file)=> {
    stream.add(gulp.src(file.from).pipe(gulp.dest(file.to)));
  });
  return stream;
});
