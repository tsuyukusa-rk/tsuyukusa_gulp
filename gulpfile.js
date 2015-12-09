// gulpの設定ファイル
// モジュールをrequireする
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var ejs = require('gulp-ejs');
var runSequence = require('run-sequence');
var webpack = require('gulp-webpack');
var webpackConf = require('./webpack.config.js');
var named = require('vinyl-named');
var webserver = require('gulp-webserver');
var del = require('del');
var plumber = require('gulp-plumber');
var _ = require('lodash');
var ms = require('merge-stream');
var pathes = require('path');

// パスを定義
var path = {
    assets: './assets',
    dest: './server/public'
};

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

// ファイル削除
gulp.task('clean', function() {
  return del(path.dest);
});

// ejs（テンプレートエンジン）の設定
gulp.task('ejsTemp', function() {
    gulp.src(
        [
            path.assets + '/**/*.ejs',
            '!' + path.assets + '/**/_*.ejs'
        ]
    )
        .pipe(plumber())
        .pipe(ejs())
        .pipe(gulp.dest(path.dest));
});

// stylusの設定
gulp.task('css', function() {
    gulp.src(path.assets + '/css/**/*.styl')
        .pipe(plumber())
        .pipe(stylus())
        .pipe(gulp.dest(path.dest + '/css'));
});

// ファイルコピーの設定
var files = [
    {
        from: path.assets + '/jplayer/**/*',
        to: path.dest + '/jplayer'
    },
    {
        from: path.assets + '/img/**/*',
        to: path.dest + '/img'
    },
    {
        from: path.assets + '/**/*.json',
        to: path.dest
    }
];
gulp.task('copy', function () {
    var stream = ms();
    _.forEach(files,function(file) {
        stream.add(gulp.src(file.from)
            .pipe(gulp.dest(file.to)));
    });
    return stream;
});

// webpackの設定
function exeWebPack(watch) {
    webpackConf.watch = watch;
    return gulp.src(path.assets + '/js/app.js')
        .pipe(named())
        .pipe(webpack(webpackConf))
        .pipe(gulp.dest(path.dest + '/js'));
};

gulp.task('script', function() {
  return exeWebPack(false);
});

gulp.task('watchScript', function() {
  return exeWebPack(true);
});

// watchを設定（モジュールを入れる必要はない）
gulp.task('watch', function() {
    gulp.watch([path.assets + '/**/*.ejs', '!' + path.assets + '/**/_*.ejs'], ['ejsTemp']);
    gulp.watch(path.assets + '/css/**/*.styl', ['css']);
    var copyWatches = [];
    // 複製タスクはループで回して監視対象とする
    if (files) {
        files.forEach(function(src) {
            copyWatches.push(src.from);
        });
        gulp.watch(copyWatches, ['copy']);
    }
});

// ローカルサーバーの設定
gulp.task('server',function(){
    gulp.src(path.dest)
        .pipe(webserver({
            livereload: true,
            port: 8001,
            // fallback: 'index.html',
            open: true
        }));
});

// タスクを定義
gulp.task('build', function(callback) {
    return runSequence(['ejsTemp', 'script', 'css', 'copy'], callback);
});

gulp.task('default', ['clean'], function() {
    return runSequence('build', 'server', 'watch', 'watchScript');
});