var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

router.get('/readall', function(req, res, next) {
  res.render('Library');
});

router.get('/about', function(req, res, next) {
  res.render('About');
});

module.exports = router;
