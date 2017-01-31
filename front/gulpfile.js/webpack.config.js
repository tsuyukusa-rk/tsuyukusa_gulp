const webpack = require('webpack');
const CONFIG = require('./config.js');
module.exports = {
    devtool: 'inline-source-map',
    entry: {
      app: CONFIG.webpack.entry
    },
    output: {
      filename: './[name].js'
    },
    resolve: {
      extensions: ['', '.js', '.ejs', '.jsx'], //拡張子を省略できる
      modulesDirectories: ['node_modules', 'bower_components'],
      // alias: {
      // //bowerでインストールしたjqueryプラグインで以下にaliasを貼るとrequire('TweenMax');のようにパス無しでつかえる
      //     bower: 'bower_components'
      // }
    },
    module: {
      loaders: [
        { test: /\.html$/, loader: 'html-loader' },
        { test: /\.ejs$/, loader: 'ejs-loader' },
        { test: /\.html/, loader: 'underscore-template-loader' },
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=es2015' },
        { test: /\.jsx/, loader: 'jsx-loader?harmony' },
        // { test: /bootstrap.+\.(jsx|js)$/, loader: 'imports?jQuery=jquery,$=jquery,this=>window' }
      ]
    },
    target: 'web',
    // externals: {
    //   'jQuery': 'jquery',
    //   '$': 'jquery',
    //   'jquery': 'jquery',
    //   'Backbone': 'backbone',
    //   'Marionette': 'backbone.marionette'
    // },
    plugins: [
      // new webpack.ResolverPlugin(
      //   new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
      // ),
      // new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.LoaderOptionsPlugin({
        debug: true
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        Backbone: 'backbone',
        Marionette: 'backbone.marionette'
      })
    ]
};
