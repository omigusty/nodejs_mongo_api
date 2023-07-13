const Product = require("../models/Product");
const fileSystem = require("fs");
const path = require("path");

module.exports = {
  index: async (req, res) => {
    const product = await Product.find({});
    res.json(product);
  },

  searchProduct: async (req, res, next) => {
    try {
      const title = req.params.keyword;
      const category = req.params.keyword;
      const type_product = req.params.keyword;
      let result = await Product.find({
        $or: [
          { title: { $regex: title } },
          { category: { $regex: category } },
          { type_product: { $regex: type_product } },
        ],
      });

      res.send(result);
    } catch (error) {
      next(error);
    }
  },

  addProduct: async (req, res) => {
    const product = new Product({
      image: req.file.path,
      title: req.body.title,
      category: req.body.category,
      type_product: req.body.type_product,
      price: req.body.price,
    });
    res.json(await product.save());
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(
      id,
      {
        image: req.file.path,
        title: req.body.title,
        category: req.body.category,
        type_product: req.body.type_product,
        price: req.body.price,
      },
      {
        new: true,
      }
    );
    res.json(product);
  },

  deleteProduct: (req, res, next) => {
    const { id } = req.params;

    Product.findById(id)
      .then((product) => {
        if (!product) {
          const error = new Error("Produk tidak ditemukan");
          error.errorStatus = 404;
          throw error;
        }

        removeImage(product.image);
        return Product.findByIdAndRemove(id);
      })
      .then((result) => {
        res.status(200).json({
          message: "Data produk berhasi dihapus",
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
