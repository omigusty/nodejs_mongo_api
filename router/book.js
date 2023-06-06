const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book");

router
  .route("/api/book")
  .get(bookController.index)
  .post(bookController.addBook);

router.put("/api/book/:id", bookController.updateBook);

router.delete("/api/book/:id", bookController.deleteBook);

module.exports = router;
