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

router.get('/delete/:idx', function(req, res, next) {
    Books.splice(req.params.idx, 1);
    res.redirect("/readall")
});

router.get('/update/:idx', function(req, res, next) {
  const i = req.params.idx;
  const b = Books[req.params.idx]
  res.render("update",{book_data:b, index:i})
});

router.post('/update/:idx', function(req, res, next) {
  const i = req.params.idx;
  Books[i] = req.body;
  res.redirect("/readall")
});

module.exports = router;
