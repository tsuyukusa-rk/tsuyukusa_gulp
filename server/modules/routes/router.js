var app = require('../../app.js');
var mongoose = require('mongoose');

// Default Schemaを取得
var Schema = mongoose.Schema;

// Defaultのスキーマから新しいスキーマを定義
var blogSchema = new Schema({
    index: Number,
    imgSrc1: String,
    text: Array,
    title: String,
    category: String,
    uploadDate: String
});

// モデル化。model('[登録名]', '定義したスキーマクラス')
mongoose.model('blogs', blogSchema);

// mongodb://[hostname]/[dbname]
mongoose.connect('mongodb://localhost/tsuyukusa');

// mongoDB接続時のエラーハンドリング
var blog = mongoose.model('blogs');
var db = mongoose.connection;
var jsonDate;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function() {
    console.log("Connected to 'blog' database");
});

module.exports = {

    get: function(req, res) {

        // レスポンスのコンテンツタイプを定義
        res.contentType('application/json');

        // データをごっそりとってくる
        blog.find({}, function(err, docs) {

            if(!err) {
            // エラーがなかった場合、jsonを送る
                res.send(docs);
            } else {
            // エラーが出ていた場合
            }

        });

        // end
        res.on('end', function() {

        });

    },

    post: function (req, res) {

        console.log(req.body);

        // createでmongoに保存
        blog.create(req.body, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log('保存');
            }
        });

    },

    put: function (req, res) {
        res.send('Got a PUT request at /user');
    },

    delete: function (req, res) {
        res.send('Got a DELETE request at /user');
    }

};