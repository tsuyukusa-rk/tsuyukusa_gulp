// ver0.14からreact-domが必要になっている
var React = require('react');
var ReactDOM = require('react-dom');

// コンポーネント
var introBox = require('./introViews');

// DOMをレンダリングする
module.exports = ReactDOM.render(
    React.createElement(introBox, null),
    document.getElementById('intro')
);
