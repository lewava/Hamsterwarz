const express = require("express");
const router = express.Router();

const getDatabase = require("../database.js");
const database = getDatabase();

router.get("/", (req, res) => {
  res.send("GET /hamsters");
});

module.exports = router;
