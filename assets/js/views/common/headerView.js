// テンプレートを読み込む
var headerTmpl = require('../../templates/common/headerView');

// header用のviewを定義
module.exports = Marionette.ItemView.extend({

    // 監視対象要素を定義
    el: '#header',

    template: headerTmpl,

    // イベントを定義
    events: {

    }

});