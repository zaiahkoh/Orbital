const MongoClient = require('mongodb').MongoClient
const client_uri = "mongodb://127.0.0.1:27017";
const dbName = 'modtree'

function getCollection(colName) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(client_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      resolve(client.db(dbName).collection(colName));
    })
    .catch(err => reject(err));
  })
}

function getRule(ruleTag) {
  return new Promise((resolve, reject) => {
    getCollection('rules')
    .then(col => {
      return col.find({tag: ruleTag});
    })
    .then(cursor =>{
      return cursor.toArray();
    })
    .then(arr => {
      if (arr.length == 0) {
        reject('RULE NOT FOUND: ' + ruleTag);
      } else {
        resolve(arr[0]);
      }
    })
    .catch(err => reject(err));
  });
}

async function checkRules() {
  const col = await getCollection('rules');
  var result = await col.find().toArray();
  var takenTags = [];

  //Iterates through all rules
  for (i = 0; i < result.length; i++) {
    var current = result[i];

    //Check if all keys are present
    if (
      current.name == undefined ||
      current.tag == undefined || 
      current.func == undefined ||
      current.params == undefined
      ) {
        console.log('MISSING KEY IN: \n' + current);
        continue;
    }

    //Check if the tags are invalid or duplicated
    if (!(current.tag.startsWith('r_')) || takenTags.includes(current.tag)) {
      console.log('TAG ERROR: \n' + current);
    } else {
      takenTags.push(current.tag);
    }
  
    //Check if params are valid for their given function
    var params = current.params;
    if (current.func === 'and') {
      if (params.list == undefined || params.list.length == 0) {
        console.log('PARAM ERR IN: ' + current.tag);
      }
      for (j = 0; j < params.list.length; j++) {
        const ruleTag = params.list[j];
        if (ruleTag.startsWith('r_')) {
          getRule(params.list[j])
          .catch(msg => {
            console.log('ISSUE IN ' + current.tag + ': ' + msg);
          });
        } else if (ruleTag.startsWith('?')) {
        } else {
          console.log('ISSUE IN ' + current.tag + ": INVALID REFERNCE");
        }
      }

    } else if (current.func === 'or') {
      if (params.list == undefined || params.list.length == 0) {
        console.log('PARAM ERR IN: ' + current.tag);
      }
      for (j = 0; j < params.list.length; j++) {
        const ruleTag = params.list[j];
        if (ruleTag.startsWith('r_')) {
          getRule(params.list[j])
          .catch(msg => {
            console.log('ISSUE IN ' + current.tag + ': ' + msg);
          });
        } else if (ruleTag.startsWith('?')) {
        } else {
          console.log('ISSUE IN ' + current.tag + ": INVALID REFERNCE");
        }
      }

    } else if (current.func === 'mcs') {
      if (params.n == undefined) {
        console.log('PARAM ERR IN: ' + current.tag);
      }

    } else if (current.func === 'filter') {
      if (typeof params.next !== 'string') {
        console.log('PARAM ERR IN: ' + current.tag);
      }
      const ruleTag = params.next;
      if (ruleTag.startsWith('r_')) {
        getRule(ruleTag)
        .catch(msg => {
          console.log('ISSUE IN ' + current.tag + ': ' + msg);
        });
      } else if (ruleTag.startsWith('?')) {

      } else {
        console.log('ISSUE IN ' + current.tag + ": INVALID REFERNCE");
      }

    } else if (current.func === 'notEmpty') {

    } else if (current.func === 'nTrue') {
      if (params.list == undefined || params.list.length == 0 || params.n == undefined) {
        console.log('PARAM ERR IN: ' + current.tag);
      }

    } else if (current.func === 'nModules') {
      if (params.n == undefined) {
        console.log('PARAM ERR IN: ' + current.tag);
      }

    } else {
      console.log('FUNC NOT RECOGNISED: \n' + current)
    }
    
  }

  console.log('All checks completed');
}

checkRules();