const mongoose = require("mongoose");

mongoose
    .connect("mongodb://127.0.0.1:27017/db1")
    .then(() => console.log("Database connection establish"))
    .catch((err) => console.log(err.message));