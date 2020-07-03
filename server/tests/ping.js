const request = require('request');

request.get(
  'http://localhost:3000/pong',
  { json: { key: 'value' } },
  function (error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log(body);
      }
  }
);

var options = {
  'method': 'PUT',
  'url': 'http://localhost:3000/account',
  'headers': {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjMyN2M1MTUzYTc5NWEyNDU4YjQ3NyIsIm5hbWUiOiJUZXN0eSBNY1Rlc3RGYWNlIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNTkzMDEzNzgxLCJleHAiOjE2MjQ1NzA3MDd9.I46s8Y0Nhams2cmqgGkHgecbjB4ATI89sCyif_OsGbE',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    'name': 'Testy McTestFace',
    'modPlan': {key1: 'yeet', key2: {subkey1: 'yes', subkey2: 'no'}}
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});