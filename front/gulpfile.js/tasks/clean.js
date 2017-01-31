const gulp = require('gulp');
const del = require('del');
const CONFIG = require('../config.js');

gulp.task('clean', ()=> { return del(CONFIG.dest); });
