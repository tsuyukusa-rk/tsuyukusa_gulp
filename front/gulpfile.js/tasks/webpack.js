const gulp = require('gulp');
const webpack = require('gulp-webpack');
const webpackConf = require('../webpack.config.js');
const CONFIG = require('../config.js');
const named = require('vinyl-named');

gulp.task('webpack', ()=> {
  return gulp.src(CONFIG.webpack.assets)
    // .pipe(named())
    .pipe(webpack(webpackConf))
    .pipe(gulp.dest(CONFIG.webpack.dest));
});
