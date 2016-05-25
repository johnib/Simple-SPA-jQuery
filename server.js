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
  console.log(req.body);

  if (userdb[req.body.username] === req.body.password) {
    console.log("user authenticated successfully");
    res.sendStatus(200);

  } else {
    console.log("Bad credentials");
    res.sendStatus(401);
  }
});

var calcHistory = {};
app.post('/calc/value/:val', function (req, res) {
  if (req.params.val) {
    calcHistory.last = req.params.val;
    console.log(calcHistory);
  }

  res.end();
});

app.get('/calc/value', function (req, res) {
  if (calcHistory.last) {
    res.send(JSON.stringify(calcHistory));
  }

  res.end();
});

app.listen(port, function () {
  console.log("listening on port: " + port, "http://localhost:" + port);
});

var userdb = {
  "21232f297a57a5a743894a0e4a801fc3": "21232f297a57a5a743894a0e4a801fc3",
  "961d8839cba1c489b858de3cc13e62a1": "c1f80eddea77f14650a2062dda3eb15c"
};