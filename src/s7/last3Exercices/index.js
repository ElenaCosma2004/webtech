"use strict";

const express = require("express");
const app = express();
const { departments } = require("./db");

require("dotenv").config();
const logger = require("./routes/logger");
const router = require("./routes/departments");
const statusRouter = require("./routes/status");
const departmentsRouter = require("./routes/departments");

app.use(logger);
app.use("/api", departmentsRouter);
app.use("/status", statusRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.set("port", process.env.PORT || 7000);
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}/`);
});
