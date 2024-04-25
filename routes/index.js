var express = require('express');
var router = express.Router();
const Book = require("../models/bookmodel");

const fs = require("fs");
const path = require("path");

const upload = require("../utils/multer").single("image")

// const Books = []

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

  router.post('/create',  async function(req, res, next) {
    // Books.push(req.body);
    

    // Book.create(req.body)
    //     .then(() => {
    //       res.redirect("/readall")
    //     }).catch((err) => res.send(err))


    try {
        upload(req,res, async function(error) {
        if(error) {
          return res.send(error)
        }
        const newbook = new Book({ ...req.body, image: req.file.filename });
        await newbook.save();
        res.redirect("/readall");
      })
  } catch (error) {
      res.send(error);
  }

  //   try {
  //     const newbook = new Book({ ...req.body, image: req.file.filename });
  //     await newbook.save();
  //     res.redirect("/readall");
  // } catch (error) {
  //     res.send(error);
  // }

    // console.log(Books);
  });

router.get('/readall', async function(req, res, next) {
    try {
      const allbooks = await Book.find();
      // console.log(allbooks);
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
        const book = await Book.findByIdAndDelete(req.params.id);
        fs.unlinkSync(
          path.join(__dirname, "..", "public" ,"images", book.image)
        )
        res.redirect("/readall");
    } catch (error) {
        res.send(error);
    }
});

router.get('/update/:id',async function(req, res, next) {

      try {
        const book = await Book.findById(req.params.id);
        res.render("update", { book: book });
    } catch (error) {
        res.send(error);
    }
});

router.post('/update/:id',upload, async function(req, res, next) {
    try {

        const  updatedata = {...req.body};
        if(req.file){
          updatedata.image = req.file.filename;
          fs.unlinkSync(
            path.join(__dirname, "..", "public" ,"images", req.body.oldimage)
          )
        }

        await Book.findByIdAndUpdate(req.params.id, updatedata);
        res.redirect("/readall");
    } catch (error) {
        res.send(error);
    }
 
});

module.exports = router;
