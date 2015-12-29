// テンプレートを読み込む
var mainAreaBottomTmpl = require('../templates/mainAreaBottomView');

module.exports = Marionette.ItemView.extend({

    // 監視対象DOM
    el: '#mainAreaBottom',

    // 読み込むテンプレート
    template: mainAreaBottomTmpl,

    // イベント紐付け
    events: {

    },

    // レンダリング後の処理
    onRender: function() {

        // audioに関する処理のコンストラクタ
        var audioProto = function(num) {

            // 初期化処理
            this.initialize(num);

        };

        // 初期処理
        audioProto.prototype.initialize = function(i) {

            this.$audio = $('#audio' + i),
            this.audio = document.getElementById('audio' + i),
            this.$audiArea = $('#audioArea' + i),
            this.$play = $('#play' + i),
            this.$pause = $('#pause' + i),
            this.$time = $('#time' + i),
            this.$currentTime = $('#currentTime' + i);

            // メタデータの読み込みが完了して、メディアリソースの長さと大きさが決まって
            // テキストトラックの準備が出来た時
            var that = this;
            that.$audio.on('loadedmetadata', function() {
                that.loadedMetaData(that);
            });

        };

        // メタデータの読み込みが完了して、メディアリソースの長さと大きさが決まって
        // テキストトラックの準備が出来た時
        audioProto.prototype.loadedMetaData = function(that) {

            // 全体の曲の時間を取得
            var duration = Math.round(that.audio.duration);
            that.$time.html(Math.round(duration / 60) + ':' + duration % 60);

            // 再生
            that.$play.on('click', function() {
                that.audio.play();
            });

            // 一時停止
            that.$pause.on('click', function() {
                // 再生時間を0に戻す
                that.audio.currentTime = 0;
                that.audio.pause();
            });

            // 再生時間に変更があった場合の処理
            that.$audio.on('timeupdate', function() {

                // 現在の再生時間を取得
                var
                    currentTime = Math.round(that.audio.currentTime),
                    t;

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

        };

        // 曲ごとにインスタンス
        var movieStar = new audioProto(1);
        var amaoto = new audioProto(2);

    }

});
