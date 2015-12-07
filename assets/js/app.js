$(function() {

    var app = new Marionette.Application();

    // ルーター
    var router = require('./routers/router');

    // ヘッダー
    var headerView = require('./views/common/headerView');

    // コンテンツエリア
    var mainAreaTopView = require('./views/mainAreaTopView');

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

        // mainAreaTopをインスタンス
        this.mainAreaTopView = new mainAreaTopView();
        this.mainAreaTopView.render();

        // ブラウザのハッシュ監視
        Backbone.history.start();

        $('.pageIntro').hide();

    };

    // appをレンダリング
    app.render();

});