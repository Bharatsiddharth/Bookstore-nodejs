var express = require('express');
var router = express.Router();

const Books = []

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

router.post('/create', function(req, res, next) {
  Books.push(req.body);
  res.redirect("/readall")
  console.log(Books);
});

router.get('/readall', function(req, res, next) {
  res.render('Library', {books:Books});
});

router.get('/about', function(req, res, next) {
  res.render('About');
});

module.exports = router;
