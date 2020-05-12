var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/express_backend', function (req, res) {
  res.send({express: 'This line came from the Express server'});
});

app.listen(5000, function () {
  console.log('Express server is listening on port 5000!');
});