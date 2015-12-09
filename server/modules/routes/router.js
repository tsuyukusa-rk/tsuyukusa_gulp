var app = require('../../app.js');

module.exports = {

    get: function(req, res) {
        // res.writeHead(200, {'Content-Type': 'text/html'});
        // res.write('Hello World!');
        // res.end();
    },

    post: function (req, res) {
        res.send('Got a POST request');
    },

    put: function (req, res) {
        res.send('Got a PUT request at /user');
    },

    delete: function (req, res) {
        res.send('Got a DELETE request at /user');
    }

};