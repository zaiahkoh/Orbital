const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Connect to Mongo database
const db = keys.mongoURI;
mongoose.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
.then(() => {
    console.log()
})
.catch(console.log);

app.get('/', (req, res) => {
    res.send('Express backend up and running');
})

const port = 3000;
app.listen(port, () => {
    console.log(`Express server is listening on port ${port}!`);
});