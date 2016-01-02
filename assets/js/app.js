$(function() {

    // // es2015お試し
    // var human = require('./es2015/class');
    // var people = require('./es2015/classExtends');
    // human.helloStatic();
    // var human = new human('kondo');
    // var people = new people('kondo');

    var app = new Marionette.Application();

    // ルーター
    var router = require('./routers/router');

    // 共通エリア
    var headerView = require('./views/common/headerView');
    var footerView = require('./views/common/footerView');

    // コンテンツエリア
    var mainAreaTopView = require('./views/mainAreaTopView');
    var mainAreaBottomView = require('./views/mainAreaBottomView');

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

        // mainAreaBottomをインスタンス
        this.mainAreaBottomView = new mainAreaBottomView();
        this.mainAreaBottomView.render();

        // footerViewをインスタンス
        this.footerView = new footerView();
        this.footerView.render();

        // ブラウザのハッシュ監視
        Backbone.history.start();

    };

    // appをレンダリング
    app.render();

});
