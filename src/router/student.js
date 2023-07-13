const express = require("express");
const router = express.Router();
const studentController = require("../controllers/StudentController");

router
  .route("/api/student")
  .get(studentController.index)
  .post(studentController.addStudent);
router.get("/api/student/search/:keyword", studentController.searchStudent);
router.put("/api/student/:id", studentController.updateStudent);
router.delete("/api/student/:id", studentController.deleteStudent);

module.exports = router;
