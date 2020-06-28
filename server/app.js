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
const accountRouter = require('./routes/account');
const infoRouter = require('./routes/info');

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
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/modtree-test', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));

//Declaring and using routers
app.use('/', indexRouter);
app.use('/eval', evalRouter);
app.use('/rules', rulesRouter);
app.use('/user', userRouter);
app.use('/info', infoRouter);
app.use('/account', passport.authenticate('jwt', {session: false}), accountRouter);


//Start the server
app.listen(port, () => {
    console.log(`Express server is listening on port ${port}!`);
});


/*
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(3000);
*/