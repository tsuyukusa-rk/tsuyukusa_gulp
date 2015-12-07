// テンプレートを読み込む
var mainAreaTopTmpl = require('../templates/mainAreaTopView');

module.exports = Marionette.ItemView.extend({

    // 監視対象DOM
    el: '#mainAreaTop',

    // 読み込むテンプレート
    template: mainAreaTopTmpl,

    // イベント紐付け
    events: {

    }

});