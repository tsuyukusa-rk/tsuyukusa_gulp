const gulp = require('gulp');
const CONFIG = require('../config.js');

// watchを設定（モジュールを入れる必要はない）
gulp.task('watch', ()=> {
  gulp.watch(CONFIG.watch.html, ['ejsTemp']);
  gulp.watch(CONFIG.watch.css, ['css']);
  gulp.watch(CONFIG.watch.script, ['webpack']);
  var copyWatches = [];
  // 複製タスクはループで回して監視対象とする
  CONFIG.copy.forEach((src)=> { copyWatches.push(src.from); });
  gulp.watch(copyWatches, ['copy']);
});
