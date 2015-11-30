$(function(){
  var App = new Marionette.Application();
    App.addRegions({ // Regionを定義してレイアウトする
    'main': '#main',
    'loader': '#loader',
    'error': '#error'
  });
  App.onStart = function(){
    // startした際の処理
  };
  App.start();
  // var router = new Router(); // Routerを利用する場合はここでインスタンス化
  Backbone.history.start();
});