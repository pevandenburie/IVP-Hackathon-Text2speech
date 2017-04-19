var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(JSON.stringify({ name: "IVP Labs Hello Wold Feature Service" }, null, 3));
});

module.exports = router;
