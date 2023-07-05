const Book = require("../models/Book");

module.exports = {
  index: async (req, res) => {
    const book = await Book.find({});
    res.json(book);
  },
  addBook: async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.json(book);
  },
  updateBook: async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
    res.json(book);
  },
  deleteBook: async (req, res) => {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.json({ message: "Data berhasil dihapus" });
  },
};
