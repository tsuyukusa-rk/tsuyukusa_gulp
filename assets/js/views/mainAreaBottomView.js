// テンプレートを読み込む
var mainAreaBottomTmpl = require('../templates/mainAreaBottomView');

module.exports = Marionette.ItemView.extend({

    // 監視対象DOM
    el: '#mainAreaBottom',

    // 読み込むテンプレート
    template: mainAreaBottomTmpl,

    // イベント紐付け
    events: {

    }

});