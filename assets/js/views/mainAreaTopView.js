// テンプレートを読み込む
var mainAreaTopTmpl = require('../templates/mainAreaTopView');

module.exports = Marionette.ItemView.extend({

    // 監視対象DOM
    //イベントに紐付けるセレクターはelと相対的に指定出来る
    el: '#mainAreaTop',

    // 読み込むテンプレート
    template: mainAreaTopTmpl,

    // イベント紐付け
    events: {
        'click li': 'changeTab'
    },

    // タブ切り替え時の処理
    changeTab: function() {
        console.log('タブをクリック')
    }

});