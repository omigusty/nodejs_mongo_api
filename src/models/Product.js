const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: String,
  title: String,
  category: String,
  type_product: String,
  price: Number,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
