var express = require('express');
var engines = require('consolidate');
var swig = require('swig');
var parser = require('../src/parser');

var app = express();
app.engine('html', engines.swig);
app.set('view engine', 'html');
swig.init({
    root: __dirname,
    allowErrors: true,
    cache: false
});
app.set('views', __dirname);
app.set("view options", {layout: false});

app.get('/', function(req, res) {
  res.render('server.html');
});

app.get('/redirect', function(req, res) {
    var url = parser(req.query.service, req.query);
    res.redirect(url);
});

app.listen(3000);
console.log('Listening on port 3000');
