const express = require('express');
const router = express.Router();
const getDb = require('../utils/mongo').getDb;

const getCollection = (col) => getDb().collection(col);

//Used to receive a ruleTag that starts with 'r_' and returns the corresponding
//JS Object from the Mongo Database
async function getRule(ruleTag) {
  return await getCollection('rules').findOne({tag: ruleTag});
}

async function expandRule(rule) {
  var current = await getRule(rule);
  if (current.sub !== undefined){
    current.sub = await Promise.all(current.sub.map(item => expandRule(item)));
  }
  return current;
}

router.get('/:tag', (req, res) => {
  expandRule(req.params.tag)
  .then(obs => res.send(JSON.stringify(obs)));
});

router.get('/', (req, res) => {
  res.send('from the rules router');
});

module.exports = router;