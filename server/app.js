const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const port = require('./config/server').port;
const mongoUtil = require('./utils/mongo');
const indexRouter = require('./routes/index');
const evalRouter = require('./routes/eval');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Connect to Mongo database
mongoUtil.connectToServer( function( err, client ) {
  if (err) console.log(err);
  
} );

//Declaring and using routers
app.use('/', indexRouter);
app.use('/eval', evalRouter);

//Start the server
app.listen(port, () => {
    console.log(`Express server is listening on port ${port}!`);
});