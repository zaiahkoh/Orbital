const express = require("express");
const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
  var user = req.user;
  user.password = undefined;
  res.send(user);
});

router.put('/', (req, res) => {
  var user = req.user;
  const {modPlan, name, residential} = req.body;
  if (modPlan) user.modPlan = modPlan;
  if (name) user.name = name;
  if (residential) user.residential = residential;
  user.save()
  .then(user => {
    res.status(200).json({
      success: true,
      updated: {
        modPlan: modPlan,
        name: name,
        residential: residential
      }
    });
  })
  .catch(err => {
    res.status(400).json({error: err.path});
    console.log(err);
  });
})