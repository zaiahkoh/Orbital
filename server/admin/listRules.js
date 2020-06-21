const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});
const RuleSchema = require('../models/Rule');
const util = require('util');

client.connect(function (err, client) {
  console.log('connected to db');
  const col = client.db('modtree').collection('rules');
  col.find().toArray()
  .then(arr => {

    //Do something

  });

  async function helper (tag) {
    const obj = await col.findOne({tag: tag});
    if (obj == null){
      return { tag: tag, exists: false };
    } else {
      var result = { tag: tag, exists: true };
      if (obj.func == 'and' || obj.func == 'or') {
          result.sub = await Promise.all(obj.params.list.map(helper));
      }
      if (obj.func == 'filter') {
        const rul = await helper(obj.params.next);
        result.sub = [rul];
    }
      return result;
    }
  } 

  function alt (obj, depth) {
    return obj.sub !== undefined && depth > 0
      ? {tag: obj.tag, sub: obj.sub.map(obj => alt(obj, depth - 1))}
      : {tag: obj.tag};
  }

  helper('r_cs_degree').then(obj => alt(obj, 2)).then(foo => console.log(util.inspect(foo, {showHidden: false, depth: null})));
  

  //helper('r_cs_degree').then(obj => console.log(stringify(obj, 1)));



});

