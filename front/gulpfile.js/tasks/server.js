const gulp = require('gulp');
const webserver = require('gulp-webserver');
const CONFIG = require('../config.js');

// ローカルサーバーの設定
gulp.task('server',()=> {
  gulp.src(CONFIG.dest)
    .pipe(webserver({
      livereload: true,
      port: 8001,
      // fallback: 'index.html',
      open: true
    }));
});
