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

        // スライダーの定義
        var slider = function() {

            var
                // DOMを定義
                $modalPoetryContents = $('#modalPoetryContents'),
                $modalPoetryCtrlLeft = $('#modalPoetryCtrlLeft'),
                $modalPoetryCtrlRight = $('#modalPoetryCtrlRight'),
                $modalPoetryClose = $('#modalPoetryClose'),
                $overlay = $('#overlay'),
                $modalPoetry = $('#modalPoetry'),
                $audioTitle = $('.audioTitle'),
                // 設定を取得
                contentsWidth = $modalPoetryContents.width(),
                contentsLength = $modalPoetryContents.find('li').length,
                count = 0,
                // hoverしていなければ消す
                hoverFlg = false,
                closeModal = function() {
                    if(hoverFlg) {
                        $overlay.fadeOut();
                        $modalPoetry.fadeOut();
                        $('body').off('click', closeModal);
                    }
                },
                // ループ処理で、位置を指定
                positionAdd = function() {
                    for(var i = 0; i < contentsLength; i++) {
                        $modalPoetryContents.find('li').eq(i).css({
                            'width': contentsWidth - 15,
                            'left': contentsWidth * (i + count)
                        });
                    }
                };

            // 初期設定
            $modalPoetry
                .hide()
                .css('opacity', 1);

            // ロード時の位置指定
            positionAdd();

            // モーダルを出すイベント
            $audioTitle.on('click', function() {

                // 位置を調整する
                var audioNum = $(this).attr('data-audioNum');
                count = -(Number(audioNum) - 1);
                positionAdd();

                // 表示する
                $overlay.fadeIn();
                $modalPoetry.fadeIn();

                // フラグをfalseにして、非表示イベントを紐付ける
                hoverFlg = false;
                $('body').on('click', closeModal);

            });

            // 戻る処理
            $modalPoetryCtrlLeft.on('click', function() {
                // 0より少なければプラス
                if(count < 0) {
                    count ++;
                }
                positionAdd();
            });

            // 進む処理
            $modalPoetryCtrlRight.on('click', function() {
                // アイテム数を以下でなければマイナス
                if(count > -(contentsLength - 1)) {
                    count --;
                }
                positionAdd();
            });

            // 閉じる処理
            $modalPoetryClose.on('click', function() {
                $overlay.fadeOut();
                $modalPoetry.fadeOut();
            });

            // hover判定
            $modalPoetry.on('mouseenter', function() {
                hoverFlg = false;
            });
            $modalPoetry.on('mouseleave', function() {
                hoverFlg = true;
            });

        };

        // htmlを生成する
        var doBuild = function(json) {

            // templateを生成し、埋め込み
            var template = _.template('<% _.each(poetry, function(el, i){ %><li><dl><dt><%= el.title %></dt><dd><%= el.text %></dd></dl></li><% }); %>');
            $('#modalPoetryContents').html(template(json));

            // sliderの整形
            slider();

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
