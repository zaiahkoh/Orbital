const express = require('express');
const router = express.Router();
const getMod = require('../api/nusmods').getMod;
const getDb = require('../utils/mongo').getDb;
const assert = require('assert');
const parseMod = require('../utils/parseMod');
const eval = require('../utils/eval');

module.exports = router;

router.get('/', (req, res) => {
  res.send('Pong from the eval router');
});

router.post('/', (req, res) => {
  console.log(req.body);
  const body = req.body;
  var modPlan = body.plan;
  var tag = body.tag;
  console.log(body);
  console.log('REQ RECEIVED: EVAL ' + tag + ' with \n' + modPlan);
  eval(tag, modPlan)
  .then(bool => res.send(bool));
});

router.get('/test', (req, res) => {
  eval('r_cs_degree', {modules: ['GEH1045', 'GES1024']})
  .then(bool => res.send(JSON.stringify(bool)));
});

router.get('/test2', (req, res) => {
  eval('r_de_basic', {modules: ['CS1101S', 'ACC1701']})
  .then(bool => res.send(JSON.stringify(bool)));
});

router.get('/test3', (req, res) => {
  eval('r_de_external', {modules: ['DAO1704', 'DAO2702', 'BSP1703C', 'BSP2701', 'ACC1701', 'CS1101']})
  .then(bool => res.send(JSON.stringify(bool)));
});

router.get('/test4', (req, res) => {
  eval('r_bba_specialisations', {modules: ["BSN3701", "BSN3702", "BSN3703", "BSN3711", "BSN3712"]})
  .then(bool => res.send(JSON.stringify(bool)));
});
