const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const hamsters = require("./routes/hamsters.js");
const matches = require("./routes/matches.js");
const matchWinners = require("./routes/matchWinners.js");
const winners = require("./routes/winners.js");

const PORT = process.env.PORT || 2000;
const publicFolder = path.join(__dirname, "public");

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.params);
  next();
});

app.use(express.json());
app.use(cors());
app.use(express.static(publicFolder));

app.use("/hamsters", hamsters);
app.use("/matches", matches);
app.use("/matchWinners", matchWinners);
app.use("/winners", winners);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
