// テンプレートを読み込む
var mainAreaTopTmpl = require('../templates/mainAreaTopView');

// ajax
var scheduleModel = require('../models/scheduleModel');

// ページ内リンク
var scrollLink = require('../module/classScrollLink');

module.exports = Marionette.ItemView.extend({

    // 監視対象DOM
    //イベントに紐付けるセレクターはelと相対的に指定出来る
    el: '#mainAreaTop',

    // 読み込むテンプレート
    template: mainAreaTopTmpl,

    // イベント紐付け
    events: {
        'click #tabTitles > li': 'changeTabCtrl'
    },

    // レンダリング後の処理
    onRender: function() {

        // スケジュール埋め込み処理
        var doBuild = function(json) {

            // トップページ表示用のHTML格納場所
            var scheduleArray = [];

            scheduleArray.push('<ul>');

            // スケジュールの数だけ回す
            for(var i = 0; i < json.schedule.length; i++){
                scheduleArray.push('<li><dl><dt><span>' + json.schedule[i].date + '&nbsp;<a href="' + json.schedule[i].url + '" target="_blank">' + json.schedule[i].place + '</a></span></dt><dd class="liveScheduleTxt">open&nbsp;' + json.schedule[i].time[0].open + '&nbsp;/&nbsp;start&nbsp;' + json.schedule[i].time[0].start + '&nbsp;/&nbsp;ticket&nbsp;' + json.schedule[i].ticket + '</dd></dl></li>');
            }

            scheduleArray.push('</ul>');

            // HTML書き出し処理
            $('#liveSchedule').html(scheduleArray.join(''));

        };

        // JSONを取得し、書き出す
        var model = new scheduleModel();
        model.fetch({
            // 成功した場合
            success: function(collection, res, options) {
                doBuild(res);
            },
            // エラーだった場合
            error: function() {
                alert('エラーが発生しました。');
            }
        });

        // ページ内リンク
        var scrollLinkFn = new scrollLink();

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
            tab03 = 'tabDiscography',
            tab04 = 'tabBlog';

        // ディスコグラフィのタブが押された時、準備中のため、処理しない
        if(thisId == tab03) {
            return;
        }

        // 一旦activeクラスをクリアする
        $(this.el).find('li').removeClass('active');
        $('#tabContents').find('.tabContentsLi').hide();

        if(thisId == tab01) {
        // ライブスケジュールのタブの時
            $('#' + tab01).addClass('active');
            $('.liveSchedule').show();
        } else if(thisId == tab02) {
        // バイオグラフィーのタブの時
            $('#' + tab02).addClass('active');
            $('.biography').show();
        } else if(thisId == tab04) {
        // ブログのタブが押された時
            $('#' + tab04).addClass('active');
            // ブログページ遷移のためルーターを起動
            Backbone.history.navigate('blog', true);
        }

    }

});
