var blogAreaArticleTmpl = '<li>'
                                + '<dl>'
                                    + '<dt><%= title %><br><span><%= uploadDate %></span></dt>'
                                    + '<% _.each(text, function(el, i) { %>'
                                        + '<dd><%= el %></dd>'
                                    + '<% }); %>'
                                + '</dl>'
                            + '</li>';
// underscore
var _ = require('underscore');
// model
var blogAreaArticleModel = require('../../models/blog/blogAreaArticleModel');

module.exports = Marionette.ItemView.extend({

    el: '#blogAreaArticle',

    template: _.template(blogAreaArticleTmpl),

    // 初期処理
    initialize: function() {

    },

    // レンダリングした時の処理
    render: function() {

        var
            // モデルをインスタンス
            articleModel = new blogAreaArticleModel(),
            // this
            that = this;

        // 非同期通信
        articleModel.fetch({
            success: function(collection, res, options) {
                that.createArticle(res, that);
            },
            error: function(collection, res, options) {
                alert('エラーが発生しました。');
            }
        });

    },

    // 記事を生成する
    createArticle: function(data, that) {

        // セレクターとテンプレートを設定
        var
            $el = $(that.el),
            template = that.template;

        // 書き出し処理
        for(var i = 0; data.length > i; i++) {
            var count = data.length - i;
            _.each(data, function(obj, i) {
                if(obj.index == count) {
                // もしindexがcountと等しい場合に、HTMLにブログ文書を追加
                    $el.append(template(obj));
                }
            });
        }

    },

    events: {

    }

});