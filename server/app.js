/*
* モジュール読み込み
*/
var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// ルーティン設定処理の読み込み
var routes = require('./modules/routes/router.js');

/*
* サーバーの設定を記述していく
*/
var app = express();
module.exports = app;

// ドキュメントルートの設定
app.use(express.static('./public'));
// body-parserプラグインにより下記設定で、リクエストのパラメーターを取得できる
app.use(bodyParser.urlencoded({extended: true}));

// CRUD (create、read、update、delete) 操作と HTTP メソッドとが 1 対 1 に対応付けられること
// サーバー上にリソースを作成するためには POST
// リソースを取得するためには GET
// リソースの状態を変更、または更新するためには PUT
// リソースを除去、または削除するためには DELETE

// getによるリクエストの挙動
// リソースの取得
app.get('/blog', routes.get);

// postによるリクエストの挙動
// リソースの新規追加
app.post('/blog', routes.post);

// putによるリクエストの挙動
// リソースの書き換え
app.put('/blog', routes.put);

// deleteによるリクエストの挙動
// リソースの削除
app.delete('/blog', routes.delete);

/*
* サーバーの起動
*/
// appを引数としてhttpのサーバーを立てる
var server = http.createServer(app);
// portの指定
server.listen(3000);
// htmlファイルの読み込み
// server.on('request', function(req,res) {
//     fs.readFile('public/index.html', 'utf-8', function(err,data) {
//         if(err){
//             res.writeHead(404,{'content-Type': 'text/plain'});
//             res.write("not found");
//             return res.end();
//         }
//         res.writeHead(200,{'content-Type': 'text/html'});
//         res.write(data);
//         res.end();
//     });
// });