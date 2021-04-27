const express = require("express");
const router = express.Router();
const getDatabase = require("../database.js");
const database = getDatabase();
const error = require("./errorHandling.js");

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

router.post("/", async (req, res) => {
  const obj = req.body;

  if (!error.checkMatchPost(obj)) {
    res.status(400).send("Wrong object structure.");
    return;
  }

  const winnerSnapshot = await database
    .collection("hamster")
    .doc(obj.winnerId)
    .get();

  const loserSnapshot = await database
    .collection("hamster")
    .doc(obj.loserId)
    .get();

  if (!winnerSnapshot.exists) {
    res.status(404).send("There is no hamster with that winner id.");
    return;
  } else if (!loserSnapshot.exists) {
    res.status(404).send("There is no hamster with that loser id.");
    return;
  }

  const docRef = await database.collection("matches").add(obj);
  const id = { id: docRef.id };
  res.send(id);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const snapshot = await database.collection("matches").doc(id).get();

  if (!snapshot.exists) {
    res.status(404).send("There is no match with that id.");
    return;
  }

  await database.collection("matches").doc(id).delete();
  res.send("Match deleted.");
});

module.exports = router;
