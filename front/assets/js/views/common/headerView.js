// テンプレートを読み込む
var headerTmpl = require('../../templates/common/headerView');

// header用のviewを定義
module.exports = Marionette.CompositeView.extend({

    // 監視対象要素を定義
    el: '#header',

    template: headerTmpl,

    // イベントを定義
    events: {

    },

    // レンダリング後の処理
    onRender: function() {

        // topにもどる処理
        this.returnTop();

    },

    // topにもどる処理
    returnTop: function() {

        var $returnTop = $('#returnTop');

        // スクロール位置を取得して、ボタンを出し分ける
        var scrollPosition;
        $(window).on('scroll', function() {
            scrollPosition = $(this).scrollTop();
            if(scrollPosition > 300) {
                $returnTop.fadeIn();
            } else {
                $returnTop.fadeOut();
            }
        });

        // クリックした時に一番上に
        $returnTop.on('click', function() {
            $('html,body').animate({
                scrollTop: 0
            }, 1000);
        });

    }

});
