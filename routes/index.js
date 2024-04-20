var express = require('express');
var router = express.Router();

// const upload = require("utils/multer");
const Book = require("../models/bookmodel");

// const Books = []

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
    // const newbook = new Book(req.body);
    // res.json({ body: req.body, file: req.file });
    const newbook = new Books({ ...req.body, image: req.file.filename });
    await newbook.save();
    res.redirect("/readall");
} catch (error) {
    res.send(error);
}

  // console.log(Books);
});

router.get('/readall', async function(req, res, next) {
    try {
      const allbooks = await Book.find();
      console.log(allbooks);
      res.render("Library", {books: allbooks})
    } catch (error) {
      res.send(error);
    }
});

router.get('/about', function(req, res, next) {
  res.render('About');
});

router.get('/delete/:id', async function(req, res, next) {
      try {
        await Book.findByIdAndDelete(req.params.id);
        res.redirect("/readall");
    } catch (error) {
        res.send(error);
    }

    // Books.splice(req.params.idx, 1);
    // res.redirect("/readall")
});

router.get('/update/:id',async function(req, res, next) {

      try {
        const book = await Book.findById(req.params.id);
        res.render("update", { book: book });
    } catch (error) {
        res.send(error);
    }

  // const i = req.params.idx;
  // const b = Books[req.params.idx]
  // res.render("update",{book_data:b, index:i})
});

router.post('/update/:idx',async function(req, res, next) {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/readall");
} catch (error) {
    res.send(error);
}
  // const i = req.params.idx;
  // Books[i] = req.body;
  // res.redirect("/readall")
});

module.exports = router;
