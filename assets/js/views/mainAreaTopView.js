// テンプレートを読み込む
var mainAreaTopTmpl = require('../templates/mainAreaTopView');

// ajax
var apiCall = require('../module/apiCall');

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

    /*
    * タブ切り替え時の処理
    * @param e
    */
    changeTabCtrl: function(e) {

        console.log('タブをクリック');

        // 変数を定義
        var
            $target = $(e.target),
            thisId = $target.attr('id'),
            tab01 = 'tabLiveSchedule',
            tab02 = 'tabBiography',
            tab03 = 'tabBlog';

        if(thisId == tab01) {
        // ライブスケジュールのタブの時
            this.tab01Fn(tab01);
        } else if(thisId == tab02) {
        // バイオグラフィーのタブの時
            this.tab02Fn(tab02);
        } else if(thisId == tab03) {
        // ブログのタブが押された時
            this.tab03Fn(tab03);
        }

    },

    /*
    * ライブスケジュールが押された時の処理
    * @param elName:タブのセレクタ
    */
   tab01Fn: function(elName) {

        console.log(elName);

        var
            // api用のsettingを定義
            setting = {
                url: '/js/data/schedule.json'
            },
            // スケジュール埋め込み処理
            doBuild = function(json) {

                var scheduleArray = []; // トップページ表示用のHTML格納場所
                var scheduleArrayModal = []; // モーダル表示用のHTML格納場所

                // スケジュールの数だけ回す
                for(var i = 0; i < json.schedule.length; i++){

                    if(i < 4){
                    // スケジュールのデータが、３以下の場合はトップページへ
                        scheduleArray.push('<dt><span>' + json.schedule[i].date + '<br><a href="' + json.schedule[i].url + '" target="_blank">' + json.schedule[i].place + '</a></span></dt><dd class="liveScheduleTxt">open&nbsp;' + json.schedule[i].time[0].open + '&nbsp;/&nbsp;start&nbsp;' + json.schedule[i].time[0].start + '<br>ticket&nbsp;' + json.schedule[i].ticket + '</dd>');

                    } else {
                    // スケジュールのデータが、４以上の場合はモーダルへ
                        scheduleArrayModal.push('<dt><span>' + json.schedule[i].date + '<br><a href="' + json.schedule[i].url + '" target="_blank">' + json.schedule[i].place + '</a></span></dt><dd class="liveScheduleTxt">open&nbsp;' + json.schedule[i].time[0].open + '&nbsp;/&nbsp;start&nbsp;' + json.schedule[i].time[0].start + '<br>ticket&nbsp;' + json.schedule[i].ticket + '</dd>');
                    }
                }

                // HTML書き出し処理
                $('#tabContents').prepend(scheduleArray);
                // $('.scheduleApiModal').append(scheduleArrayModal);

            };

        // JSONを取得し、書き出す
        apiCall(setting, doBuild);

   }

});