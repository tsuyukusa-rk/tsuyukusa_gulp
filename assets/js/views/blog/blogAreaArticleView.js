var blogAreaArticleTmpl = '<li>'
                                + '<dl>'
                                    + '<dt><%= title %><br><span><%= uploadDate %></span></dt>'
                                    + '<% _.each(text, function(el, i) { %>'
                                        + '<dd><%= el %></dd>'
                                    + '<% }); %>'
                                + '</dl>'
                            + '</li>';

var _ = require('underscore');

module.exports = Marionette.ItemView.extend({

    el: '#blogAreaArticle',

    template: _.template(blogAreaArticleTmpl),

    // 初期処理
    initialize: function() {

    },

    // レンダリングした時の処理
    render: function(data) {

        // データがない場合は処理しない
        if(typeof data == 'undefined') {
            return false;
        }

        console.log(data[0]);

        // セレクターとテンプレートを設定
        var
            $el = $(this.el),
            template = this.template;

        // 書き出し処理
        for(var i = 0; data[0].length > i; i++) {
            var count = data[0].length - i;
            _.each(data[0], function(obj, i) {
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