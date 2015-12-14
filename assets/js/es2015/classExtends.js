// es2015お試し
// classを継承する
var human = require('./class');
module.exports = class people extends human {

        hello() {
            console.log('their name is ' + this.name);
        }

};