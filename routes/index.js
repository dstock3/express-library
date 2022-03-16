var express = require('express');
var router = express.Router();

/* GET home page. */
// In the code below from /routes/index.js you can see how that route renders a response using the template "index" passing the template variable "title".

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
