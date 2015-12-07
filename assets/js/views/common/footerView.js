// テンプレートを読み込む
var footerTmpl = require('../../templates/common/footerView');

module.exports = Marionette.ItemView.extend({

    // 監視対象DOM
    el: '#footer',

    // 読み込むテンプレート
    template: footerTmpl,

    // イベント紐付け
    events: {

    }

});