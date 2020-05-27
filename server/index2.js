const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

//--Declaring dependencies
//Body parser is used to automatically include POST HTTP request data in the
//request body
app.use(bodyParser.urlencoded({ extended: true}))

//Get the specified local database
function getDatabase(dbName) {
  return new Promise((resolve, reject) => {
    const client_uri = "mongodb://127.0.0.1:27017";

    MongoClient.connect(client_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      resolve(client.db(dbName));
    })
    .catch(err => reject(err));
  })
}

//Takes in a collection reference and module code string and returns a Promise
async function getModule(collection, module){
  const results = await collection.find({'moduleCode': module}).toArray();
  return results[0];
}

//Takes in a collection reference and a rule tag string and returns a Promise
async function getRule(collection, ruleTag){
  var cursor = await collection.find({'tag': ruleTag});
  var array = await cursor.toArray();
  return array[0];
}

//Rule constructor: generates a full JS Object based on a rule in the database
async function createRule(rule) {
  if (rule.startsWith('r_')){
    const db = await getDatabase('modtree');
    const col = db.collection('rules');
    var current = await getRule(col, rule);
    
    var key = Object.keys(current.requirements)[0];
    var req = current.requirements[key];
    req = await Promise.all(req.map(item => createRule(item)));
    current.requirements[key] = req;    

    return current;
  } else {
    const db = await getDatabase('modtree');
    const output = await getModule(db.collection('modules'), rule);
    return output;
  }  
}

MongoClient.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      const col = client.db('modtree').collection('modules');
      return getModule(col, "CS1231");
    })
    .then(mod => {
      console.log(mod);
    })

//Route handlers
app.get('/', function (req, res) {
  createRule('r_bachelor_cs_2018')
  .then(result => res.send(result));
  //res.send(createRule('r_cs_foundation'));
});

app.get('/express_backend', function (req, res) {
  res.send({express: 'This line came from the Express server'});
});

app.listen(27017, function () {
  console.log('Express server is listening on port 3000!');
});