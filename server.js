const express = require("express");
const app = express();
const cors = require("cors");
const hamsters = require("./routes/hamsters.js");
const path = require("path");

const PORT = 2000;
const publicFolder = path.join(__dirname, "public");

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.params);
  next();
});

app.use(express.json());
app.use(cors());
app.use(express.static(publicFolder));

app.use("/hamsters", hamsters);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
