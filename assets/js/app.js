$(function() {

    var app = new Marionette.Application();

    // ルーター
    var router = require('./routers/router');

    // ヘッダー
    var headerView = require('./views/common/headerView');

    // リージョン
    app.addRegions({
        'main': '#mainArea'
    });

    // レンダリング後の処理を定義
    app.render = function() {

        // ルーターをインスタンス
        this.router = new router();

        // headerをインスタンス
        this.headerView = new headerView();
        this.headerView.render();

        // ブラウザのハッシュ監視
        Backbone.history.start();

        $('.pageIntro').hide();

    };

    // appをレンダリング
    app.render();

});