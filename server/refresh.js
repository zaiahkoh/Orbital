const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const https = require('https');

//--Declaring dependencies
//Body parser is used to automatically include POST HTTP request data in the
//request body
app.use(bodyParser.urlencoded({ extended: true }))

//Get module list from NUSmods API
function getModuleData (type ,acadYear) {
  return new Promise((resolve, reject) => {

    var startTime = new Date();
    const uri = 'https://api.nusmods.com/v2/' + acadYear + '-' + (acadYear + 1) 
      + '/module' + type + '.json';

    https.get(uri, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      })

      res.on('end', () => {
        resolve(JSON.parse(data));
        var endTime = new Date();
        var timeElapsed = endTime - startTime;
        console.log('API data received, time taken: ' + timeElapsed + 'ms');
      })

    }).on('error', (err) => {
      reject(err);
    })

  })
}

//Get the specified local database
function getDatabase(dbName) {
  return new Promise((resolve, reject) => {
    const client_uri = "mongodb://127.0.0.1:27017";

    MongoClient.connect(client_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      console.log('Connected to Database');

      resolve(client.db(dbName));
    })
    .catch(err => reject(err));

  })
}

/*
async function updateStuff() {
  let data = await getModuleList(2018);
  console.log(await getDatabase(data));
}
*/

const fast = Promise.all([getModuleData('Info' ,2018), getDatabase('modtree')])
  .then(([data, db]) => {
    db.collection('moduleInfo_2018').drop();
    db.collection('moduleInfo_2018').insertMany(data);
  })
  .then(_ => 
    console.log('All done')
  )
  .catch(err => console.log(err));


app.listen(3000, function () {
  console.log('Express server is listening on port 3000!');
});