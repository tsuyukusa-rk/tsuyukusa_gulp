var app = require('../../app.js');
var mongoose = require('mongoose');

// Default Schemaを取得
var Schema = mongoose.Schema;

// Defaultのスキーマから新しいスキーマを定義
var blogSchema = new Schema({
    name: String
    // , year: String
    // , grapes: String
    // , country: String
    // , region: String
    // , description: String
    // , picture: String
    // , date: Date
});

// モデル化。model('[登録名]', '定義したスキーマクラス')
mongoose.model('blogs', blogSchema);

// mongodb://[hostname]/[dbname]
mongoose.connect('mongodb://localhost/tsuyukusa');

// mongoDB接続時のエラーハンドリング
var blog;
var db = mongoose.connection;
var testDate;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to 'blog' database");
    // 定義したときの登録名で呼び出し
    blog = mongoose.model('blogs');
    blog.find({}, function(err, docs) {
        if(!err) {
            console.log(docs);
            console.log("num of item => " + docs.length);
            for (var i = 0; i < docs.length; i++ ) {
                console.log(docs[i]);
                testDate = docs[i];
            }
            // mongoose.disconnect(); // mongodbへの接続を切断
            // process.exit();         // node.js終了
        } else {
            console.log("find error");
        }
    });
    console.log(blog);
    // populateDB();
});

module.exports = {

    get: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        // testDate = JSON.parse(testDate);
        console.log(testDate);
        res.write(testDate.id);
        res.on('end', function() {

        });
    },

    post: function (req, res) {
        res.send('Got a POST request');
    },

    put: function (req, res) {
        res.send('Got a PUT request at /user');
    },

    delete: function (req, res) {
        res.send('Got a DELETE request at /user');
    }

};