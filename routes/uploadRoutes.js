const express = require("express");
const router = express.Router();
const upload = require("../config/upload");
const { verifyToken, requireAdmin } = require("../middleware/auth");

router.post("/", verifyToken, requireAdmin, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

module.exports = router;