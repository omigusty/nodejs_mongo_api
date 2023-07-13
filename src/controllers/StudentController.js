const Student = require("../models/Student");
const fileSystem = require("fs");
const path = require("path");

module.exports = {
  index: async (req, res) => {
    const student = await Student.find({});
    res.json(student);
  },

  searchStudent: async (req, res, next) => {
    try {
      // const NIM = req.params.keyword;
      const nama = req.params.keyword;
      let result = await Student.find({
        $or: [{ nama: { $regex: nama } }],
      });

      res.send(result);
    } catch (error) {
      next(error);
    }
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

  deleteStudent: (req, res, next) => {
    const { id } = req.params;

    Student.findById(id)
      .then((student) => {
        if (!student) {
          const error = new Error("Mahasiswa tidak ditemukan");
          error.errorStatus = 404;
          throw error;
        }

        removeImage(student.image);
        return Student.findByIdAndRemove(id);
      })
      .then((result) => {
        res.status(200).json({
          message: "Data Mahasiswa berhasi dihapus",
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
