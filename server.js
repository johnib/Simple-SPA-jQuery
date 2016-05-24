var express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan');

var port = process.env.PORT || 3000;

// configure express
var app = express();
app.use(morgan('combined'));
app.use('/', express.static(__dirname + '/www'));
app.get('/', function (req, res) {
  res.redirect('/profile.html');
});

// handle authentication request
app.post('/login', bodyParser.json(), function (req, res) {

});

app.listen(port, function () {
  console.log("listening on port: " + port, "http://localhost:" + port);
});