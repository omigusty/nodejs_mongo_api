const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  image: String,
  bookTitle: String,
  ISBN: String,
  description: String,
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
