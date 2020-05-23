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
  const one = await collection.find({'moduleCode': module});
  const two = await one.toArray();
  const output = await two[0];
  console.log(output);
  return output;
}

//Takes in a collection and a string array of module codes and returns an array
//of Javascript objects containing module information
async function getAllModules(collection, moduleArray){
  var result = [];
  for(i = 0; i < moduleArray.length; i++){
    result[i] = collection.find(
      {'moduleCode': moduleArray[i]}
      );
  }

  var cursors = await Promise.all(result);
  var arrays = await Promise.all(cursors.map(item => item.toArray()));
  var output = arrays.map(arr => arr[0]);
  return output;
}

async function getRule(collection, ruleTag){
  var cursor = await collection.find({'tag': ruleTag});
  var array = await cursor.toArray();
  return array[0];
}

//Rule constructor: generates a full JS Object base on a rule in the database
async function createRule(rule) {
  if (rule.startsWith('r_')){
    const db = await getDatabase('modtree');
    const col = db.collection('rules');
    var foo = await getRule(col, rule);
    
    var key = Object.keys(foo.requirements)[0];
    var req = foo.requirements[key];

    req = await Promise.all(req.map(item => createRule(item)));

    foo.requirements[key] = req;
    console.log(foo);
    
    return foo;
  } else {
    const db = await getDatabase('modtree');
    const output = await getModule(db.collection('modules'), rule);
    return output;
  }  
}

createRule('r_bachelor_cs_2018');
/*
console.log('....................')
const db = getDatabase('modtree')
.then((db) => {
  console.log(getModule(db.collection('modules'), 'ACC1701'));
  return db.collection('modules').find({moduleCode: "CS1101S"}).toArray();
})
.then(msg => {
  console.log(msg);
})
*/

//Route handlers
app.get('/', function (req, res) {
  createRule('r_bachelor_cs_2018')
  .then(result => res.send(result));
  //res.send(createRule('r_cs_foundation'));
});

app.get('/express_backend', function (req, res) {
  res.send({express: 'This line came from the Express server'});
});

app.listen(5001, function () {
  console.log('Express server is listening on port 5000!');
});