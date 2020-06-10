const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require("passport");
const port = require('./config/server').port;
const mongoUtil = require('./utils/mongo');
const indexRouter = require('./routes/index');
const evalRouter = require('./routes/eval');
const rulesRouter = require('./routes/rules');
const userRouter = require("./routes/user");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
require('./config/passport')(passport);

//Connect to Mongo database
mongoUtil.connectToServer( function( err, client ) {
  if (err) console.log(err);
  
} );

const mongoose = require('mongoose');
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/modtree-test', { useNewUrlParser: true })
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));

//Declaring and using routers
app.use('/', indexRouter);
app.use('/eval', evalRouter);
app.use('/rules', rulesRouter);
app.use('/user', userRouter);

//Start the server
app.listen(port, () => {
    console.log(`Express server is listening on port ${port}!`);
});