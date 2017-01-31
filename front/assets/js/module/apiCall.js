// ajax
var ajax;
module.exports = ajax = function(setting, callback) {

    $.ajax({
        url: setting.url, //urlをセット
        cache: false // キャッシュをさせない

    }).done(function(data){
    // JSONが取得できたら、HTMLを組て立る
        callback(data);

    }).fail(function(data){
    // JSONが取得できなければ、アラート
        alert('error!!!');
        return false;

    });

}