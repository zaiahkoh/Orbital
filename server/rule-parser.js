const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient
const assert = require('assert');
const bodyParser = require('body-parser');
const https = require('https');
const cors = require('cors');

const sample = {modules: ['CS1101S', 'ACC1701', 'CS1231', 'CS2030', 'GET1028']}
const allGEs = {modules: ['GEH1045', 'GEQ1917', 'GER1000', 'GES1024', 'GET1028']}
const sample2 = {modules: ['CS3230', 'CS3236', 'CS4232', "CP3106", "CP3209", "CS1231"]};
const empty = {modules: []};

router.use(bodyParser.urlencoded({ extended: false}));
router.use(bodyParser.json());
router.use(cors());

//Get module data from NUSmods API
function getModuleData (acadYear, moduleCode) {
  return new Promise((resolve, reject) => {
    const uri = 'https://api.nusmods.com/v2/' + acadYear + '-' + (acadYear + 1) 
      + '/modules/' + moduleCode + '.json';
    https.get(uri, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      })
      res.on('end', () => {
        resolve(JSON.parse(data));
      })
    }).on('error', (err) => {
      reject(err);
    })
  })
}

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
      assert(arr.length !== 0, 'unrecognised rule: ' + ruleTag);
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
    return planned({params: {'moduleCode': moduleCode}});

  } else if (ruleTag.startsWith('r_')) {
    return getRule(ruleTag)
    .then(ruleObj => { 

      if (ruleObj.func === 'and') {
        return and(ruleObj);
      } else if (ruleObj.func === 'or') {
        return or(ruleObj);
      } else if (ruleObj.func === 'mcs') {
        return mcs(ruleObj);
      } else if (ruleObj.func === 'filter') {
        return filter(ruleObj);
      } else if (ruleObj.func === 'notEmpty') {
        return notEmpty(ruleObj);
      } else if (ruleObj.func === 'nTrue') {
        return nTrue(ruleObj);
      } else if (ruleObj.func === 'nModules') {
        return nModules(ruleObj);
      } else {
        throw('func not recognised');
      }

    })

  } else {
    console.error('unrecognised ruleTag');
  }
}

//Returns true if the module or its preclusions are contained within the modPlan
async function planned(ruleObj) {
  var params = ruleObj.params;
  assert(params['moduleCode'] !== undefined);
  const mod = params.moduleCode;  
  return (modPlan) => modPlan.modules.includes(mod);
}

//Returns true if all of the sub functions return true
async function and(ruleObj) {
  var params = ruleObj.params;
  assert(params['list'] !== undefined, '"and" list not provided');
  var funcArray = await Promise.all(params.list.map(compile));
  return async (modPlan) => {
    var boolArray = await Promise.all(funcArray.map(func => func(modPlan)))
    return boolArray.every(bool => bool);
  }
}

//Returns true if at least one of the sub function returns true
async function or(ruleObj) {
  var params = ruleObj.params
  assert(params['list'] !== undefined);
  var funcArray = await Promise.all(params.list.map(compile));
  return async (modPlan) => {
    var boolArray = await Promise.all(funcArray.map(func => func(modPlan)))
    return boolArray.includes(true);
  }
}

//Returns true if n of the sub functions return true
async function nTrue(ruleObj) {
  var params = ruleObj.params;
  assert(params['list'] !== undefined);
  assert(params['n'] !== undefined);
  const n = typeof params.n == 'string'
    ? parseInt(params.n)
    : params.n
  var funcArray = await Promise.all(params.list.map(compile));
  return async (modPlan) => {
    var boolArray = await Promise.all(funcArray.map(func => func(modPlan)))
    return boolArray.reduce((a, b) => a + b, 0) >= n;
  }
}

//Returns true if the mods listed meet the number of MCs stated
function mcs(ruleObj) {
  var params = ruleObj.params;
  assert(params['n'] !== undefined);
  const mcLimit = typeof params.n === 'number'
    ? params.n
    : parseInt(params.n);
  return async (modPlan) => {
    const modList = modPlan.modules;
    const promiseArr = modList.map(code => getModuleData(2018, code));
    const creditArr = await Promise.all(promiseArr);
    const total = creditArr.map(item => parseInt(item.moduleCredit)).reduce((a, b) => a + b, 0);
    const output = total >= mcLimit;
    return output;
  }
}

//Filters the modPlan for certain modules and passes it to the next function
async function filter(ruleObj) {
  var params = ruleObj.params;
  //console.log(params);
  function parseMod (moduleCode) {
    const isLetter = (char) => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
    var prefix = '';
    var number = '';
    var suffix = '';

    var c = moduleCode.charAt(0);
    while(isLetter(c) && moduleCode.length !== 0) {
      prefix += c;
      moduleCode = moduleCode.substr(1);
      c = moduleCode.charAt(0);
    }
    while(!isLetter(c) && moduleCode.length !== 0) {
      number += c;
      moduleCode = moduleCode.substr(1);
      c = moduleCode.charAt(0);
    }
    while(isLetter(c) && moduleCode.length !== 0) {
      suffix += c;
      moduleCode = moduleCode.substr(1);
      c = moduleCode.charAt(0);
    }

    return {
      prefix: prefix, 
      number: number, 
      suffix: suffix, 
      level: number.charAt(0)
    };
  }

  function checkFor (moduleCode, attribute, acceptedVals) {
    key = parseMod(moduleCode)[attribute];
    assert(key !== undefined);
    return acceptedVals.includes(key);
  }

  assert(params.next !== undefined);
  var nextFunc = await compile(params.next);

  return async modPlan => {
    //console.log(modPlan);
    var modList = modPlan.modules;

    if (params.prefix !== undefined) {
      const allowed = typeof params.prefix === 'string'
        ? [params.prefix]
        : params.prefix;
      modList = modList.filter(mod => checkFor(mod, 'prefix', allowed))
    }

    if (params.level !== undefined) {
      const allowed = (typeof params.level === 'object'
        ? params.level
        : [params.level]).map(item => item.toString());
      modList = modList.filter(mod => checkFor(mod, 'level', allowed));
    }

    if (params.modules !== undefined) {
      const allowed = params.modules;
      modList = modList.filter(mod => allowed.includes(mod));
    }

    if (params.except !== undefined) {
      const allowed = params.except;
      const exception = modPlan.modules.filter(mod => allowed.includes(mod));
      modList = modList.concat(exception);
    }
    var deepCopy = JSON.parse(JSON.stringify(modPlan));
    deepCopy.modules = modList;
    return await nextFunc(deepCopy);
  }
  
}

async function notEmpty (ruleObj) {
  var params = ruleObj.params;
  return (modPlan) => (modPlan.modules.length !== 0);
}

async function nModules (ruleObj) {
  var params = ruleObj.params;
  assert(params['n'] !== undefined);
  return (modPlan) => modPlan.modules.length >= params.n;
}

//console.log(planned({moduleCode: 'ACC1701'})(sample));

//console.log(compile('?CS1231S')(sample));

//console.log(and(ruleSample.params)(sample));
//compile('r_cs_foundation')
//.then(res => console.log('final output: ' + res(sample)));

//getModuleData(2018, 'CS1101S')
//.then(console.log);

/*
mcs({n: '8'})
.then(res => {
  return res(sample);
})
.then(console.log);
*/

//getModuleData(2018, 'CS1231').then(console.log);

async function eval(ruleTag, modPlan) {
  const func = await compile(ruleTag);
  const res = await func(modPlan);
  return res;
}

router.get('/', (req, res) => {
  res.send('from the eval router');
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
})

module.exports = router;