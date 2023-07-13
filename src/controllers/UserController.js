const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new userModel({ username, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "User berhasil terdaftar" });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan saat registrasi" });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await userModel.findOne({ username });

      if (!user) {
        res.status(404).json({ message: "User tidak terdaftar" });
        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ message: "Password salah" });
        return;
      }

      const token = jwt.sign({ userId: user._id }, "RD6pUkK", {
        expiresIn: "1h",
      });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Terjadi kesalahan saat login" });
    }
  },
};
