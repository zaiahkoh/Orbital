const express = require('express');
const router = express.Router();
const getDb = require('../utils/mongo').getDb;

async function getCollection (col) {
  const collection = await getDb().collection(col);
  return collection;
}

router.get('/', (req, res) => {
  res.send('Info route up and running');
})

router.get('/faculties', (req, res) => {
  getCollection('faculties').then(col => {
    return col.find().toArray();
  }).then(output => {
    res.json(output);
  });
});

router.get('/faculties/:fac', (req, res) => {
  getCollection('faculties').then(col => {
    console.log(req.params.fac);
    return col.findOne({name: req.params.fac});
  }).then(output => {
    res.json(output);
  });
});

router.get('/residences', (req, res) => {
  getCollection('residences').then(col => {
    return col.find().toArray();
  }).then(output => {
    res.json(output);
  });
});

router.get('/pong', (req, res) => {
  res.send(req.body);
  console.log(req.body);
})

module.exports = router;