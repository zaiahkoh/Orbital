const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});
const RuleSchema = require('../models/Rule');

client.connect(function (err, client) {
  console.log('connected to db');
  const col = client.db('modtree').collection('rules');
  col.find().toArray()
  .then(arr => {

    for (i = 0; i < arr.length; i++) {
      var {errors, value} = RuleSchema.validate(arr[i]);
      if ( errors !== undefined) {
        console.log({errors, value});
      }
    }
  });

  console.log('All checks completed');
})