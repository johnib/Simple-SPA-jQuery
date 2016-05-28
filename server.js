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

app.get('/quotes/random', function (req, res) {
  var quoteIndex = randomInt(0, quotes.length - 1);
  var quote = quotes[quoteIndex];

  res.send(quote);
  res.end();
});

app.listen(port, function () {
  console.log("listening on port: " + port, "http://localhost:" + port);
});

var userdb = {
  "21232f297a57a5a743894a0e4a801fc3": "21232f297a57a5a743894a0e4a801fc3",
  "961d8839cba1c489b858de3cc13e62a1": "c1f80eddea77f14650a2062dda3eb15c"
};
var quotes = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc porttitor aliquet tellus sed finibus. Fusce nisl enim, volutpat at arcu a, tempus ultricies purus. Curabitur a leo tortor. Nullam bibendum eget ligula eu rhoncus. Proin id luctus felis. Nullam quis ultricies leo. In ut dictum dolor, eget rhoncus neque. Aliquam vel lobortis enim. Mauris faucibus odio ac ante auctor cursus. Proin eu porta sapien. Sed rhoncus a lorem nec consectetur. Aenean est magna, iaculis vitae massa posuere, imperdiet convallis leo. Donec sollicitudin viverra porta.",
  "Curabitur nec mauris non risus interdum venenatis ac euismod urna. Aenean condimentum venenatis tellus, ut eleifend sapien egestas a. Sed quis nulla finibus, ultrices lectus non, vehicula tellus. Proin odio lectus, iaculis dictum sagittis et, molestie ut lacus. Suspendisse cursus pellentesque nisi sit amet hendrerit. Proin varius, metus sit amet rutrum laoreet, erat neque semper nunc, eget efficitur neque est ac mi. Proin nulla justo, facilisis sit amet semper quis, pulvinar ac orci. Curabitur rutrum luctus felis nec finibus. Curabitur congue ipsum a nulla varius, eu ornare ligula sollicitudin. Suspendisse molestie viverra odio nec suscipit.",
  "Curabitur sodales leo sit amet nunc sagittis viverra. Maecenas tristique, massa ac fermentum sollicitudin, arcu odio tincidunt neque, eu efficitur neque arcu eget tellus. Vestibulum sit amet finibus lectus, non congue mi. Aenean bibendum metus et rutrum fringilla. Aenean dapibus cursus odio, eget bibendum lectus rutrum aliquam. Phasellus vitae sollicitudin sem, id tincidunt orci. Vivamus vel consequat velit, sit amet finibus neque. Mauris congue, lectus in tincidunt feugiat, orci sapien porta purus, sed rutrum lacus ante sed libero. Aliquam convallis gravida mollis. Pellentesque ac mauris nec turpis placerat elementum. Maecenas ornare ac lectus quis gravida. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac est mauris. Vivamus porttitor lacus elit, consectetur dapibus massa laoreet vel."
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}