var app = require('../../app.js');
var mongoose = require('mongoose');

// Default Schemaを取得
var Schema = mongoose.Schema;

// Defaultのスキーマから新しいスキーマを定義
var blogSchema = new Schema({
    // _id: Schema.Types.ObjectId,
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

// CRUD (create、read、update、delete) 操作
module.exports = {

    // read
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

    // create
    post: function (req, res) {

        console.log(req.body);

        // createでmongoに保存
        blog.create(req.body, function(err) {
            if(err) {
                console.log(err);
                console.log('エラーだよ');
            } else {
                console.log('保存');
            }
        });

    },

    // update
    put: function (req, res) {

        var id = req.params.id;
        console.log('Updating wine: ' + id);
        console.log(req.params);

        var updateBlog = req.body;
        delete updateBlog._id;

        // 検索して、書き換え
        blog.findByIdAndUpdate(id, updateBlog, function(err, result) {
            if (err) {
                res.send({'error': 'An error has occurred - ' + err});
            } else {
                console.log('Success: ' + result + ' document(s) updated');
                res.send('更新されました。');
            }
        });

    },

    // delete
    delete: function (req, res) {

        var id = req.params.id;
        console.log('Deleting blog: ' + id);
        console.log(req.params);

        // 検索して、削除する
        blog.findByIdAndRemove(id, function(err, result) {
            if (err) {
                res.send({'error': 'An error has occurred - ' + err});
            } else {
                console.log('Success: ' + result + ' document(s) deleted');
                res.send('削除されました。');
            }
        });

    }

};