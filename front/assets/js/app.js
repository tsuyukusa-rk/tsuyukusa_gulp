window.jQuery = require('jquery');
window.$ = require('jquery');
window.Backbone = require('backbone');
window.Marionette = require('backbone.marionette');
$(function() {

    // // es2015お試し
    // var human = require('./es2015/class');
    // var people = require('./es2015/classExtends');
    // human.helloStatic();
    // var human = new human('kondo');
    // var people = new people('kondo');

    // ローディング画面をreactで実装
    var reactRender = require('./jsxViews/reactRender');

    // ルーター
    var router = require('./routers/router');

    // 共通エリア
    var headerView = require('./views/common/headerView');
    var footerView = require('./views/common/footerView');

    // コンテンツエリア
    var mainAreaTopView = require('./views/mainAreaTopView');
    var mainAreaBottomView = require('./views/mainAreaBottomView');

    var app = new Marionette.Application({
      onStart: function(options) {
        // ルーターをインスタンス
        this.router = new router();

        // headerをインスタンス
        this.headerView = new headerView(options);
        this.headerView.render();

        // mainAreaTopをインスタンス
        this.mainAreaTopView = new mainAreaTopView(options);
        this.mainAreaTopView.render();

        // mainAreaBottomをインスタンス
        this.mainAreaBottomView = new mainAreaBottomView(options);
        this.mainAreaBottomView.render();

        // footerViewをインスタンス
        this.footerView = new footerView(options);
        this.footerView.render();

        // ブラウザのハッシュ監視
        Backbone.history.start();
      }
    });

    // リージョン
    // app.addRegions({
    //     'main': '#mainArea'
    // });

    // appをレンダリング
    app.start();

});
