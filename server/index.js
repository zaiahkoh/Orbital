const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rules = require('./client_rules');
const eval = require('./rule-parser.js');
const cors = require('cors');

//--Declaring dependencies
//Body parser is used to automatically include POST HTTP request data in the
//request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cors());

//Route handlers
app.use('/rules', rules);
app.use('/eval', eval);

app.get('/', (req, res) => {
  response = {string: 'hello', func: (x) => 2*x};
  res.send(response);
})

app.get('/express_backend', function (req, res) {
  res.send({express: 'This line came from the Express server'});
});

app.post('/', (req, res) => {
  console.log(req.query);
  res.send(req.query);
})

app.listen(3000, function () {
  console.log('Express server is listening on port 3000!');
});