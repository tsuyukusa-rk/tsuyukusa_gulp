const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');

requireDir('./tasks', {recurse: true});

gulp.task('build', (callback)=> {
  return runSequence(['ejsTemp', 'webpack', 'css', 'copy'], callback);
});

gulp.task('default', ['clean'], ()=> {
  return runSequence('build', 'server', 'watch');
});
