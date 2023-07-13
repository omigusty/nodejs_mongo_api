const Book = require("../models/Book");
const fileSystem = require("fs");
const path = require("path");

module.exports = {
  index: async (req, res) => {
    const book = await Book.find({});
    res.json(book);
  },

  addBook: async (req, res) => {
    const book = new Book({
      image: req.file.path,
      bookTitle: req.body.bookTitle,
      ISBN: req.body.ISBN,
      description: req.body.description,
    });
    res.json(await book.save());
  },

  searchBook: async (req, res, next) => {
    try {
      const ISBN = req.params.keyword;
      const bookTitle = req.params.keyword;
      let result = await Book.find({
        $or: [{ ISBN: { $regex: ISBN } }, { bookTitle: { $regex: bookTitle } }],
      });

      res.send(result);
    } catch (error) {
      next(error);
    }
  },

  updateBook: async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(
      id,
      {
        image: req.file.path,
        bookTitle: req.body.bookTitle,
        ISBN: req.body.ISBN,
        description: req.body.description,
      },
      { new: true }
    );
    res.json(book);
  },

  deleteBook: (req, res, next) => {
    const { id } = req.params;

    Book.findById(id)
      .then((book) => {
        if (!book) {
          const error = new Error("Book not found!");
          error.errorStatus = 404;
          throw error;
        }

        removeImage(book.image);
        return Book.findByIdAndRemove(id);
      })
      .then((result) => {
        res.status(200).json({
          message: "Delete data successfuly",
          data: result,
        });
      })
      .catch((err) => {
        next(err);
      });
  },
};

const removeImage = (filePath) => {
  filePath = path.join(__dirname, "../../", filePath);
  fileSystem.unlink(filePath, (err) => console.log(err));
};
