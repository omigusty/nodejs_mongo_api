const Student = require("../models/Student");

module.exports = {
  index: async (req, res) => {
    const student = await Student.find({});
    res.json(student);
  },

  addStudent: async (req, res) => {
    const student = new Student({
      NIM: req.body.NIM,
      nama: req.body.nama,
      image: req.file.path,
      kelas: req.body.kelas,
      jurusan: req.body.jurusan,
    });
    res.json(await student.save());
  },

  updateStudent: async (req, res) => {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(
      id,
      {
        NIM: req.body.NIM,
        nama: req.body.nama,
        image: req.file.path,
        kelas: req.body.kelas,
        jurusan: req.body.jurusan,
      },
      {
        new: true,
      }
    );
    res.json(student);
  },

  deleteStudent: async (req, res) => {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.json({ message: "Data berhasil dihapus" });
  },
};
