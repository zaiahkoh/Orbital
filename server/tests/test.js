const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});
const RuleSchema = require('../models/Rule');
const parseMod = require('../utils/parseMod');

client.connect(function (err, client) {
  console.log('connected to db');
  const col = client.db('modtree').collection('rules');
  col.findOne({tag: 'r_de_advanced'})
  .then(obj => {

    const test = {
      name: 'test rule',
      tag: 'r_test',
      func: 'mcs',
      params: {
        n: 24
      }
    };

    var {errors, value} = RuleSchema.validate(obj);
    //console.log({errors, value});
  });

  //col.find().toArray().then(console.log);
  col.findOne({tag: 'fake_tag'}).then(console.log);
  console.log(parseMod('CS1101S'));
})