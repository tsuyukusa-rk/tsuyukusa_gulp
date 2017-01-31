module.exports = Backbone.Model.extend({

    // 取得するurl
    url: '/js/data/schedule.json',

    // パース
    parse: function(res) {
        return res;
    },

    // バリデーション
    validate: function (res) {
        if (_.isEmpty(res)) {
            return "Invalid!";
        }
    }

});