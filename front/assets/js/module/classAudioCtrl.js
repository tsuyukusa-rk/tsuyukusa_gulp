module.exports = class audioCtrl {

    // コンストラクタを定義
    constructor(num) {
        // 初期化処理
        this.initialize(num);
    }

    // 初期処理
    initialize(i) {

        this.$audio = $('#audio' + i),
        this.audio = document.getElementById('audio' + i),
        this.$audiArea = $('#audioArea' + i),
        this.$play = $('#play' + i),
        this.$pause = $('#pause' + i),
        this.$stop = $('#stop' + i),
        this.$time = $('#time' + i),
        this.$currentTime = $('#currentTime' + i),
        this.$prevCtrl = $('#prevCtrl' + i),
        this.$nextCtrl = $('#nextCtrl' + i);

        // メタデータの読み込みが完了して、メディアリソースの長さと大きさが決まって
        // テキストトラックの準備が出来た時
        var that = this;
        that.$audio.on('loadedmetadata', function() {
            that.loadedMetaData(that);
        });

    }

    // メタデータの読み込みが完了して、メディアリソースの長さと大きさが決まって
    // テキストトラックの準備が出来た時
    loadedMetaData(that) {

        // 全体の曲の時間を取得
        var duration = Math.round(that.audio.duration);
        that.$time.html(Math.round(duration / 60) + ':' + duration % 60);

        // 初期値は絶対に、0:00
        that.$currentTime.html('0:00');

        // 再生
        that.$play.on('click', function() {
            that.audio.play();
        });

        // 一時停止
        that.$pause.on('click', function() {
            // 再生を止める
            that.audio.pause();
        });

        // 停止
        that.$stop.on('click', function() {
            // 再生時間を0に戻す
            that.audio.currentTime = 0;
            that.audio.pause();
        });

        // 巻き戻し
        that.$prevCtrl.on('click', function() {
            // 再生時間を10戻す
            that.audio.currentTime -= 10;
        });

        // 早送り
        that.$nextCtrl.on('click', function() {
            // 再生時間を10送る
            that.audio.currentTime += 10;
        });

        // 再生時間に変更があった場合の処理
        that.$audio.on('timeupdate', function() {

            // 現在の再生時間を取得
            var currentTime = Math.round(that.audio.currentTime);
            var t;

            // 1分未満の場合
            if(currentTime < 60) {

                if(currentTime < 10) {
                // 一桁の場合
                    t = '0:' + '0' + currentTime;
                } else {
                // 二桁の場合
                    t = '0:' + currentTime;
                }

            }

            // 1分以上の場合
            if(currentTime >= 60) {

                var seconds = currentTime % 60;
                // 一桁の場合
                if(String(seconds).length < 2) {
                    seconds = '0' + seconds;
                }
                t = Math.round(currentTime / 60) + ':' + seconds;
            }

            // 埋め込み処理
            that.$currentTime.html(t);

        });

    }

};
