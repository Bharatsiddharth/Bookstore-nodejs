var express = require('express');
var router = express.Router();

const Book = require("../models/bookmodel");

const Books = []

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

router.post('/create', async function(req, res, next) {
  // Books.push(req.body);
  

  // Book.create(req.body)
  //     .then(() => {
  //       res.redirect("/readall")
  //     }).catch((err) => res.send(err))

  try {
    const newbook = new Book(req.body);
    await newbook.save();
    res.redirect("/readall");
} catch (error) {
    res.send(error);
}

  // console.log(Books);
});

router.get('/readall', function(req, res, next) {
  Book.find() 
    .then((book) => {
      res.render('Library', {books:book});
    }).catch((err) => res.send(err));
});

router.get('/about', function(req, res, next) {
  res.render('About');
});

router.get('/delete/:idx', async function(req, res, next) {
      try {
        await Books.findByIdAndDelete(req.params.id);
        res.redirect("/readall");
    } catch (error) {
        res.send(error);
    }

    // Books.splice(req.params.idx, 1);
    // res.redirect("/readall")
});

router.get('/update/:idx',async function(req, res, next) {

      try {
        const book = await Books.findById(req.params.id);
        res.render("update", { book: book });
    } catch (error) {
        res.send(error);
    }

  // const i = req.params.idx;
  // const b = Books[req.params.idx]
  // res.render("update",{book_data:b, index:i})
});

router.post('/update/:idx', function(req, res, next) {
  const i = req.params.idx;
  Books[i] = req.body;
  res.redirect("/readall")
});

module.exports = router;
