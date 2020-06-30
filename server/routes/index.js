const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Express backend up and running');
})

router.get('/pong', (req, res) => {
  res.send(req.body);
  console.log(req.body);
})

module.exports = router;