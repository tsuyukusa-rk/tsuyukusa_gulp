module.exports = class changeWidget {

    // コンストラクタを定義
    constructor() {
        // 初期化処理
        this.initialize();
    }

    // 初期処理
    initialize() {

        var
            $twFrame = $('iframe.twitter-timeline'),
            that = this;

        if ($twFrame.length > 0) {
            // スタイルの調整
            $twFrame.contents().find('html, body, .sandboxroot, h1, p, ul, li, iframe, button').css({
                "font-family": "'Noto Sans Japanese', 'メイリオ', sans-serif",
                color: '#777777'
            });
            $twFrame.contents().find('.header').css({
                "margin": "0 0 5px"
            });
            $twFrame.contents().find('.e-entry-title').css({
                'font-size': '12px'
            });
        } else {
            // 見つかるまで繰り返す
            setTimeout(function() {
                that.initialize();
            }, 500);
        }

    }

}
