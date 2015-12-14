// テンプレートを読み込む
var mainAreaTopTmpl = require('../templates/mainAreaTopView');

// ajax
var scheduleModel = require('../models/scheduleModel');

module.exports = Marionette.ItemView.extend({

    // 監視対象DOM
    //イベントに紐付けるセレクターはelと相対的に指定出来る
    el: '#mainAreaTop',

    // 読み込むテンプレート
    template: mainAreaTopTmpl,

    // イベント紐付け
    events: {
        'click li': 'changeTabCtrl'
    },

    // レンダリング後の処理
    onRender: function() {

        // スケジュール埋め込み処理
        var doBuild = function(json) {

            // トップページ表示用のHTML格納場所
            var scheduleArray = [];

            // スケジュールの数だけ回す
            for(var i = 0; i < json.schedule.length; i++){
                scheduleArray.push('<dt><span>' + json.schedule[i].date + '<br><a href="' + json.schedule[i].url + '" target="_blank">' + json.schedule[i].place + '</a></span></dt><dd class="liveScheduleTxt">open&nbsp;' + json.schedule[i].time[0].open + '&nbsp;/&nbsp;start&nbsp;' + json.schedule[i].time[0].start + '<br>ticket&nbsp;' + json.schedule[i].ticket + '</dd>');
            }

            // HTML書き出し処理
            $('#tabContents').prepend(scheduleArray);

        };

        // JSONを取得し、書き出す
        var model = new scheduleModel();
        model.fetch({
            success: function(collection, res, options) {
                doBuild(res);
            },
            error: function() {
                alert('エラーが発生しました。');
            }
        });

    },

    /*
    * タブ切り替え時の処理
    * @param e
    */
    changeTabCtrl: function(e) {

        // 変数を定義
        var
            $target = $(e.target),
            thisId = $target.attr('id'),
            tab01 = 'tabLiveSchedule',
            tab02 = 'tabBiography',
            tab03 = 'tabBlog';

        // 一旦activeクラスをクリアする
        $(this.el).find('li').removeClass('active');

        if(thisId == tab01) {
        // ライブスケジュールのタブの時
            $('#' + tab01).addClass('active');
        } else if(thisId == tab02) {
        // バイオグラフィーのタブの時
            $('#' + tab02).addClass('active');
        } else if(thisId == tab03) {
        // ブログのタブが押された時
            $('#' + tab03).addClass('active');
        }

    }

});