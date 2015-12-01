var webpack = require('webpack');
// パスを定義
var path = {
    assets: 'assets',
    dest: 'dist'
};

module.exports = {
    output: {
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.ejs'], //拡張子を省略できる
        modulesDirectories: ['node_modules', "bower_components"],
        alias: {
        //bowerでインストールしたjqueryプラグインで以下にaliasを貼るとrequire('TweenMax');のようにパス無しでつかえる
            bower: 'bower_components'
        }
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: 'html-loader' },
            { test: /\.ejs$/, loader: 'ejs-loader' },
            { test: /\.html/, loader: "underscore-template-loader" }
        ]
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.ProvidePlugin({
        //jqueryはグローバルに出す設定。これでrequireせず使えるのでjqueryプラグインもそのまま動く。
            jQuery: "jquery",
            $: "jquery",
            jquery: "jquery",
            Backbone: 'backbone',
            Marionette: 'backbone.marionette'
        })
    ]
};