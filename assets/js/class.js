// es2015お試し
// class
// prototypeのようなもの
module.exports = class human {

    // コンストラクタを定義
    constructor(name) {
        this.name = name;
        this.hello();
    }

    // prototypeを追加
    hello() {
        console.log('My name is ' + this.name);
    }

    // クラスへ静的メソッドを定義
    // 呼び出しに、そのクラスのインスタンスを作成する必要がない
    static helloStatic() {
        console.log('static');
    }

};