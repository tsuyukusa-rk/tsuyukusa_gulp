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
            $twFrame.contents().find('body').css({
                "font-family": "'Noto Sans Japanese', 'メイリオ', sans-serif"
            });
        } else {
            // 見つかるまで繰り返す
            setTimeout(function() {
                that.initialize();
            }, 500);
        }

    }

}
