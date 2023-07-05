const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  NIM: Number,
  nama: String,
  image: String,
  kelas: String,
  jurusan: String,
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
