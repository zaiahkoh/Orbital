const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});
const RuleSchema = require('../models/Rule');

client.connect(function (err, client) {
  console.log('connected to db');
  client.db('modtree').collection('rules').findOne({tag: 'r_de_advanced'})
  .then(obj => {

    const test = {
      name: 'test rule',
      tag: 'r_test',
      func: 'mcs',
      params: {
        n: 24
      }
    };

    var {errors, value} = RuleSchema.validate(test);
    console.log({errors, value});
  });
})