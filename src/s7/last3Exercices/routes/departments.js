const express = require("express");
const router = express.Router();
const { departments } = require("../db");

const checkId = (req, res, next) => {
  if (req.params.id && isNaN(req.params.id)) {
    return res.status(400).json({ error: "ID must be a number" });
  } else {
    next();
  }
};
router.get("/departments", checkId, (req, res) => {
  throw new Error("custom error");
  res.status(200).json(departments);
});

router.get("/departments/:id", checkId, (req, res) => {
  const department = departments.find((d) => d.id === Number(req.params.id));
  if (department) {
    res.status(200).json(department);
  } else {
    res.status(404).json({ error: "Entity not found" });
  }
});

module.exports = router;
