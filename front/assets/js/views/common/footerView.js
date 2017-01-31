// テンプレートを読み込む
var footerTmpl = require('../../templates/common/footerView');

// twitterウィジェット
var widget = require('../../module/classTwitterWidget');

module.exports = Marionette.CompositeView.extend({

    // 監視対象DOM
    el: '#footer',

    // 読み込むテンプレート
    template: footerTmpl,

    // イベント紐付け
    events: {

    },

    // レンダリング後の処理
    onRender: function() {

        // twitterのレイアウト調整
        var twitter = new widget();

    }

});
