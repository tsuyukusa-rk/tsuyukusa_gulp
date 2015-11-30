$(function() {

  // var Backbone = require('backbone');
  var Marionette = require('backbone.marionette');

  var App = new Marionette.Application();
  // var Router = require('./_module/router/indexRouter');


  App.addRegions({
    'main': '#indexView'
  });

  App.main.$el.hide();

  App.start();
  // new Router();
  // Backbone.history.start();
  App.main.$el.show();
});