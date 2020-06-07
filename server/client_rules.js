const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');

//Get the specified local collection
function getCollection(colName) {
  const client_uri = "mongodb://127.0.0.1:27017";
  const dbName = 'modtree'

  return new Promise((resolve, reject) => {
    MongoClient.connect(client_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      resolve(client.db(dbName).collection(colName));
    })
    .catch(err => reject(err));
  })
}

//Used to receive a ruleTag that starts with 'r_' and returns the corresponding
//JS Object from the Mongo Database
function getRule(ruleTag) {
  return new Promise((resolve, reject) => {
    getCollection('exposed_rules')
    .then(col => {
      return col.find({tag: ruleTag});
    })
    .then(cursor =>{
      return cursor.toArray();
    })
    .then(arr => {
      assert(arr.length !== 0, 'unrecognised ruleTag: ' + ruleTag);
      resolve(arr[0]);
    })
    .catch(err => reject(err));
  });
}

async function expandRule(rule) {
  var current = await getRule(rule);
  if (current.sub !== undefined){
    current.sub = await Promise.all(current.sub.map(item => expandRule(item)));
  }
  return current;
}

//expandRule('r_ulr').then(console.log);

router.get('/:tag', (req, res) => {
  expandRule(req.params.tag)
  .then(obs => res.send(JSON.stringify(obs)));
});

router.get('/', (req, res) => {
  res.send('from the rules router');
});

module.exports = router;