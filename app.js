/**
 * Created by TieuVu on 10/23/2015.
 */

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var dkim_record = require('./core/GenDkim');

app.set('view engine', 'jade');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.post('/gendkim/', function (req, res) {
    var bits = req.body.bits || 1024;
    var domain = req.body.domain;
    var s = new Date().getTime();
    var dkim_value = dkim_record.gendkim(bits, domain, s);

    res.render('dkim', {private_key: dkim_value.private_key, public_key: dkim_value.public_key});
});

app.get('/', function (req, res) {
    res.render('dkim_index');
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
