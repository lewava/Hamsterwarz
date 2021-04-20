const express = require("express");
const app = express();
const cors = require("cors");
const hamsters = require("./routes/hamsters.js");

const PORT = 2000;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.params);
  next();
});

app.use(express.json());
app.use(cors());

app.use("/hamsters", hamsters);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
