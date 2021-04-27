const express = require("express");
const router = express.Router();
const getDatabase = require("../database.js");
const database = getDatabase();

router.get("/", async (req, res) => {
  const snapshot = await database.collection("matches").get();

  if (snapshot.empty) {
    res.status(404).send("Couldn't find any matches.");
    return;
  }

  let matchList = [];
  snapshot.forEach((doc) => matchList.push(doc.data()));

  res.send(matchList);
});

router.get("/:id", async (req, res) => {
  const snapshot = await database
    .collection("matches")
    .doc(req.params.id)
    .get();

  if (!snapshot.exists) {
    res.status(404).send("Couldn't find the match.");
    return;
  }

  res.send(snapshot.data());
});

module.exports = router;
