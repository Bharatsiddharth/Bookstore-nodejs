const mongoose = require("mongoose");

const bookModel = new mongoose.Schema({
    book: String,
    author: String,
    price: Number,
    qua: Number,
    lan: String,
    cat: String,
    description: String,
})

const Books = mongoose.model("book", bookModel);

module.exports = Books;