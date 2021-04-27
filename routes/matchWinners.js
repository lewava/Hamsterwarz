const express = require("express");
const router = express.Router();
const getDatabase = require("../database.js");
const database = getDatabase();

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const snapshot = await database.collection("matches").get();

  if (snapshot.empty) {
    res.status(404);
    return;
  }

  let matches = [];
  snapshot.forEach((doc) => {
    if (doc.data().winnerId === id) {
      matches.push(doc.data());
    }
  });

  if (matches.length === 0) {
    res.status(404).send(`The hamster with id: ${id} has not won any matches.`);
  }

  res.send(matches);
});

module.exports = router;
