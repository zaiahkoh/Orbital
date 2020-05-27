const MongoClient = require('mongodb').MongoClient
const assert = require('assert');

const sample = {modules: ['CS1101S', 'ACC1701']}

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
    getCollection('rules')
    .then(col => {
      return col.find({tag: ruleTag});
    })
    .then(cursor =>{
      return cursor.toArray();
    })
    .then(arr => {
      assert(arr.length !== 0);
      resolve(arr[0]);
    })
    .catch(err => reject(err));
  });
}

//Takes in a ruleTag string and returns a function that is executed on a modPlan
//to return a boolean value of whether the rule is satisfied by the modPlan
async function compile(ruleTag) {
  //console.log(ruleTag);
  if (ruleTag.startsWith('?')) {
    moduleCode = ruleTag.substr(1);
    return planned({'moduleCode': moduleCode});

  } else if (ruleTag.startsWith('r_')) {
    return getRule(ruleTag)
    .then(ruleObj => { 

      if (ruleObj.func === 'and') {
        return and(ruleObj.params);
      } else if (ruleObj.func === 'or') {
        return or(ruleObj.params);
      }

    })

  } else {
    console.error('unrecognised ruleTag');
  }
}

//Returns true if the module or its preclusions are contained within the modPlan
async function planned(params) {
  console.log(params.moduleCode);
  const mod = params.moduleCode;
  assert(params['moduleCode'] !== undefined);
  return (modPlan) => modPlan.modules.includes(mod);
}

//Returns true if all of the sub functions return true
async function and(params) {
  assert(params['list'] !== undefined);
  var funcArray = await Promise.all(params.list.map(compile));
  return (modPlan) => funcArray.map(func => func(modPlan)).every(bool => bool);
}

//Returns true if at least one of the sub function returns true
async function or(params) {
  assert(params['list'] !== undefined);
  var funcArray = await Promise.all(params.list.map(compile));
  return (modPlan) => funcArray.map(func => func(modPlan)).includes(true);
}

//Returns true if the mods listed meet the number of MCs stated
async function mcs(params) {
  assert(params['n'] !== undefined);
  var funcArray = await Promise.all(params.list.map(compile));
  return (modPlan) => funcArray.map(func => func(modPlan)).includes(true);
}

//console.log(planned({moduleCode: 'ACC1701'})(sample));

//console.log(compile('?CS1231S')(sample));

//console.log(and(ruleSample.params)(sample));
compile('r_cs_foundation')
.then(res => console.log('final output: ' + res(sample)));