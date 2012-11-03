var express = require('express');
var engines = require('consolidate');
var swig = require('swig');

var app = express();
app.engine('html', engines.swig);
app.set('view engine', 'html');
swig.init({
    root: __dirname,
    allowErrors: true,
    cache: false
});
app.set('views', __dirname);

app.get('/', function(req, res) {
  res.render('server', function(err, html) {

  });
});

app.listen(3000);
console.log('Listening on port 3000');
