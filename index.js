const express = require("express");
const mongoose = require("mongoose");
const bookRouter = require("./router/book");
const studentRouter = require("./router/student");
const userRouter = require("./router/user");
const cors = require("cors");

const app = express();
const port = 3000;

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
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
