// テンプレートを読み込む
var mainAreaBottomTmpl = require('../templates/mainAreaBottomView');

// audioのコントロール処理
var audioCtrl =require('../module/classAudioCtrl');

// 詩のモデルを読み込み
var poetryModel = require('../models/poetryModel');

// underscore
var _ = require('underscore');

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

        // audioのコントロールのclassを曲ごとにインスタンス
        var movieStar = new audioCtrl(1);
        var amaoto = new audioCtrl(2);

        // 詩のモーダルについての処理
        this.modalPoetry();

    },

    /*
    * 詩のモーダル
    * @Param:
    */
    modalPoetry: function() {

        // htmlを生成する
        var doBuild = function(json) {

            // templateを生成し、埋め込み
            var template = _.template('<% _.each(poetry, function(el, i){ %><li><dl><dt><%= el.title %></dt><dd><%= el.text %></dd></dl></li><% }); %>');
            $('#modalPoetryContents').html(template(json));

        };

        // モデルをインスタンスして、非同期通信
        var model = new poetryModel();
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

    }

});
