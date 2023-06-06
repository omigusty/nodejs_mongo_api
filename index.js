const express = require("express");
const mongoose = require("mongoose");
const bookRouter = require("./router/book");
const studentRouter = require("./router/student");
const cors = require("cors");

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

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use(bookRouter);
app.use(studentRouter);

app.listen(3000, () => {
  console.log("Server listen on port 3000");
});
