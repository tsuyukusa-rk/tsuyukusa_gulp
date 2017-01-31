// ver0.14からreact-domが必要になっている
var React = require('react');
var ReactDOM = require('react-dom');

// クラスをつくる
module.exports = class introBox extends React.Component {

    // 初期処理
    constructor(props) {
        super(props);
        console.log(super(props));
        console.log(props);
        this.state = {}
    }

    // ロード後の処理
    onloadFn() {

        $(window).on('load', function() {
            setTimeout(function() {
                $('#intro').fadeOut(1500);
            }, 1000);
        });

    }

    // クリックしてTOPページへ
    onClickGoTop(e) {

        $('#intro').fadeOut(1500);

    }

    // レンダリング
    render() {

        // ロード後の処理
        this.onloadFn();

        // クリックしてTOPページへ


        return(
            <div className="intro">
                <img src="/img/logoHeader.png" alt="ツユクサ" />
                <p className="goTop" onClick={this.onClickGoTop}><span>TOPへ</span></p>
            </div>
        );
    }

};
