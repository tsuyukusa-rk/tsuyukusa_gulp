module.exports = class scrollLink {

    // コンストラクタを定義
    constructor() {
        // 初期化処理
        this.initialize();
    }

    // 初期処理
    initialize() {

        $('a').on('click', function() {

            var
                $this = $(this),
                thisAttr = $this.attr('data-scrollLink');

            // 属性がなければ、処理しない
            if(typeof thisAttr == 'undefined') {
                return;
            }

            // アニメーションでスクロール
            var positionTop = $('#' + thisAttr).offset().top;
            $('html, body').animate({
                scrollTop: positionTop
            }, 1500);
            return false;

        });

    }

}
