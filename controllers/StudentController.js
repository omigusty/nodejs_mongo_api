const Student = require("../models/Student");

module.exports = {
  index: async (req, res) => {
    const student = await Student.find({});
    res.json(student);
  },
  addStudent: async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
  },
  updateStudent: async (req, res) => {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(student);
  },
  deleteStudent: async (req, res) => {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.json({ message: "Data berhasil dihapus" });
  },
};
