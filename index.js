const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const port = 3000;
const bookRouter = require("./src/router/book");
const studentRouter = require("./src/router/student");
const userRouter = require("./src/router/user");
const productRouter = require("./src/router/product");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/express-dasar", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.error("Mongodb failde to connect", error);
  });

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    callback(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

app.use("/images/", express.static(path.join(__dirname, "images/")));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(bookRouter);
app.use(studentRouter);
app.use(productRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
