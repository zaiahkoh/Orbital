const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});
const RuleSchema = require('../models/Rule');
const util = require('util');

client.connect(function (err, client) {
  console.log('connected to db');
  const col = client.db('modtree').collection('rules');
  col.find().toArray()
  .then(arr => {

    for (i = 0; i < arr.length; i++) {
      //console.log(arr[i].tag);
    }
  });

  //console.log('All checks completed');
  //col.findOne({tag: "fake tag"}).then(console.log);



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
  
helper('r_cs_degree').then(console.log);

  function stringify (obj, level) {
    var result = obj.tag

    var lines = '';
    for (i = 0; i < level; i++) {
      lines += '-';
    }

    if (obj.sub !== undefined) {
      for (j = 0; j < obj.sub.length; j++) {
        result += '\n' + lines + stringify(obj.sub[j], level + 1);
        console.log(j);
      }
    }
    return result;
  }

  const test = {
    tag: 'swee',
    exists: true
  }

  function alt (obj) {
    return obj.sub !== undefined
      ? {tag: obj.tag, sub: obj.sub.map(alt)}
      : {tag: obj.tag};
  }

  helper('r_cs_degree').then(alt).then(foo => console.log(util.inspect(foo, {showHidden: false, depth: null})));
  

  //helper('r_cs_degree').then(obj => console.log(stringify(obj, 1)));



});

