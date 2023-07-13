const express = require("express");
const router = express.Router();
const bookController = require("../controllers/BookController");

router
  .route("/api/book")
  .get(bookController.index)
  .post(bookController.addBook);
router.put("/api/book/:id", bookController.updateBook);
router.get("/api/book/search/:keyword", bookController.searchBook);
router.delete("/api/book/:id", bookController.deleteBook);

module.exports = router;
