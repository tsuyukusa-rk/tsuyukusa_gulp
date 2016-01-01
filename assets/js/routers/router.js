// blog記事生成用
var blogAreaArticleView = require('../views/blog/blogAreaArticleView');

module.exports = Backbone.Router.extend({

    // ハッシュと関数を関連付ける
    routes: {
        '': 'index',
        'blog': 'blog'
    },

    // トップページ用
    index: function() {

        // コンテンツ切り替え
        $('#mainArea').show();
        $('#blogArea').hide();

    },

    // blogページ用
    blog: function() {

        // 他コンテンツを非表示に
        $('#mainArea').hide();

        // ビューをインスタンス
        var articleView = new blogAreaArticleView();
        articleView.render();

        // 該当コンテンツを表示
        $('#blogArea').show();

    }

});
