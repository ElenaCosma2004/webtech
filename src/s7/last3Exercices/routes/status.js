const express = require("express");
const router = express.Router();
const { departments } = require("../db");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running successfully",
  });
});

module.exports = router;
